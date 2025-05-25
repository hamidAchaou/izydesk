<?php

namespace App\Controller\Api;

use App\Entity\Order;
use App\Entity\OrderItem;
use App\Repository\ProductRepository;
use App\Service\OrderService;
use Doctrine\ORM\EntityManagerInterface;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/orders')]
final class OrderController extends AbstractController
{
    public function __construct(
        private readonly OrderService $orderService,
        private readonly EntityManagerInterface $em,
        private readonly ProductRepository $productRepo
    ) {}

    #[Route('', name: 'order_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        try {
            $orders = $this->orderService->getAll();
            return $this->json($orders, Response::HTTP_OK, [], ['groups' => 'order:read']);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('', name: 'order_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $orderDto = $this->orderService->create($data);
            return $this->json($orderDto, Response::HTTP_CREATED, [], ['groups' => 'order:read']);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{id}', name: 'order_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        try {
            $orderDto = $this->orderService->getById($id);
            return $orderDto
                ? $this->json($orderDto, Response::HTTP_OK, [], ['groups' => 'order:read'])
                : $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'order_update', methods: ['PUT', 'PATCH'])]
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $orderDto = $this->orderService->update($id, $data);

            return $orderDto
                ? $this->json($orderDto, Response::HTTP_OK, [], ['groups' => 'order:read'])
                : $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'order_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $success = $this->orderService->delete($id);
            return $success
                ? new JsonResponse(null, Response::HTTP_NO_CONTENT)
                : $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/confirm', name: 'order_confirm', methods: ['POST'])]
    public function confirmOrder(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $sessionId = $data['sessionId'] ?? null;

        if (!$sessionId) {
            return $this->json(['error' => 'Missing session ID'], Response::HTTP_BAD_REQUEST);
        }

        Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

        try {
            $session = Session::retrieve($sessionId, ['expand' => ['line_items', 'customer']]);

            if ($session->payment_status !== 'paid') {
                return $this->json(['error' => 'Payment not completed'], Response::HTTP_BAD_REQUEST);
            }

            $orderRepo = $this->em->getRepository(Order::class);
            $existingOrder = $orderRepo->findOneBy(['stripeSessionId' => $sessionId]);
            if ($existingOrder) {
                return $this->json(['success' => true, 'message' => 'Order already saved']);
            }

            $order = new Order();
            if ($user = $this->getUser()) {
                $order->setUser($user);
            }

            $order->setStatus('paid');
            $order->setStripeSessionId($sessionId);

            foreach ($session->line_items->data as $item) {
                $product = $this->productRepo->findOneBy(['name' => $item->description]);
                if (!$product) {
                    continue;
                }

                $orderItem = new OrderItem();
                $orderItem->setProduct($product);
                $orderItem->setQuantity($item->quantity);
                $orderItem->setPrice($item->amount_total / 100); // cents to EUR
                $order->addItem($orderItem);
            }

            $this->em->persist($order);
            $this->em->flush();

            return $this->json(['success' => true, 'orderId' => $order->getId()]);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}