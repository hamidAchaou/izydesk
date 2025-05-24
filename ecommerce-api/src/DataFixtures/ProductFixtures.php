<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\ProductImage;
use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Finder\Finder;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $uploadDir = __DIR__ . '/../../public/uploads';
        $finder = new Finder();
        $finder->files()->in($uploadDir)->name('*.jpg');

        $groupedImages = [];

        foreach ($finder as $file) {
            $filename = $file->getFilename();
            $nameWithoutExt = pathinfo($filename, PATHINFO_FILENAME);

            // Remove trailing numbers (e.g., Abaya-women-1 → Abaya-women)
            $baseName = preg_replace('/[-_\s]*\d+$/', '', $nameWithoutExt);

            $groupedImages[$baseName][] = 'http://localhost:8000/uploads/' . $filename;
        }

        foreach ($groupedImages as $baseName => $images) {
            if (count($images) < 1) continue;

            $product = new Product();
            $product->setName(ucwords(str_replace(['-', '_'], ' ', $baseName)));
            $product->setDescription("Produit pour " . $baseName);
            $product->setPrice(mt_rand(10, 100));
            $product->setStock(mt_rand(5, 30));

            // Determine category based on baseName
            $categoryIndex = $this->matchCategory($baseName);
            // $product->setCategory($this->getReference('category_' . $categoryIndex));
            $product->setCategory($this->getReference('category_' . rand(0, 3), Category::class));


            $mainImage = null;
            foreach ($images as $i => $imgPath) {
                $productImage = new ProductImage();
                $productImage->setImage($imgPath);
                $productImage->setProduct($product);
                $manager->persist($productImage);

                if ($i === 0) $mainImage = $productImage;
            }

            $product->setImage($mainImage);
            $manager->persist($product);
        }

        $manager->flush();
    }

    private function matchCategory(string $baseName): int
    {
        $lower = strtolower($baseName);

        if (str_contains($lower, 'femme') || str_contains($lower, 'woman')) return 0;
        if (str_contains($lower, 'homme') || str_contains($lower, 'man')) return 1;
        if (str_contains($lower, 'enfant') || str_contains($lower, 'kid')) return 2;

        // Default to "Accessoires" (index 3)
        return 3;
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
        ];
    }
}