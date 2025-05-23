<?php

namespace App\Controller\Api;

use App\Entity\Product;
use App\Entity\ProductImage;
use App\Service\ProductService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Category;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    public function __construct(
        private readonly ProductService $productService,
        private readonly SerializerInterface $serializer
    ) {}

    #[Route('', name: 'product_index', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        $query = $request->query->get('q');
        $dtos = $query
            ? $this->productService->search($query)
            : $this->productService->getAll();

        return $this->json($dtos, Response::HTTP_OK, [], ['groups' => 'product:read']);
    }


    #[Route('', name: 'create_product', methods: ['POST'])]
    public function createProduct(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
    
        if (empty($data['categoryId'])) {
            return new JsonResponse(['error' => 'Category is required'], Response::HTTP_BAD_REQUEST);
        }
    
        $category = $em->getRepository(Category::class)->find($data['categoryId']);
    
        if (!$category) {
            return new JsonResponse(['error' => 'Invalid category ID'], Response::HTTP_BAD_REQUEST);
        }
    
        $product = new Product();
        $product->setName($data['name'] ?? '');
        $product->setDescription($data['description'] ?? '');
        $product->setPrice((float) ($data['price'] ?? 0));
        $product->setStock((int) ($data['stock'] ?? 0));
        $product->setCategory($category);
    
        if (isset($data['images']) && is_array($data['images'])) {
            foreach ($data['images'] as $imageInput) {
                $imageUrl = is_array($imageInput) ? ($imageInput['url'] ?? '') : $imageInput;
                if (!empty($imageUrl)) {
                    $image = new ProductImage();
                    $image->setImage($imageUrl);
                    $image->setProduct($product);
                    $product->addImage($image);
                    $em->persist($image);
                }
            }
        }
    
        $em->persist($product);
        $em->flush();
    
        return new JsonResponse(['message' => 'Product created successfully'], Response::HTTP_CREATED);
    }

    #[Route('/upload-image', name: 'upload_image', methods: ['POST'])]
public function uploadImage(Request $request): JsonResponse
{
    // Verify the uploads directory exists and is writable
    $projectDir = $this->getParameter('kernel.project_dir');
    $uploadsDir = $projectDir.'/public/uploads';
    
    if (!file_exists($uploadsDir)) {
        if (!mkdir($uploadsDir, 0777, true)) {
            return new JsonResponse(
                ['error' => 'Failed to create upload directory'],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    // Get the uploaded file - ensure the field name matches ('image')
    $file = $request->files->get('image');
    if (!$file) {
        return new JsonResponse(
            ['error' => 'No file was uploaded or the field name is incorrect'],
            Response::HTTP_BAD_REQUEST
        );
    }

    // Validate file type
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $mimeType = $file->getMimeType();
    
    if (!in_array($mimeType, $allowedMimeTypes)) {
        return new JsonResponse(
            ['error' => 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'],
            Response::HTTP_BAD_REQUEST
        );
    }

    // Generate a safe filename
    $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
    $safeFilename = transliterator_transliterate(
        'Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()',
        $originalFilename
    );
    $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

    try {
        $file->move($uploadsDir, $newFilename);
    } catch (FileException $e) {
        return new JsonResponse(
            ['error' => 'Failed to move uploaded file: '.$e->getMessage()],
            Response::HTTP_INTERNAL_SERVER_ERROR
        );
    }

    // Return the full URL
    $imageUrl = $request->getSchemeAndHttpHost().'/uploads/'.$newFilename;

    return new JsonResponse([
        'url' => $imageUrl,
        'path' => '/uploads/'.$newFilename
    ], Response::HTTP_OK);
}

    #[Route('/{id}', name: 'product_show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $dto = $this->productService->getById($id);

        return $dto
            ? $this->json($dto, Response::HTTP_OK, [], ['groups' => 'product:read'])
            : $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/{id}', name: 'update_product', methods: ['PUT'])]
    public function updateProduct(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $product = $em->getRepository(Product::class)->find($id);
        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }
    
        // Handle both JSON and FormData
        $data = $request->request->all();
        if (empty($data)) {
            $data = json_decode($request->getContent(), true);
        }
    
        if (!$data) {
            return new JsonResponse(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
        }
    
        $product->setName($data['name'] ?? $product->getName());
        $product->setDescription($data['description'] ?? $product->getDescription());
        $product->setPrice((float) ($data['price'] ?? $product->getPrice()));
        $product->setStock((int) ($data['stock'] ?? $product->getStock()));
    
        // Handle images - check for both JSON and FormData formats
        $images = [];
        if (isset($data['images']) && is_array($data['images'])) {
            $images = $data['images'];
        } elseif ($request->files->count() > 0) {
            foreach ($request->files as $file) {
                $uploadsDir = $this->getParameter('kernel.project_dir').'/public/uploads';
                $newFilename = uniqid().'.'.$file->guessExtension();
                $file->move($uploadsDir, $newFilename);
                $images[] = '/uploads/'.$newFilename;
            }
        }
    
        // Update product images
        if (!empty($images)) {
            // Remove old images
            foreach ($product->getImages() as $oldImage) {
                $product->removeImage($oldImage);
                $em->remove($oldImage);
            }
    
            // Add new images
            foreach ($images as $imageUrl) {
                if (!empty($imageUrl)) {
                    $image = new ProductImage();
                    $image->setImage($imageUrl);
                    $image->setProduct($product);
                    $product->addImage($image);
                    $em->persist($image);
                }
            }
        }
    
        $em->flush();
    
        return new JsonResponse(['message' => 'Product updated successfully']);
    }

    #[Route('/{id}', name: 'product_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $success = $this->productService->delete($id);

        return $success
            ? new JsonResponse(null, Response::HTTP_NO_CONTENT)
            : $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
    }
}