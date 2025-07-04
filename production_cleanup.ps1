# Production Cleanup Script for Windows PowerShell
# This script removes all test files and prepares the project for production deployment

Write-Host "🧹 Starting production cleanup..." -ForegroundColor Green

# Remove test and verification files
Write-Host "📁 Removing test and verification files..." -ForegroundColor Yellow
$testFiles = @(
    "static\js\final-verification.js",
    "static\js\animation-test.js"
)

foreach ($file in $testFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  Removed: $file" -ForegroundColor Gray
    }
}

# Remove backup files
Write-Host "🗑️ Removing backup files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Include "*.backup", "*_backup.*", "*.bak" | Remove-Item -Force

# Remove development markdown files
Write-Host "📄 Removing development documentation..." -ForegroundColor Yellow
$devDocs = @(
    "ANIMATION_FIX_SUMMARY.md",
    "ANIMATION_RESTORATION_COMPLETE.md",
    "BADGE_UPDATE_INSTRUCTIONS.md",
    "CONTENT_VISIBILITY_FIX.md",
    "DIAGNOSTIC_REPORT.md",
    "DUPLICATE_CODE_FIX.md",
    "EMERGENCY_FIX_SUMMARY.md",
    "MODULARIZATION_SUMMARY.md",
    "SECTION_VISIBILITY_TROUBLESHOOTING.md"
)

foreach ($doc in $devDocs) {
    if (Test-Path $doc) {
        Remove-Item $doc -Force
        Write-Host "  Removed: $doc" -ForegroundColor Gray
    }
}

# Remove diagnostic files
Write-Host "🔍 Removing diagnostic files..." -ForegroundColor Yellow
if (Test-Path "diagnostic.py") {
    Remove-Item "diagnostic.py" -Force
    Write-Host "  Removed: diagnostic.py" -ForegroundColor Gray
}

# Clean up Python cache
Write-Host "🐍 Cleaning Python cache..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Directory -Name "__pycache__" | ForEach-Object {
    Remove-Item $_ -Recurse -Force
    Write-Host "  Removed: $($_.FullName)" -ForegroundColor Gray
}
Get-ChildItem -Path . -Recurse -Include "*.pyc" | Remove-Item -Force

# Create production directory structure
Write-Host "📂 Ensuring proper directory structure..." -ForegroundColor Yellow
@("logs", "static\images", "static\fonts") | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
        Write-Host "  Created: $_" -ForegroundColor Gray
    }
}

# Generate file listing
Write-Host "📋 Generating file listing..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Include "*.py", "*.html", "*.css", "*.js" | 
    Select-Object -ExpandProperty FullName | 
    Sort-Object | 
    Out-File -FilePath "file_listing.txt" -Encoding UTF8

Write-Host "✅ Production cleanup completed!" -ForegroundColor Green
Write-Host "🚀 Project is ready for deployment!" -ForegroundColor Green

# Show final structure
Write-Host "📁 Final project structure:" -ForegroundColor Cyan
Get-ChildItem -Path . -Recurse -Directory | Where-Object { $_.Name -notin @("__pycache__", "env", "node_modules") } | Sort-Object FullName
