"""
Hero API Routes
API endpoints for hero section data and functionality
"""

from flask import Blueprint, jsonify, request
from hero_service import hero_service

# Create blueprint for hero API
hero_api = Blueprint('hero_api', __name__, url_prefix='/api/hero')

@hero_api.route('/', methods=['GET'])
def get_hero_data():
    """Get complete hero section data"""
    try:
        hero_data = hero_service.get_hero_data()
        return jsonify({
            "success": True,
            "data": hero_data,
            "message": "Hero data retrieved successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to retrieve hero data"
        }), 500

@hero_api.route('/stats', methods=['GET'])
def get_hero_stats():
    """Get hero section statistics"""
    try:
        stats = hero_service.get_tech_stats()
        return jsonify({
            "success": True,
            "data": stats,
            "message": "Hero statistics retrieved successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to retrieve hero statistics"
        }), 500

@hero_api.route('/stats/<stat_id>', methods=['GET'])
def get_hero_stat(stat_id):
    """Get a specific hero statistic"""
    try:
        stat = hero_service.get_stat_by_id(stat_id)
        if not stat:
            return jsonify({
                "success": False,
                "error": "Stat not found",
                "message": f"No statistic found with ID: {stat_id}"
            }), 404
        
        return jsonify({
            "success": True,
            "data": stat,
            "message": "Hero statistic retrieved successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to retrieve hero statistic"
        }), 500

@hero_api.route('/typewriter', methods=['GET'])
def get_typewriter_text():
    """Get typewriter text"""
    try:
        index = request.args.get('index', type=int)
        text = hero_service.get_typewriter_text(index)
        return jsonify({
            "success": True,
            "data": {
                "text": text,
                "index": index,
                "all_texts": hero_service.typewriter_names
            },
            "message": "Typewriter text retrieved successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to retrieve typewriter text"
        }), 500

@hero_api.route('/typewriter/next', methods=['GET'])
def get_next_typewriter_text():
    """Get next typewriter text in sequence"""
    try:
        text = hero_service.get_next_typewriter_text()
        return jsonify({
            "success": True,
            "data": {
                "text": text,
                "index": hero_service.current_name_index
            },
            "message": "Next typewriter text retrieved successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to retrieve next typewriter text"
        }), 500

@hero_api.route('/profile', methods=['GET'])
def get_profile_info():
    """Get profile information"""
    try:
        profile = hero_service.get_profile_info()
        return jsonify({
            "success": True,
            "data": profile,
            "message": "Profile information retrieved successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to retrieve profile information"
        }), 500

@hero_api.route('/buttons', methods=['GET'])
def get_hero_buttons():
    """Get hero section buttons"""
    try:
        buttons = hero_service.get_hero_buttons()
        return jsonify({
            "success": True,
            "data": buttons,
            "message": "Hero buttons retrieved successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to retrieve hero buttons"
        }), 500

@hero_api.route('/stats/<stat_id>/increment', methods=['POST'])
def increment_stat(stat_id):
    """Increment a specific statistic"""
    try:
        result = hero_service.increment_stat(stat_id)
        if result:
            return jsonify({
                "success": True,
                "message": f"Statistic {stat_id} incremented successfully"
            })
        else:
            return jsonify({
                "success": False,
                "error": "Failed to increment statistic",
                "message": f"Could not increment statistic: {stat_id}"
            }), 400
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to increment statistic"
        }), 500

@hero_api.route('/validate', methods=['GET'])
def validate_hero_data():
    """Validate hero section data"""
    try:
        validation = hero_service.validate_hero_data()
        return jsonify({
            "success": True,
            "data": validation,
            "message": "Hero data validation completed"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to validate hero data"
        }), 500

@hero_api.route('/json', methods=['GET'])
def get_hero_json():
    """Get hero data as formatted JSON"""
    try:
        hero_json = hero_service.get_hero_json()
        return jsonify({
            "success": True,
            "data": hero_json,
            "message": "Hero JSON data retrieved successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to retrieve hero JSON data"
        }), 500

# Health check endpoint
@hero_api.route('/health', methods=['GET'])
def health_check():
    """Health check for hero API"""
    return jsonify({
        "success": True,
        "data": {
            "status": "healthy",
            "service": "Hero API",
            "endpoints": [
                "GET /api/hero/",
                "GET /api/hero/stats",
                "GET /api/hero/stats/<stat_id>",
                "GET /api/hero/typewriter",
                "GET /api/hero/typewriter/next",
                "GET /api/hero/profile",
                "GET /api/hero/buttons",
                "POST /api/hero/stats/<stat_id>/increment",
                "GET /api/hero/validate",
                "GET /api/hero/json",
                "GET /api/hero/health"
            ]
        },
        "message": "Hero API is healthy"
    })
