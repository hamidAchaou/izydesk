# E-commerce API (Symfony 7)

## Installation

```bash
git clone ...
cd ecommerce-api
composer install
cp .env .env.local
# configure la DB dans .env.local
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony server:start
