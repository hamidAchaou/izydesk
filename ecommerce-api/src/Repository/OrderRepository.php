<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Order>
 */
class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

    // src/Repository/OrderRepository.php

    public function findAllWithItemsAndProducts(): array
    {
        return $this->createQueryBuilder('o')
            ->leftJoin('o.items', 'i')
            ->leftJoin('i.product', 'p')
            ->addSelect('i')
            ->addSelect('p')
            ->getQuery()
            ->getResult();
    }

    public function findWithItemsAndProducts(int $id): ?Order
    {
        return $this->createQueryBuilder('o')
            ->leftJoin('o.items', 'i')
            ->leftJoin('i.product', 'p')
            ->addSelect('i')
            ->addSelect('p')
            ->where('o.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }
    //    /**
    //     * @return Order[] Returns an array of Order objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('o')
    //            ->andWhere('o.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('o.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Order
    //    {
    //        return $this->createQueryBuilder('o')
    //            ->andWhere('o.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}