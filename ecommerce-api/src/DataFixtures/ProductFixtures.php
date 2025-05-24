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
    public const CATEGORIES = ['Femme', 'Homme', 'Enfants', 'Accessoires'];

    public function load(ObjectManager $manager): void
    {
        $uploadDir = __DIR__ . '/../../public/uploads';
        $finder = new Finder();
        $finder->files()->in($uploadDir)->name('*.jpg');

        $groupedImages = [];

        foreach ($finder as $file) {
            $filename = $file->getFilename();
            $nameWithoutExt = pathinfo($filename, PATHINFO_FILENAME);

            // Remove trailing numbers (e.g., "-1", "-2" etc.)
            $baseName = preg_replace('/[-_\s]*\d+$/', '', $nameWithoutExt);

            $groupedImages[$baseName][] = 'http://localhost:8000/uploads/' . $filename;
        }

        foreach ($groupedImages as $baseName => $images) {
            if (count($images) < 1) {
                continue;
            }

            // Extract product name and category from baseName
            [$productName, $categoryName] = $this->extractProductNameAndCategory($baseName);

            $product = new Product();
            $product->setName(ucwords($productName));
            $product->setDescription("Produit pour " . $productName);
            $product->setPrice(mt_rand(10, 100));
            $product->setStock(mt_rand(5, 30));

            // Get category reference index by category name
            $categoryIndex = array_search($categoryName, self::CATEGORIES, true);
            if ($categoryIndex === false) {
                $categoryIndex = 3; // Default to Accessoires index
            }
            $product->setCategory($this->getReference('category_' . rand(0, 3), Category::class));

            $mainImage = null;
            foreach ($images as $i => $imgPath) {
                $productImage = new ProductImage();
                $productImage->setImage($imgPath);
                $productImage->setProduct($product);
                $manager->persist($productImage);

                if ($i === 0) {
                    $mainImage = $productImage;
                }
            }

            $product->setImage($mainImage);
            $manager->persist($product);
        }

        $manager->flush();
    }

    private function extractProductNameAndCategory(string $baseName): array
    {
        // Split by first dash with optional spaces
        $parts = preg_split('/\s*-\s*/', $baseName, 3);

        // Fallback if dash not found
        if (count($parts) < 2) {
            return [trim($baseName), 'Accessoires']; // default category
        }

        $productName = trim($parts[0]);
        $category = trim($parts[1]);

        // Normalize category to match allowed categories
        $validCategories = ['Femme', 'Homme', 'Enfants', 'Accessoires'];
        foreach ($validCategories as $validCat) {
            if (strcasecmp($category, $validCat) === 0) {
                $category = $validCat;
                break;
            }
        }

        // If category is invalid, default to Accessoires
        if (!in_array($category, $validCategories, true)) {
            $category = 'Accessoires';
        }

        return [$productName, $category];
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
        ];
    }
}