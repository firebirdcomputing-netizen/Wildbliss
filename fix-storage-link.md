# Fix Storage Link on Production Server

## The Issue
Images are stored in `storage/app/public/destinations/` but the web app gets 404 errors when trying to access them via `/storage/destinations/filename.jpg`.

## Solution 1: Create Storage Symlink
Run this command on your production server:

```bash
php artisan storage:link
```

This creates a symlink from `public/storage` to `storage/app/public`.

## Solution 2: Manual Symlink (if artisan command fails)
If the artisan command doesn't work, create the symlink manually:

```bash
# Remove existing storage directory/link if it exists
rm -rf public/storage

# Create the symlink
ln -s ../storage/app/public public/storage
```

## Solution 3: Check Web Server Configuration
Ensure your web server (Apache/Nginx) allows following symlinks:

### For Apache (.htaccess)
Add to your `.htaccess` file:
```apache
Options +FollowSymLinks
```

### For Nginx
Ensure your server block doesn't have `disable_symlinks on;`

## Solution 4: Alternative - Copy Files Instead of Symlink
If symlinks don't work on your hosting provider, modify the Destination model:

```php
public function getImageUrlAttribute()
{
    if (!$this->image) {
        return null;
    }
    
    // Copy file to public directory instead of using symlink
    $publicPath = public_path('destinations/' . basename($this->image));
    $storagePath = storage_path('app/public/' . $this->image);
    
    if (file_exists($storagePath) && !file_exists($publicPath)) {
        copy($storagePath, $publicPath);
    }
    
    return asset('destinations/' . basename($this->image));
}
```

## Verify the Fix
After implementing the solution, test by accessing:
`https://www.wildblisstoursandsafaris.com/storage/destinations/[filename].jpg`

The file should load without a 404 error.