<?php

namespace App\Service;

use App\Repository\OrderRepository;
use App\Entity\Order;
use App\DTO\OrderDTO;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class OrderService
{
    public function __construct(
        private readonly OrderRepository $orderRepository,
        private readonly EntityManagerInterface $em,
        private readonly SerializerInterface $serializer,
        private readonly ValidatorInterface $validator
    ) {}

    /**
     * Get all orders as DTOs
     *
     * @return OrderDTO[]
     */
    public function getAll(): array
    {
        $orders = $this->orderRepository->findAllWithItemsAndProducts();
        return array_map(fn(Order $order) => OrderDTO::fromEntity($order), $orders);
    }

    /**
     * Get a single order by ID as DTO
     */
    public function getById(int $id): ?OrderDTO
    {
        $order = $this->orderRepository->findWithItemsAndProducts($id);
        return $order ? OrderDTO::fromEntity($order) : null;
    }

    /**
     * Create a new order
     */
    public function create(array $data): OrderDTO
    {
        $order = new Order();

        if (isset($data['status'])) {
            $order->setStatus($data['status']);
        }

        $errors = $this->validator->validate($order);
        if (count($errors) > 0) {
            throw new \InvalidArgumentException((string) $errors);
        }

        $this->em->persist($order);
        $this->em->flush();

        return OrderDTO::fromEntity($order);
    }

    /**
     * Update an existing order
     */
    public function update(int $id, array $data): ?OrderDTO
    {
        $order = $this->orderRepository->find($id);
        if (!$order) {
            return null;
        }

        if (isset($data['status'])) {
            $order->setStatus($data['status']);
        }

        $errors = $this->validator->validate($order);
        if (count($errors) > 0) {
            throw new \InvalidArgumentException((string) $errors);
        }

        $this->em->flush();

        return OrderDTO::fromEntity($order);
    }

    /**
     * Delete an order
     */
    public function delete(int $id): bool
    {
        $order = $this->orderRepository->find($id);
        if (!$order) {
            return false;
        }

        $this->em->remove($order);
        $this->em->flush();
        return true;
    }
}