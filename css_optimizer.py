"""
CSS Bundling and Optimization System
Combines multiple CSS files into optimized bundles
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple

class CSSOptimizer:
    """CSS bundling and optimization system"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.css_dir = self.project_root / 'static' / 'css'
        self.output_dir = self.css_dir / 'bundles'
        self.output_dir.mkdir(exist_ok=True)
        
        # CSS file groups for bundling
        self.bundles = {
            'critical': [
                'base.css',
                'utilities.css',
                'consolidated.css'
            ],
            'layout': [
                'navigation.css',
                'hero.css',
                'footer.css'
            ],
            'sections': [
                'about.css',
                'education.css',
                'badges.css',
                'experience.css',
                'projects.css',
                'testimonials.css',
                'contact.css'
            ],
            'effects': [
                'doodle.css',
                'starfield.css'
            ]
        }
    
    def remove_duplicates(self, css_content: str) -> str:
        """Remove duplicate CSS rules"""
        # Split into rules
        rules = re.split(r'(})', css_content)
        seen_rules = set()
        unique_rules = []
        
        for rule in rules:
            rule = rule.strip()
            if not rule:
                continue
                
            # Extract selector and properties
            if '{' in rule:
                selector_part = rule.split('{')[0].strip()
                properties_part = rule.split('{')[1] if '{' in rule else ''
                
                # Normalize for comparison
                normalized = f"{selector_part}{{{properties_part}"
                
                if normalized not in seen_rules:
                    seen_rules.add(normalized)
                    unique_rules.append(rule)
            else:
                unique_rules.append(rule)
        
        return ''.join(unique_rules)
    
    def minify_css(self, css_content: str) -> str:
        """Minify CSS content"""
        # Remove comments
        css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
        
        # Remove extra whitespace
        css_content = re.sub(r'\s+', ' ', css_content)
        
        # Remove unnecessary spaces around specific characters
        css_content = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', css_content)
        
        # Remove trailing semicolons before closing braces
        css_content = re.sub(r';\s*}', '}', css_content)
        
        # Remove empty rules
        css_content = re.sub(r'[^{}]*{\s*}', '', css_content)
        
        return css_content.strip()
    
    def extract_critical_css(self, css_content: str) -> Tuple[str, str]:
        """Extract critical CSS for above-the-fold content"""
        critical_selectors = [
            'body', 'html', '.container', '.hero', '.navbar', '.hero-content',
            '.hero-title', '.hero-subtitle', '.hero-description', '.hero-buttons',
            '.btn', '.section-title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
        ]
        
        critical_css = []
        non_critical_css = []
        
        # Split CSS into rules
        rules = re.split(r'(})', css_content)
        current_rule = ""
        
        for part in rules:
            current_rule += part
            
            if part == '}':
                # Check if this rule is critical
                is_critical = any(selector in current_rule for selector in critical_selectors)
                
                if is_critical:
                    critical_css.append(current_rule)
                else:
                    non_critical_css.append(current_rule)
                
                current_rule = ""
        
        return ''.join(critical_css), ''.join(non_critical_css)
    
    def create_bundle(self, bundle_name: str, files: List[str]) -> Dict:
        """Create a CSS bundle from multiple files"""
        bundle_content = []
        file_info = []
        
        for file_name in files:
            file_path = self.css_dir / file_name
            
            if file_path.exists():
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Add file header comment
                    bundle_content.append(f"/* === {file_name} === */")
                    bundle_content.append(content)
                    bundle_content.append("")
                    
                    file_info.append({
                        'name': file_name,
                        'size': len(content),
                        'exists': True
                    })
            else:
                file_info.append({
                    'name': file_name,
                    'size': 0,
                    'exists': False
                })
        
        # Combine all content
        combined_content = '\n'.join(bundle_content)
        
        # Remove duplicates
        deduplicated_content = self.remove_duplicates(combined_content)
        
        # Create minified version
        minified_content = self.minify_css(deduplicated_content)
        
        # Write bundle files
        bundle_path = self.output_dir / f"{bundle_name}.css"
        minified_path = self.output_dir / f"{bundle_name}.min.css"
        
        with open(bundle_path, 'w', encoding='utf-8') as f:
            f.write(deduplicated_content)
        
        with open(minified_path, 'w', encoding='utf-8') as f:
            f.write(minified_content)
        
        return {
            'name': bundle_name,
            'files': file_info,
            'original_size': len(combined_content),
            'deduplicated_size': len(deduplicated_content),
            'minified_size': len(minified_content),
            'compression_ratio': len(minified_content) / len(combined_content),
            'bundle_path': str(bundle_path),
            'minified_path': str(minified_path)
        }
    
    def create_all_bundles(self) -> Dict:
        """Create all CSS bundles"""
        results = {}
        
        for bundle_name, files in self.bundles.items():
            results[bundle_name] = self.create_bundle(bundle_name, files)
        
        # Create critical CSS bundle
        critical_files = ['base.css', 'utilities.css', 'hero.css', 'navigation.css']
        critical_bundle = self.create_bundle('critical', critical_files)
        
        # Extract critical CSS from the critical bundle
        critical_path = self.output_dir / 'critical.css'
        if critical_path.exists():
            with open(critical_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            critical_css, non_critical_css = self.extract_critical_css(content)
            
            # Write critical CSS for inline embedding
            inline_critical_path = self.output_dir / 'inline-critical.css'
            with open(inline_critical_path, 'w', encoding='utf-8') as f:
                f.write(self.minify_css(critical_css))
            
            critical_bundle['inline_critical_path'] = str(inline_critical_path)
            critical_bundle['inline_critical_size'] = len(critical_css)
        
        results['critical'] = critical_bundle
        
        # Generate bundle manifest
        manifest = {
            'timestamp': str(Path(__file__).stat().st_mtime),
            'bundles': results,
            'total_original_size': sum(bundle['original_size'] for bundle in results.values()),
            'total_minified_size': sum(bundle['minified_size'] for bundle in results.values()),
            'overall_compression_ratio': sum(bundle['minified_size'] for bundle in results.values()) / sum(bundle['original_size'] for bundle in results.values())
        }
        
        manifest_path = self.output_dir / 'manifest.json'
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2)
        
        return results
    
    def generate_loading_strategy(self) -> str:
        """Generate CSS loading strategy for HTML"""
        return '''
<!-- Critical CSS (inline for fastest loading) -->
<style>
/* Critical CSS will be inlined here */
</style>

<!-- Preload key bundles -->
<link rel="preload" href="/static/css/bundles/critical.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="/static/css/bundles/layout.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- Load sections bundle async -->
<link rel="preload" href="/static/css/bundles/sections.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- Load effects bundle last -->
<link rel="preload" href="/static/css/bundles/effects.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- Fallback for JS disabled -->
<noscript>
    <link rel="stylesheet" href="/static/css/bundles/critical.min.css">
    <link rel="stylesheet" href="/static/css/bundles/layout.min.css">
    <link rel="stylesheet" href="/static/css/bundles/sections.min.css">
    <link rel="stylesheet" href="/static/css/bundles/effects.min.css">
</noscript>
'''

def optimize_css(project_root: str) -> Dict:
    """Main function to optimize CSS"""
    optimizer = CSSOptimizer(project_root)
    results = optimizer.create_all_bundles()
    
    # Print summary
    print("CSS Optimization Complete:")
    print(f"Total bundles created: {len(results)}")
    
    total_original = sum(bundle['original_size'] for bundle in results.values())
    total_minified = sum(bundle['minified_size'] for bundle in results.values())
    
    print(f"Original size: {total_original:,} bytes")
    print(f"Minified size: {total_minified:,} bytes")
    print(f"Compression ratio: {total_minified/total_original:.2%}")
    print(f"Size reduction: {total_original - total_minified:,} bytes")
    
    return results

if __name__ == '__main__':
    import sys
    project_root = sys.argv[1] if len(sys.argv) > 1 else '.'
    optimize_css(project_root)
