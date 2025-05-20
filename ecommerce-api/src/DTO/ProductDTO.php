<?php

namespace App\DTO;

use App\Entity\Product;
use Symfony\Component\Serializer\Annotation\Groups;

class ProductDTO
{
    #[Groups(['product:read'])]
    public int $id;

    #[Groups(['product:read'])]
    public string $name;

    #[Groups(['product:read'])]
    public string $description;

    #[Groups(['product:read'])]
    public float $price;

    #[Groups(['product:read'])]
    public string $image;

    public static function fromEntity(Product $product): self
    {
        $dto = new self();
        $dto->id = $product->getId();
        $dto->name = $product->getName();
        $dto->description = $product->getDescription();
        $dto->price = $product->getPrice();
        $dto->image = $product->getImage();
        return $dto;
    }
}