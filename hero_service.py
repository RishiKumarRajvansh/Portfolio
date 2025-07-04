"""
Hero Section Service
Handles hero section data and statistics
"""

import json
from datetime import datetime
from typing import Dict, List, Any

class HeroService:
    """Service for managing hero section data and statistics"""
    
    def __init__(self):
        self.name = "RISHI KUMAR"
        self.typewriter_names = ["RISHI KUMAR", "PYTHON DEV", "DATA SCIENTIST", "ML ENGINEER"]
        self.current_name_index = 0
        
    def get_hero_data(self) -> Dict[str, Any]:
        """Get complete hero section data"""
        return {
            "name": self.name,
            "typewriter_names": self.typewriter_names,
            "title": "PYTHON DEVELOPER & DATA SCIENTIST",
            "description": "Passionate about transforming data into actionable insights and building scalable solutions. Specialized in machine learning, data analysis, and full-stack Python development.",
            "stats": self.get_tech_stats(),
            "buttons": self.get_hero_buttons(),
            "profile_info": self.get_profile_info()
        }
    
    def get_tech_stats(self) -> List[Dict[str, Any]]:
        """Get technical statistics for hero section"""
        return [
            {
                "id": "python_years",
                "icon": "fab fa-python",
                "number": 3,
                "label": "YEARS PYTHON",
                "color": "#3776ab",
                "description": "Years of Python development experience"
            },
            {
                "id": "data_projects",
                "icon": "fas fa-chart-bar",
                "number": 1,
                "label": "DATA PROJECTS",
                "color": "#0ea5e9",
                "description": "Completed data science projects"
            },
            {
                "id": "flask_apps",
                "icon": "fas fa-flask",
                "number": 15,
                "label": "FLASK APPS",
                "color": "#000000",
                "description": "Flask applications developed"
            },
            {
                "id": "ml_models",
                "icon": "fas fa-robot",
                "number": 10,
                "label": "ML MODELS",
                "color": "#ff6b6b",
                "description": "Machine learning models trained"
            },
            {
                "id": "django_projects",
                "icon": "fas fa-server",
                "number": 4,
                "label": "DJANGO PROJECTS",
                "color": "#092e20",
                "description": "Django projects completed"
            }
        ]
    
    def get_hero_buttons(self) -> List[Dict[str, Any]]:
        """Get hero section buttons"""
        return [
            {
                "text": "VIEW MY WORK",
                "href": "#projects",
                "class": "btn btn-primary",
                "icon": "fas fa-code"
            },
            {
                "text": "GET IN TOUCH",
                "href": "#contact",
                "class": "btn btn-secondary",
                "icon": "fas fa-envelope"
            }
        ]
    
    def get_profile_info(self) -> Dict[str, Any]:
        """Get profile information"""
        return {
            "avatar_icon": "fas fa-terminal",
            "status": "Available for hire",
            "location": "India",
            "experience_years": 3,
            "specialization": "Python & Data Science"
        }
    
    def get_typewriter_text(self, index: int = None) -> str:
        """Get typewriter text by index"""
        if index is None:
            index = self.current_name_index
        
        if 0 <= index < len(self.typewriter_names):
            return self.typewriter_names[index]
        return self.name
    
    def get_next_typewriter_text(self) -> str:
        """Get next typewriter text in sequence"""
        self.current_name_index = (self.current_name_index + 1) % len(self.typewriter_names)
        return self.typewriter_names[self.current_name_index]
    
    def increment_stat(self, stat_id: str) -> bool:
        """Increment a specific statistic"""
        # This could be expanded to track real-time stats
        # For now, it's a placeholder for future functionality
        return True
    
    def get_stat_by_id(self, stat_id: str) -> Dict[str, Any]:
        """Get a specific stat by ID"""
        stats = self.get_tech_stats()
        for stat in stats:
            if stat["id"] == stat_id:
                return stat
        return {}
    
    def get_hero_json(self) -> str:
        """Get hero data as JSON string"""
        return json.dumps(self.get_hero_data(), indent=2)
    
    def validate_hero_data(self) -> Dict[str, Any]:
        """Validate hero section data"""
        hero_data = self.get_hero_data()
        validation_results = {
            "valid": True,
            "errors": [],
            "warnings": []
        }
        
        # Check required fields
        required_fields = ["name", "title", "description", "stats"]
        for field in required_fields:
            if field not in hero_data or not hero_data[field]:
                validation_results["errors"].append(f"Missing required field: {field}")
                validation_results["valid"] = False
        
        # Check stats
        stats = hero_data.get("stats", [])
        if len(stats) == 0:
            validation_results["errors"].append("No statistics found")
            validation_results["valid"] = False
        
        for stat in stats:
            if "number" not in stat or stat["number"] <= 0:
                validation_results["warnings"].append(f"Invalid number for stat: {stat.get('id', 'unknown')}")
        
        return validation_results

# Global instance
hero_service = HeroService()
