<?php
// src/Controller/ProductController.php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProductController extends AbstractController
{
    #[Route('/api/products', methods: ['GET'])]
    public function index(ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $products = $productRepository->findAll();
        $json = $serializer->serialize($products, 'json', ['groups' => 'product:read']);
        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/api/products', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, ValidatorInterface $validator, SerializerInterface $serializer): JsonResponse
    {
        $data = $request->getContent();
        $product = $serializer->deserialize($data, Product::class, 'json');

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $em->persist($product);
        $em->flush();

        return $this->json($product, 201, [], ['groups' => 'product:read']);
    }
}