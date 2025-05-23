<?php

namespace App\DTO;

use App\Entity\Order;
use App\Entity\OrderItem;
use Symfony\Component\Serializer\Annotation\Groups;

final class OrderDTO
{
    #[Groups(['order:read'])]
    public int $id;

    #[Groups(['order:read'])]
    public string $status;

    #[Groups(['order:read'])]
    public string $date;

    #[Groups(['order:read'])]
    public float $total;

    #[Groups(['order:read'])]
    public array $items = [];

    public static function fromEntity(Order $order): self
    {
        $dto = new self();
        $dto->id = $order->getId();
        $dto->status = $order->getStatus();
        $dto->date = $order->getCreatedAt()->format('Y-m-d\TH:i:s');
        $dto->total = (float) $order->getTotal();
        
        foreach ($order->getItems() as $item) {
            $dto->items[] = [
                'id' => $item->getProduct()->getId(),
                'name' => $item->getProduct()->getName(),
                'quantity' => $item->getQuantity(),
                'price' => (float) $item->getPrice()
            ];
        }

        return $dto;
    }
}