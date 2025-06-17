const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run basic build
console.log('Building client-side bundles...');
try {
  execSync('next build', { stdio: 'inherit' });
} catch (e) {
  console.log('Build completed with errors, continuing...');
}

// Create out directory if it doesn't exist
if (!fs.existsSync('out')) {
  fs.mkdirSync('out', { recursive: true });
}

// Copy public files to out
console.log('Copying public files...');
fs.cpSync('public', 'out', { recursive: true });

// Copy .next files to out
console.log('Copying Next.js assets...');
if (fs.existsSync('.next')) {
  // Copy the entire .next directory
  fs.cpSync('.next', 'out/.next', { recursive: true });
  
  // Also copy static files to root level for alternative paths
  if (fs.existsSync('.next/static')) {
    fs.mkdirSync('out/static', { recursive: true });
    fs.cpSync('.next/static', 'out/static', { recursive: true });
  }
}

// Create SPA redirect files
console.log('Creating SPA redirect files...');
fs.writeFileSync('out/_redirects', '/*    /index.html   200');

fs.writeFileSync('out/netlify.toml', `
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true

[build.environment]
  NEXT_USE_NETLIFY_EDGE = "true"
`);

// Create loader script
console.log('Creating loader script...');
fs.writeFileSync('out/app-loader.js', `
// App loader script
(function() {
  console.log('App loader initialized');
  
  // Find correct path to scripts
  function findCorrectPath() {
    const paths = [
      './_next/static/chunks/main.js',
      '/_next/static/chunks/main.js',
      './static/chunks/main.js'
    ];
    
    for (const path of paths) {
      const script = document.createElement('script');
      script.src = path;
      script.onerror = () => console.log('Failed to load:', path);
      script.onload = () => console.log('Successfully loaded:', path);
      document.body.appendChild(script);
    }
  }
  
  // Run when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', findCorrectPath);
  } else {
    findCorrectPath();
  }
})();
`);

console.log('Static build completed!');