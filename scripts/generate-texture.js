const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create a simple texture pattern
const width = 512;
const height = 512;
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

// Background gradient
const gradient = context.createRadialGradient(
  width / 2, height / 2, 0,
  width / 2, height / 2, width / 2
);
gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
context.fillStyle = gradient;
context.fillRect(0, 0, width, height);

// Grid Pattern
context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
context.lineWidth = 1;

// Horizontal lines
for (let y = 0; y <= height; y += 64) {
  context.beginPath();
  context.moveTo(0, y);
  context.lineTo(width, y);
  context.stroke();
}

// Vertical lines
for (let x = 0; x <= width; x += 64) {
  context.beginPath();
  context.moveTo(x, 0);
  context.lineTo(x, height);
  context.stroke();
}

// Circular latitude lines
context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
for (let r = 64; r <= 256; r += 64) {
  context.beginPath();
  context.arc(width / 2, height / 2, r, 0, Math.PI * 2);
  context.stroke();
}

// Dots pattern
context.fillStyle = 'rgba(255, 255, 255, 0.4)';
for (let x = 64; x < width; x += 64) {
  for (let y = 64; y < height; y += 64) {
    context.beginPath();
    context.arc(x, y, 2, 0, Math.PI * 2);
    context.fill();
  }
}

// Save to disk
const buffer = canvas.toBuffer('image/png');
const outputDir = path.join(__dirname, '../public/textures');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'market-sphere.png'), buffer);
console.log('Texture generated successfully at public/textures/market-sphere.png'); 