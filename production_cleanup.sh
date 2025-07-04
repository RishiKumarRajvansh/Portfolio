#!/bin/bash

# Production Cleanup Script
# This script removes all test files and prepares the project for production deployment

echo "🧹 Starting production cleanup..."

# Remove test and verification files
echo "📁 Removing test and verification files..."
rm -f static/js/final-verification.js
rm -f static/js/animation-test.js

# Remove backup files (if any remaining)
echo "🗑️ Removing backup files..."
find . -name "*.backup" -delete
find . -name "*_backup.*" -delete
find . -name "*.bak" -delete

# Remove development markdown files
echo "📄 Removing development documentation..."
rm -f ANIMATION_FIX_SUMMARY.md
rm -f ANIMATION_RESTORATION_COMPLETE.md
rm -f BADGE_UPDATE_INSTRUCTIONS.md
rm -f CONTENT_VISIBILITY_FIX.md
rm -f DIAGNOSTIC_REPORT.md
rm -f DUPLICATE_CODE_FIX.md
rm -f EMERGENCY_FIX_SUMMARY.md
rm -f MODULARIZATION_SUMMARY.md
rm -f SECTION_VISIBILITY_TROUBLESHOOTING.md

# Remove diagnostic files
echo "🔍 Removing diagnostic files..."
rm -f diagnostic.py

# Clean up Python cache
echo "🐍 Cleaning Python cache..."
find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "*.pyc" -delete

# Remove .DS_Store files (macOS)
echo "🍎 Removing macOS system files..."
find . -name ".DS_Store" -delete

# Create production directory structure
echo "📂 Ensuring proper directory structure..."
mkdir -p logs
mkdir -p static/images
mkdir -p static/fonts

# Set proper permissions
echo "🔐 Setting proper permissions..."
chmod -R 755 static/
chmod -R 644 static/css/
chmod -R 644 static/js/
chmod 755 static/js/
chmod 755 static/css/

# Generate file listing
echo "📋 Generating file listing..."
find . -type f -name "*.py" -o -name "*.html" -o -name "*.css" -o -name "*.js" | sort > file_listing.txt

echo "✅ Production cleanup completed!"
echo "🚀 Project is ready for deployment!"

# Show final structure
echo "📁 Final project structure:"
tree -I '__pycache__|*.pyc|env|node_modules' --dirsfirst
