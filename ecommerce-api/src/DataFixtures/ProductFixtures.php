<?php

namespace App\DataFixtures;

use App\Entity\Product;
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
            $product->setImage($faker->imageUrl());

            // Utilise la référence définie dans CategoryFixtures
            // $product->setCategory($this->getReference('category_' . rand(0, 3)));
            $product->setCategory($this->getReference('category_' . rand(0, 3), Category::class));


            $manager->persist($product);
        }

        $manager->flush();
    }

    // Indique à Symfony que cette fixture dépend de CategoryFixtures
    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
        ];
    }
}