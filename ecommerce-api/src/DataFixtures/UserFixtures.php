<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Create Admin user
        $admin = new User();
        $admin->setEmail('admin@gmail.com');
        $admin->setFirstName('Admin');
        $admin->setLastName('User');
        $admin->setPhone('1234567890');
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPassword($this->passwordHasher->hashPassword($admin, 'adminpassword'));
        $manager->persist($admin);

        // Create User 1
        $user1 = new User();
        $user1->setEmail('user1@gmail.com');
        $user1->setFirstName('User');
        $user1->setLastName('One');
        $user1->setPhone('0987654321');
        $user1->setRoles(['ROLE_USER']);
        $user1->setPassword($this->passwordHasher->hashPassword($user1, 'user1password'));
        $manager->persist($user1);

        // Create User 2
        $user2 = new User();
        $user2->setEmail('user2@gmail.com');
        $user2->setFirstName('User');
        $user2->setLastName('Two');
        $user2->setPhone('1122334455');
        $user2->setRoles(['ROLE_USER']);
        $user2->setPassword($this->passwordHasher->hashPassword($user2, 'user2password'));
        $manager->persist($user2);

        $manager->flush();
    }
}