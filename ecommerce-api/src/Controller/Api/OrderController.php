<?php

namespace App\Controller\Api;

use App\Service\OrderService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/orders')]
final class OrderController extends AbstractController
{
    public function __construct(
        private readonly OrderService $orderService
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
}