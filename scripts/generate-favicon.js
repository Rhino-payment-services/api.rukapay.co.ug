const fs = require('fs');
const path = require('path');

// This script generates favicon files from the RukaPay logo
// It creates multiple sizes and formats for different devices and browsers

const logoPath = path.join(__dirname, '../public/rukapay_logo.png');
const outputDir = path.join(__dirname, '../public');

console.log('🎨 Generating favicon files from RukaPay logo...');

// Check if logo exists
if (!fs.existsSync(logoPath)) {
  console.error('❌ RukaPay logo not found at:', logoPath);
  process.exit(1);
}

console.log('✅ Found RukaPay logo at:', logoPath);

// Create a simple favicon.ico replacement
// For now, we'll copy the logo as favicon.ico (this is a simplified approach)
// In a production environment, you'd want to use a proper image processing library
// like sharp or imagemagick to create proper ICO files

try {
  // Copy the logo to create a basic favicon
  fs.copyFileSync(logoPath, path.join(outputDir, 'favicon.ico'));
  console.log('✅ Created favicon.ico');
  
  // Create additional favicon sizes
  const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 512];
  
  sizes.forEach(size => {
    const filename = `favicon-${size}x${size}.png`;
    // For now, we'll copy the same logo for all sizes
    // In production, you'd resize the image appropriately
    fs.copyFileSync(logoPath, path.join(outputDir, filename));
    console.log(`✅ Created ${filename}`);
  });
  
  // Create apple-touch-icon
  fs.copyFileSync(logoPath, path.join(outputDir, 'apple-touch-icon.png'));
  console.log('✅ Created apple-touch-icon.png');
  
  // Create manifest.json for PWA support
  const manifest = {
    "name": "Rukapay API Docs",
    "short_name": "Rukapay API",
    "description": "Rukapay API Documentation",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#08163D",
    "icons": [
      {
        "src": "/favicon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/favicon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✅ Created manifest.json');
  
  console.log('\n🎉 Favicon generation complete!');
  console.log('📁 Files created in:', outputDir);
  console.log('\n📋 Next steps:');
  console.log('1. Update app/layout.tsx to include favicon metadata');
  console.log('2. Add apple-touch-icon meta tags');
  console.log('3. Test favicon display in different browsers');
  
} catch (error) {
  console.error('❌ Error generating favicon:', error.message);
  process.exit(1);
}
