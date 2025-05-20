<?php
// src/DataFixtures/AppFixtures.php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $electronics = new Category();
        $electronics->setName('Electronics');

        $clothing = new Category();
        $clothing->setName('Clothing');

        $manager->persist($electronics);
        $manager->persist($clothing);

        for ($i = 1; $i <= 10; $i++) {
            $product = new Product();
            $product->setName('Product ' . $i);
            $product->setDescription('Description for product ' . $i);
            $product->setPrice(mt_rand(10, 500));
            $product->setStock(mt_rand(1, 100));
            $product->setCategory($i % 2 === 0 ? $electronics : $clothing);

            $manager->persist($product);
        }

        $manager->flush();
    }
}