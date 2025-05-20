<?php

namespace App\Service;

use App\Entity\Product;
use App\DTO\ProductDTO;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;

class ProductService
{
    public function __construct(
        private readonly ProductRepository $repository,
        private readonly EntityManagerInterface $em
    ) {}

    public function getAll(): array
    {
        return array_map(ProductDTO::fromEntity(...), $this->repository->findAll());
    }

    public function getById(int $id): ?ProductDTO
    {
        $product = $this->repository->find($id);
        return $product ? ProductDTO::fromEntity($product) : null;
    }

    public function create(array $data): ProductDTO
    {
        $product = new Product();
        $this->mapDataToEntity($product, $data);

        $this->em->persist($product);
        $this->em->flush();

        return ProductDTO::fromEntity($product);
    }

    public function update(int $id, array $data): ?ProductDTO
    {
        $product = $this->repository->find($id);
        if (!$product) return null;

        $this->mapDataToEntity($product, $data);
        $this->em->flush();

        return ProductDTO::fromEntity($product);
    }

    public function delete(int $id): bool
    {
        $product = $this->repository->find($id);
        if (!$product) return false;

        $this->em->remove($product);
        $this->em->flush();
        return true;
    }

    public function search(string $query): array
    {
        $products = $this->repository->createQueryBuilder('p')
            ->where('p.name LIKE :q OR p.description LIKE :q')
            ->setParameter('q', "%$query%")
            ->getQuery()
            ->getResult();

        return array_map(ProductDTO::fromEntity(...), $products);
    }

    private function mapDataToEntity(Product $product, array $data): void
    {
        $product->setName($data['name'] ?? $product->getName());
        $product->setDescription($data['description'] ?? $product->getDescription());
        $product->setPrice($data['price'] ?? $product->getPrice());
        $product->setStock($data['stock'] ?? $product->getStock());
        $product->setImage($data['image'] ?? $product->getImage());
    }
}