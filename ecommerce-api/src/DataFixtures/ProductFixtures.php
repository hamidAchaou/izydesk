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

        for ($i = 0; $i < 20; $i++) {
            $product = new Product();
            $product->setName($faker->words(3, true));
            $product->setDescription($faker->paragraph);
            $product->setPrice($faker->randomFloat(2, 10, 200));
            $product->setStock(mt_rand(1, 100));

            // Set category using getReference
            $product->setCategory($this->getReference('category_' . rand(0, 3), Category::class));
            // $categoryReference = $this->getReference('category_' . rand(0, 3));
            // $product->setCategory($categoryReference);

            // Create 1 to 3 images per product
            $imageCount = rand(1, 3);
            $mainImage = null;

            for ($j = 0; $j < $imageCount; $j++) {
                $productImage = new ProductImage();
                $productImage->setImage($faker->imageUrl());
                $productImage->setProduct($product);
                $manager->persist($productImage);

                if ($j === 0) {
                    $mainImage = $productImage;
                }
            }

            // Set the main image relation
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