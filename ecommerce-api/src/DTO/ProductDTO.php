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

    #[Groups(['product:read'])]
    public ?array $category = null;

    #[Groups(['product:read'])]
    public int $stock;

    public static function fromEntity(Product $product): self
    {
        $dto = new self();
        $dto->id = $product->getId();
        $dto->name = $product->getName();
        $dto->description = $product->getDescription();
        $dto->price = (float) $product->getPrice();
        $dto->image = $product->getImage()?->getImage() ?? '';
        $dto->images = array_map(
            fn($img) => $img->getImage(),
            $product->getImages()->toArray()
        );
        $dto->stock = $product->getStock(); // ✅ Set the stock value

        $category = $product->getCategory();
        if ($category) {
            $dto->category = [
                'id' => $category->getId(),
                'name' => $category->getName(),
            ];
        }

        return $dto;
    }
}