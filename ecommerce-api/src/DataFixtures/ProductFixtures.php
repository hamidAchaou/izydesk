<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\ProductImage;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use App\Entity\Category;

class ProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
    
        // Base Picsum URLs (640x480 size) with different image IDs for variety
        $picsumImageIds = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    
        for ($i = 0; $i < 20; $i++) {
            $product = new Product();
            $product->setName($faker->words(3, true));
            $product->setDescription($faker->paragraph);
            $product->setPrice($faker->randomFloat(2, 10, 200));
            $product->setStock(mt_rand(1, 100));
    
            $product->setCategory($this->getReference('category_' . rand(0, 3), Category::class));
    
            $imageCount = rand(1, 3);
            $mainImage = null;
    
            for ($j = 0; $j < $imageCount; $j++) {
                $productImage = new ProductImage();
    
                // Pick a random Picsum ID and create the image URL
                $randomId = $picsumImageIds[array_rand($picsumImageIds)];
                $imageUrl = "https://picsum.photos/id/{$randomId}/640/480";
    
                $productImage->setImage($imageUrl);
    
                $productImage->setProduct($product);
                $manager->persist($productImage);
    
                if ($j === 0) {
                    $mainImage = $productImage;
                }
            }
    
            $product->setImage($mainImage);
            $manager->persist($product);
        }
    
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
        ];
    }
}