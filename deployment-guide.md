# WildBliss Tours - cPanel Deployment Guide

## Pre-Deployment Preparation

### 1. Build Production Assets
```bash
npm run build
```

### 2. Optimize Laravel for Production
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Deployment Steps

### 1. Upload Files via cPanel File Manager
- **Upload Laravel files** to `/public_html/` (or subdomain folder)
- **Move `public` folder contents** to the web root
- **Move Laravel app files** to a folder above web root (e.g., `/laravel_app/`)

### 2. Update File Paths
Edit `/public_html/index.php`:
```php
require __DIR__.'/../laravel_app/vendor/autoload.php';
$app = require_once __DIR__.'/../laravel_app/bootstrap/app.php';
```

### 3. Database Setup
- Create MySQL database in cPanel
- Import your database or run migrations
- Update `.env` with cPanel database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_cpanel_db_name
DB_USERNAME=your_cpanel_db_user
DB_PASSWORD=your_cpanel_db_password
```

### 4. Environment Configuration
Update `.env` file:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Set proper paths
ASSET_URL=https://yourdomain.com
```

### 5. Set Permissions
Via cPanel File Manager, set permissions:
- `storage/` folder: 755
- `bootstrap/cache/` folder: 755
- All files in these folders: 644

### 6. Create Symbolic Link (if needed)
If storage link is broken, create via cPanel Terminal or File Manager:
```bash
ln -s ../laravel_app/storage/app/public public/storage
```

## Quick Deployment Structure
```
/public_html/
├── index.php (modified)
├── .htaccess
├── css/
├── js/
├── images/
└── storage/ (symlink)

/laravel_app/ (above web root)
├── app/
├── bootstrap/
├── config/
├── database/
├── resources/
├── storage/
├── vendor/
├── .env
└── artisan
```

## Final Steps
1. **Test the application** - Visit your domain
2. **Check error logs** in cPanel if issues occur
3. **Clear caches** if needed:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

## Common Issues & Solutions
- **500 Error**: Check file permissions and `.env` configuration
- **Assets not loading**: Verify `ASSET_URL` in `.env`
- **Database connection**: Ensure cPanel database credentials are correct
- **Storage issues**: Check symbolic link and permissions

Your Laravel + React application should now be live and accessible to your client for preview.