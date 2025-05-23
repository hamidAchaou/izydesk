# EIZYdesk

EIZYdesk is a full-stack e-commerce dashboard built with Symfony 7 (backend) and React.js (frontend). This project provides both client and admin interfaces to manage products, orders, users, and more.

---

## 🚀 Features

- 🛒 Product Management  
- 👥 User & Role Management  
- 📊 Dashboard with analytics  
- 🧾 Orders & Inventory  
- 🔐 Admin Authentication  
- ⚙️ Symfony + React Integration

---

## 🛠️ Installation Guide

### 1. Backend Setup (Symfony 7)

```bash
git clone https://github.com/hamidAchaou/izydesk.git
cd ecommerce-api
composer install
```

### 2. Environment Configuration

Copy the example environment file and edit it:

```bash
cp .env .env.example
```

Update the following `.env.local` variables for your database:

```
DATABASE_URL="mysql://root:@127.0.0.1:3306/eizydesk"
```

> 💡 Make sure to create the database `eizydesk` in your MySQL server.

### 3. Run Migrations and Seeders

```bash
php bin/console doctrine:database:create
php bin/console make:migration
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```

> This will create the database schema and populate it with default data including the admin account.

### 4. Add this in .env

```bash
FRONTEND_ORIGIN=http://localhost:3000
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=51ac1e610b43232b3eb363e62cd12538a7fed682eb5797ecd12f8e9a97f13e3e
```
### 5. Start the Symfony Development Server

```bash
symfony server:start
```

> Or alternatively:

```bash
php -S localhost:8000 -t public
```

---

### 6. Frontend Setup (React)

```bash
cd ../ecommerce-frontend
npm install
npm run dev
```

The React app will typically run at `http://localhost:5173`.

---

## 🔐 Admin Access

To access the admin dashboard, login using the following credentials:

```
Email: admin@example.com
Password: adminpassword
```

---

## 📂 Project Structure

```
ecommerce-api/         # Symfony backend
ecommerce-frontend/    # React frontend
```

---

## 📢 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).