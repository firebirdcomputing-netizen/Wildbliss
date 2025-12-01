# ✅ **Summary: Installation & Running of the Laravel Wildlife Tours Application**

### **1. Install Laravel Installer**

Install the Laravel installer globally using Composer:

```bash
composer global require laravel/installer
```

Add Composer's global bin to your system PATH, then verify with:

```bash
laravel --version
```

---

### **2. Create a New Laravel Project**

Generate a fresh project using the installer:

```bash
laravel new wildlife-tours
```

Move into the project directory:

```bash
cd wildlife-tours
```

---

### **3. Environment Setup**

Copy the example environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure database credentials inside `.env`:

```ini
DB_DATABASE=wildlife_tours
DB_USERNAME=root
DB_PASSWORD=
```

Create the database in MySQL/PostgreSQL and apply migrations:

```bash
php artisan migrate
```

---

### **4. Install Core Packages**

Install essential packages for modularity, permissions, and API security:

* Laravel Modules:

```bash
composer require nwidart/laravel-modules
php artisan vendor:publish --provider="Nwidart\Modules\LaravelModulesServiceProvider"
```

* Spatie Permissions:

```bash
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
php artisan migrate
```

* Laravel Sanctum (API authentication):

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

---

### **5. Install Frontend Dependencies**

If you're using Blade, Vue, or React:

```bash
npm install
npm run dev
```

---

### **6. Start the Application**

Run the development server:

```bash
php artisan serve
```

Open the application in your browser:

```
http://127.0.0.1:8000
```

---

# 🎉 **Your Laravel Wildlife Tours application is now installed, configured, and running successfully.**

