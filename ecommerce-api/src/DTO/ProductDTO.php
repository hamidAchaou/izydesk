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

    #[Groups(['product:read'])]
    public array $images = [];

    public static function fromEntity(Product $product): self
    {
        $dto = new self();
        $dto->id = $product->getId();
        $dto->name = $product->getName();
        $dto->description = $product->getDescription();
        $dto->price = (float) $product->getPrice();

        // Main image
        $dto->image = $product->getImage()?->getImage() ?? '';

        // All related images
        $dto->images = array_map(
            fn($img) => $img->getImage(),
            $product->getImages()->toArray()
        );

        return $dto;
    }
}