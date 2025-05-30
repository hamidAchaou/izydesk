<?php

namespace App\Service;

use App\Repository\OrderRepository;
use App\Entity\Order;
use App\DTO\OrderDTO;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use \Stripe\Checkout\Session;
use App\Repository\UserRepository;
use App\Repository\ProductRepository;
use App\Entity\OrderItem;

class OrderService
{
    public function __construct(
        private readonly OrderRepository $orderRepository,
        private readonly EntityManagerInterface $em,
        private readonly SerializerInterface $serializer,
        private readonly ValidatorInterface $validator,
        private readonly UserRepository $userRepository,
        private readonly ProductRepository $productRepo
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

    public function saveOrder(\Stripe\Checkout\Session $session): void
    {
        $order = new Order();
        $order->setStripeSessionId($session->id);
    
        // Optionnel : retrouver l'utilisateur par e-mail
        $customerEmail = $session->customer_details->email ?? null;
        if ($customerEmail) {
            $user = $this->userRepository->findOneByEmail($customerEmail);
            if ($user) {
                $order->setUser($user);
            }
        }
    
        $this->em->persist($order);
        $this->em->flush();
    }
    

    public function confirm(Session $session): Order
    {
        $customerEmail = $session->customer_details->email ?? null;
        if (!$customerEmail) {
            throw new \InvalidArgumentException('Customer email not found in session.');
        }

        $user = $this->userRepository->findOneByEmail($customerEmail);
        if (!$user) {
            throw new \RuntimeException("User with email {$customerEmail} not found.");
        }

        $lineItems = \Stripe\Checkout\Session::allLineItems($session->id, ['limit' => 100]);

        $order = new Order();
        $order->setUser($user);
        $order->setTotal($session->amount_total / 100);
        $order->setCreatedAt(new \DateTimeImmutable());

        $this->em->beginTransaction();
        try {
            $this->em->persist($order);

            foreach ($lineItems->data as $lineItem) {
                // Use 'name' instead of 'title' for Product lookup
                $product = $this->productRepo->findOneBy(['name' => $lineItem->description]);
                if (!$product) {
                    throw new \RuntimeException("Product '{$lineItem->description}' not found.");
                }

                $item = new OrderItem();
                $item->setProduct($product);
                $item->setQuantity($lineItem->quantity);
                $item->setPrice($lineItem->amount_total / 100);
                $item->setOrder($order);

                $this->em->persist($item);
            }

            $this->em->flush();
            $this->em->commit();
        } catch (\Exception $e) {
            $this->em->rollback();
            throw $e;
        }

        return $order;
    }
}