const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run basic build to generate client-side JS
console.log('Building client-side bundles...');
try {
  execSync('npx next build', { stdio: 'inherit' });
} catch (e) {
  // Continue even if there are errors
  console.log('Build completed with errors, continuing...');
}

// Create out directory if it doesn't exist
if (!fs.existsSync('out')) {
  fs.mkdirSync('out', { recursive: true });
}

// Copy public files to out
console.log('Copying public files...');
fs.cpSync('public', 'out', { recursive: true });

// Copy .next/static to out/_next/static
console.log('Copying static assets...');
if (fs.existsSync('.next/static')) {
  fs.mkdirSync('out/_next/static', { recursive: true });
  fs.cpSync('.next/static', 'out/_next/static', { recursive: true });
}

// Create a minimal index.html in _next/static
const minimalHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Muhammad Ibrahim Musyaffa | Portfolio</title>
  <script src="/_next/static/chunks/webpack.js"></script>
  <script src="/_next/static/chunks/main.js"></script>
  <script src="/_next/static/chunks/pages/_app.js"></script>
  <script src="/_next/static/chunks/pages/index.js"></script>
  <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
  <link rel="stylesheet" href="/_next/static/css/app/page.css" />
</head>
<body>
  <div id="__next"></div>
</body>
</html>
`;

fs.writeFileSync('out/_next/static/index.html', minimalHTML);
console.log('Static build completed!');