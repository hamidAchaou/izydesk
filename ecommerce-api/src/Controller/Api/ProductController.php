<?php

namespace App\Controller\Api;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use App\Service\ProductService;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    public function __construct(
        private readonly ProductService $productService,
        private readonly SerializerInterface $serializer
    ) {}

    #[Route('', name: 'product_index', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        $query = $request->query->get('q');
        $dtos = $query
            ? $this->productService->search($query)
            : $this->productService->getAll();

        return $this->json($dtos, Response::HTTP_OK, [], ['groups' => 'product:read']);
    }

    #[Route('', name: 'product_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $dto = $this->productService->create($data);
            return $this->json($dto, Response::HTTP_CREATED, [], ['groups' => 'product:read']);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'product_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $dto = $this->productService->getById($id);
        return $dto
            ? $this->json($dto, Response::HTTP_OK, [], ['groups' => 'product:read'])
            : $this->json(['error' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/{id}', name: 'product_update', methods: ['PUT', 'PATCH'])]
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $dto = $this->productService->update($id, $data);

            return $dto
                ? $this->json($dto, Response::HTTP_OK, [], ['groups' => 'product:read'])
                : $this->json(['error' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);

        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'product_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $success = $this->productService->delete($id);
        return $success
            ? new JsonResponse(null, Response::HTTP_NO_CONTENT)
            : $this->json(['error' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);
    }
}