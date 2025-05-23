<?php

namespace App\DataFixtures;

use App\Entity\Order;
use App\Entity\OrderItem;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class OrderFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        $users = $manager->getRepository(User::class)->findAll();
        $products = $manager->getRepository(Product::class)->findAll();

        if (empty($users) || empty($products)) {
            throw new \RuntimeException('Users and Products must be seeded before Orders.');
        }

        for ($i = 0; $i < 10; $i++) {
            $order = new Order();

            $order->setUser($faker->randomElement($users));
            $order->setStatus($faker->randomElement(['pending', 'processing', 'shipped', 'cancelled']));
            $order->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-2 months', 'now')));
            // Removed $order->setUpdatedAt()

            $orderItems = $faker->randomElements($products, rand(1, 5));
            $total = 0;

            foreach ($orderItems as $product) {
                $orderItem = new OrderItem();
                $orderItem->setOrder($order);
                $orderItem->setProduct($product);
                $quantity = rand(1, 3);
                $orderItem->setQuantity($quantity);
                $price = $product->getPrice();
                $orderItem->setPrice($price);
                $total += $price * $quantity;

                $manager->persist($orderItem);

                // Add item to order collection (optional if bidirectional is set)
                $order->addItem($orderItem);
            }

            $order->setTotal(number_format($total, 2, '.', ''));

            $manager->persist($order);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            ProductFixtures::class,
        ];
    }
}