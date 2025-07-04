# Enhanced API Routes - Extended functionality using services.py
# This file contains new API endpoints that leverage Python services for better performance

from flask import Blueprint, request, jsonify
from services import doodle_service, contact_service, content_service
from error_handling import handle_api_errors, create_error_response, monitor_performance
import datetime

# Create a blueprint for enhanced APIs
api_bp = Blueprint('api_enhanced', __name__, url_prefix='/api/v2')


# Enhanced Doodle APIs
@api_bp.route('/doodles/optimized', methods=['GET'])
@handle_api_errors
@monitor_performance
def get_optimized_doodles():
    """Generate optimized doodles with device-specific performance tuning"""
    # Get request parameters
    count = request.args.get('count', default=15, type=int)
    device_type = request.args.get('device', default='desktop', type=str)
    section = request.args.get('section', default=None, type=int)
    
    # Validate device type
    if device_type not in ['mobile', 'tablet', 'desktop']:
        return create_error_response(
            error_type='INVALID_DEVICE_TYPE',
            error_message=f'Invalid device type: {device_type}. Must be mobile, tablet, or desktop.',
            status_code=400
        )
    
    # Generate optimized doodles
    doodles = doodle_service.generate_optimized_doodles(
        count=count, 
        device_type=device_type, 
        section=section
    )
    
    if doodles is None:
        return create_error_response(
            error_type='DOODLE_GENERATION_FAILED',
            error_message='Failed to generate doodles',
            status_code=500
        )
    
    # Get performance configuration
    performance_config = doodle_service.get_performance_config(device_type)
    
    return jsonify({
        'success': True,
        'doodles': doodles,
        'count': len(doodles),
        'device_type': device_type,
        'performance_config': performance_config,
        'generated_at': datetime.datetime.now().isoformat(),
        'api_version': '2.0'
    })


@api_bp.route('/doodles/config/<device_type>')
def get_doodle_config(device_type):
    """Get performance configuration for specific device type"""
    try:
        config = doodle_service.get_performance_config(device_type)
        return jsonify({
            'success': True,
            'device_type': device_type,
            'config': config,
            'api_version': '2.0'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# Enhanced Contact APIs
@api_bp.route('/contact/validate', methods=['POST'])
def validate_contact_enhanced():
    """Enhanced contact form validation with spam detection"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Perform enhanced validation
        is_valid, message, details = contact_service.validate_contact_data(data)
        
        response = {
            'success': True,
            'valid': is_valid,
            'message': message,
            'details': details,
            'api_version': '2.0'
        }
        
        # If valid, generate email template
        if is_valid:
            email_template = contact_service.generate_email_template(
                data.get('name', ''),
                data.get('email', ''),
                data.get('subject', ''),
                data.get('message', '')
            )
            response['email_template'] = email_template
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@api_bp.route('/contact/template', methods=['POST'])
def generate_email_template():
    """Generate professional email template"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        template = contact_service.generate_email_template(
            data.get('name', ''),
            data.get('email', ''),
            data.get('subject', ''),
            data.get('message', '')
        )
        
        return jsonify({
            'success': True,
            'template': template,
            'generated_at': datetime.datetime.now().isoformat(),
            'api_version': '2.0'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# Enhanced Content APIs
@api_bp.route('/content/testimonials')
def get_testimonials_enhanced():
    """Get testimonials with intelligent rotation"""
    try:
        data = content_service.get_testimonials_with_rotation()
        return jsonify({
            'success': True,
            'data': data,
            'api_version': '2.0'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@api_bp.route('/content/projects')
def get_projects_enhanced():
    """Get projects with filtering capabilities"""
    try:
        category = request.args.get('category', None)
        featured_only = request.args.get('featured', 'false').lower() == 'true'
        
        data = content_service.get_projects_with_filters(
            category=category,
            featured_only=featured_only
        )
        
        return jsonify({
            'success': True,
            'data': data,
            'filters_applied': {
                'category': category,
                'featured_only': featured_only
            },
            'api_version': '2.0'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# System Status APIs
@api_bp.route('/status')
def api_status():
    """Get API status and health check"""
    return jsonify({
        'success': True,
        'status': 'healthy',
        'services': {
            'doodle_service': 'active',
            'contact_service': 'active',
            'content_service': 'active'
        },
        'api_version': '2.0',
        'timestamp': datetime.datetime.now().isoformat()
    })


@api_bp.route('/performance/report', methods=['POST'])
def performance_report():
    """Receive performance reports from client"""
    try:
        data = request.get_json()
        
        # Log performance data (in production, you'd save this to a database)
        print(f"Performance Report: {data}")
        
        # Provide recommendations based on performance
        recommendations = []
        if data.get('fps', 60) < 30:
            recommendations.append('Reduce doodle count for better performance')
        if data.get('memory_usage', 0) > 100:  # MB
            recommendations.append('Enable performance mode')
        
        return jsonify({
            'success': True,
            'recommendations': recommendations,
            'server_time': datetime.datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
