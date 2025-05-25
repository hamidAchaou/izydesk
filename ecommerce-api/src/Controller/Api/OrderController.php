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
            if (!$orderDto) {
                return $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
            }

            return $this->json($orderDto, Response::HTTP_OK, [], ['groups' => 'order:read']);
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

            if (!$orderDto) {
                return $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
            }

            return $this->json($orderDto, Response::HTTP_OK, [], ['groups' => 'order:read']);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'order_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $success = $this->orderService->delete($id);

            if (!$success) {
                return $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
            }

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    #[Route('/confirm', name: 'order_confirm', methods: ['POST'])]
    public function confirm(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $sessionId = $data['sessionId'] ?? null;
    
            if (!$sessionId) {
                return $this->json(['error' => 'Session ID is required'], Response::HTTP_BAD_REQUEST);
            }
    
            Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
            $session = Session::retrieve($sessionId);
    
            // Appel à un service qui enregistre l'ordre en base
            $this->orderService->saveOrder($session);
    
            return $this->json([
                'success' => true,
                'message' => 'Order saved successfully',
            ], Response::HTTP_OK);
    
        } catch (\Throwable $e) {
            return $this->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
}