#!/usr/bin/env python3
"""
Script to update all animation classes to use only two types:
- scroll-animate-up (bottom-to-up, appears as you scroll down)
- scroll-animate-down (top-to-down, appears as you scroll up)
"""
import re

# Read the HTML file
with open('templates/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all complex animation classes with simple ones
replacements = [
    # Replace fast animations with up animations
    (r'scroll-animate-fast', 'scroll-animate-up'),
    (r'scroll-animate-slow', 'scroll-animate-up'),
    (r'scroll-animate-slide-left', 'scroll-animate-down'),
    (r'scroll-animate-slide-right', 'scroll-animate-up'),
    (r'scroll-animate-scale', 'scroll-animate-down'),
    # Keep basic scroll-animate as scroll-animate-up
    (r'scroll-animate(?!-)', 'scroll-animate-up'),
]

# Apply replacements
for old, new in replacements:
    content = re.sub(old, new, content)

# Write back the updated content
with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated animation classes in templates/index.html")
