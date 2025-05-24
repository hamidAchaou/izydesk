<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CategoryFixtures extends Fixture
{
    public const CATEGORIES = ['Femme', 'Homme', 'Enfants', 'Accessoires'];

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        foreach (self::CATEGORIES as $i => $name) {
            $category = new Category();
            $category->setName($name);
            $manager->persist($category);

            // Ajout de référence utilisable par ProductFixtures
            $this->addReference('category_' . $i, $category);
        }

        $manager->flush();
    }
}