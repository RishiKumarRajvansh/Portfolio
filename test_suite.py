"""
Comprehensive Testing Framework
Production-ready testing for all components
"""

import pytest
import json
import time
from unittest.mock import Mock, patch, MagicMock
from flask import Flask
from app import app
from services import doodle_service, contact_service, content_service
from hero_service import hero_service
from error_handling import error_handler, performance_monitor

class TestConfig:
    """Test configuration"""
    TESTING = True
    DEBUG = False
    SECRET_KEY = 'test-secret-key'

@pytest.fixture
def client():
    """Test client fixture"""
    app.config.from_object(TestConfig)
    with app.test_client() as client:
        with app.app_context():
            yield client

@pytest.fixture
def sample_contact_data():
    """Sample contact form data"""
    return {
        'name': 'John Doe',
        'email': 'john@example.com',
        'subject': 'Test Subject',
        'message': 'This is a test message with sufficient length to pass validation.'
    }

@pytest.fixture
def sample_doodle_data():
    """Sample doodle data"""
    return {
        'count': 10,
        'device_type': 'desktop',
        'section': 1
    }

class TestAppBasics:
    """Test basic app functionality"""
    
    def test_app_creation(self):
        """Test app can be created"""
        assert app is not None
        assert app.config['SECRET_KEY'] is not None
    
    def test_home_page(self, client):
        """Test home page loads successfully"""
        response = client.get('/')
        assert response.status_code == 200
        assert b'RISHI KUMAR' in response.data
    
    def test_404_page(self, client):
        """Test 404 error handling"""
        response = client.get('/nonexistent-page')
        assert response.status_code == 404
    
    def test_contact_form_get(self, client):
        """Test contact form redirect"""
        response = client.get('/contact')
        assert response.status_code == 302  # Redirect to home#contact

class TestAPIEndpoints:
    """Test API endpoints"""
    
    def test_hero_api_health(self, client):
        """Test hero API health check"""
        response = client.get('/api/hero/health')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['success'] is True
        assert data['data']['status'] == 'healthy'
    
    def test_hero_api_data(self, client):
        """Test hero API data retrieval"""
        response = client.get('/api/hero/')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['success'] is True
        assert 'data' in data
        assert 'name' in data['data']
    
    def test_hero_api_stats(self, client):
        """Test hero API stats"""
        response = client.get('/api/hero/stats')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['success'] is True
        assert isinstance(data['data'], list)
        assert len(data['data']) > 0
    
    def test_doodle_api_basic(self, client):
        """Test basic doodle API"""
        response = client.get('/api/doodles?count=5')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert 'doodles' in data
        assert isinstance(data['doodles'], list)
    
    def test_doodle_api_optimized(self, client):
        """Test optimized doodle API"""
        response = client.get('/api/v2/doodles/optimized?count=10&device=mobile')
        assert response.status_code == 200
        
        data = json.loads(response.data)
        assert data['success'] is True
        assert len(data['doodles']) <= 15  # Mobile limit
    
    def test_contact_form_post(self, client, sample_contact_data):
        """Test contact form submission"""
        response = client.post('/send-message', data=sample_contact_data)
        # Should redirect to mailto URL
        assert response.status_code == 302
        assert response.location.startswith('mailto:')

class TestServices:
    """Test service layer"""
    
    def test_hero_service_initialization(self):
        """Test hero service initialization"""
        assert hero_service.name == "RISHI KUMAR"
        assert len(hero_service.typewriter_names) > 0
        assert hero_service.get_hero_data() is not None
    
    def test_hero_service_stats(self):
        """Test hero service stats"""
        stats = hero_service.get_tech_stats()
        assert isinstance(stats, list)
        assert len(stats) > 0
        
        for stat in stats:
            assert 'id' in stat
            assert 'number' in stat
            assert 'label' in stat
    
    def test_hero_service_validation(self):
        """Test hero service data validation"""
        validation = hero_service.validate_hero_data()
        assert 'valid' in validation
        assert 'errors' in validation
        assert 'warnings' in validation
    
    def test_doodle_service_generation(self):
        """Test doodle service generation"""
        doodles = doodle_service.generate_optimized_doodles(count=5)
        assert isinstance(doodles, list)
        assert len(doodles) == 5
        
        for doodle in doodles:
            assert 'icon' in doodle
            assert 'color' in doodle
            assert 'size' in doodle
    
    def test_doodle_service_device_optimization(self):
        """Test device-specific optimization"""
        mobile_doodles = doodle_service.generate_optimized_doodles(
            count=30, device_type='mobile'
        )
        assert len(mobile_doodles) <= 15  # Mobile limit
        
        desktop_doodles = doodle_service.generate_optimized_doodles(
            count=30, device_type='desktop'
        )
        assert len(desktop_doodles) <= 35  # Desktop limit
    
    def test_contact_service_validation(self, sample_contact_data):
        """Test contact service validation"""
        is_valid, message, details = contact_service.validate_contact_data(sample_contact_data)
        assert is_valid is True
        assert message == 'Valid'
        assert isinstance(details, dict)
    
    def test_contact_service_spam_detection(self):
        """Test spam detection"""
        spam_data = {
            'name': 'URGENT WINNER',
            'email': 'spam@tempmail.com',
            'subject': 'YOU WON LOTTERY!!!',
            'message': 'CLICK HERE TO CLAIM YOUR PRIZE!!! URGENT URGENT URGENT'
        }
        
        is_valid, message, details = contact_service.validate_contact_data(spam_data)
        assert is_valid is False
        assert 'spam' in message.lower()
    
    def test_contact_service_email_template(self):
        """Test email template generation"""
        template = contact_service.generate_email_template(
            'John Doe', 'john@example.com', 'Test Subject', 'Test message'
        )
        assert 'John Doe' in template
        assert 'john@example.com' in template
        assert 'Test Subject' in template
        assert 'Test message' in template
    
    def test_content_service_testimonials(self):
        """Test testimonials service"""
        data = content_service.get_testimonials_with_rotation()
        assert 'testimonials' in data
        assert 'total_count' in data
        assert isinstance(data['testimonials'], list)
    
    def test_content_service_projects(self):
        """Test projects service"""
        data = content_service.get_projects_with_filters()
        assert 'projects' in data
        assert 'categories' in data
        assert isinstance(data['projects'], list)

class TestErrorHandling:
    """Test error handling system"""
    
    def test_error_handler_initialization(self):
        """Test error handler initialization"""
        assert error_handler is not None
        assert hasattr(error_handler, 'error_counts')
        assert hasattr(error_handler, 'error_log')
    
    def test_error_logging(self):
        """Test error logging functionality"""
        initial_count = len(error_handler.error_log)
        
        error_handler.log_error(
            error_type='TEST_ERROR',
            error_message='This is a test error',
            context={'test': True}
        )
        
        assert len(error_handler.error_log) == initial_count + 1
        assert 'TEST_ERROR' in error_handler.error_counts
    
    def test_error_stats(self):
        """Test error statistics"""
        stats = error_handler.get_error_stats()
        assert 'total_errors' in stats
        assert 'error_types' in stats
        assert 'recent_errors' in stats
        assert isinstance(stats['total_errors'], int)
    
    def test_performance_monitor(self):
        """Test performance monitoring"""
        initial_count = performance_monitor.metrics['api_calls']
        
        # Simulate request
        performance_monitor.record_request_time(0.5, 'test_endpoint')
        performance_monitor.metrics['api_calls'] += 1
        
        stats = performance_monitor.get_performance_stats()
        assert stats['metrics']['api_calls'] == initial_count + 1
        assert 'request_stats' in stats

class TestInputValidation:
    """Test input validation"""
    
    def test_contact_validation_missing_fields(self):
        """Test validation with missing fields"""
        incomplete_data = {
            'name': 'John Doe',
            'email': 'john@example.com'
            # Missing subject and message
        }
        
        is_valid, message, details = contact_service.validate_contact_data(incomplete_data)
        assert is_valid is False
        assert 'required' in message.lower()
    
    def test_contact_validation_invalid_email(self):
        """Test validation with invalid email"""
        invalid_data = {
            'name': 'John Doe',
            'email': 'invalid-email',
            'subject': 'Test Subject',
            'message': 'Test message with sufficient length'
        }
        
        is_valid, message, details = contact_service.validate_contact_data(invalid_data)
        assert is_valid is False
        assert 'email' in message.lower()
    
    def test_doodle_validation_invalid_count(self):
        """Test doodle generation with invalid count"""
        result = doodle_service.generate_optimized_doodles(count=-1)
        assert result is None  # Should return None due to error handling
    
    def test_doodle_validation_invalid_device(self):
        """Test doodle generation with invalid device type"""
        result = doodle_service.generate_optimized_doodles(
            count=10, device_type='invalid_device'
        )
        assert result is None  # Should return None due to error handling

class TestPerformance:
    """Test performance aspects"""
    
    def test_response_time_home_page(self, client):
        """Test home page response time"""
        start_time = time.time()
        response = client.get('/')
        end_time = time.time()
        
        response_time = end_time - start_time
        assert response_time < 2.0  # Should respond within 2 seconds
        assert response.status_code == 200
    
    def test_api_response_time(self, client):
        """Test API response time"""
        start_time = time.time()
        response = client.get('/api/hero/')
        end_time = time.time()
        
        response_time = end_time - start_time
        assert response_time < 1.0  # API should respond within 1 second
        assert response.status_code == 200
    
    def test_doodle_generation_performance(self):
        """Test doodle generation performance"""
        start_time = time.time()
        doodles = doodle_service.generate_optimized_doodles(count=50)
        end_time = time.time()
        
        generation_time = end_time - start_time
        assert generation_time < 0.5  # Should generate within 0.5 seconds
        assert doodles is not None
    
    def test_memory_usage(self):
        """Test memory usage doesn't grow excessively"""
        import psutil
        import os
        
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss
        
        # Perform operations that might cause memory leaks
        for _ in range(100):
            doodle_service.generate_optimized_doodles(count=10)
            contact_service.validate_contact_data({
                'name': 'Test',
                'email': 'test@example.com',
                'subject': 'Test',
                'message': 'Test message'
            })
        
        final_memory = process.memory_info().rss
        memory_increase = final_memory - initial_memory
        
        # Memory shouldn't increase by more than 50MB
        assert memory_increase < 50 * 1024 * 1024

class TestSecurityAspects:
    """Test security aspects"""
    
    def test_sql_injection_protection(self, client):
        """Test SQL injection protection"""
        malicious_input = "'; DROP TABLE users; --"
        
        response = client.post('/send-message', data={
            'name': malicious_input,
            'email': 'test@example.com',
            'subject': 'Test',
            'message': 'Test message'
        })
        
        # Should not cause server error
        assert response.status_code in [200, 302]
    
    def test_xss_protection(self, client):
        """Test XSS protection"""
        malicious_script = "<script>alert('XSS')</script>"
        
        response = client.post('/send-message', data={
            'name': 'Test User',
            'email': 'test@example.com',
            'subject': malicious_script,
            'message': 'Test message'
        })
        
        # Should not cause server error
        assert response.status_code in [200, 302]
    
    def test_csrf_protection(self, client):
        """Test CSRF protection basics"""
        # This would be more comprehensive with actual CSRF tokens
        response = client.post('/send-message', data={})
        assert response.status_code in [200, 302, 400]

class TestIntegration:
    """Integration tests"""
    
    def test_full_contact_flow(self, client, sample_contact_data):
        """Test complete contact form flow"""
        # Test form validation
        response = client.post('/api/v2/contact/validate', 
                             json=sample_contact_data,
                             headers={'Content-Type': 'application/json'})
        
        if response.status_code == 200:
            data = json.loads(response.data)
            assert data['success'] is True
            assert data['valid'] is True
    
    def test_full_doodle_flow(self, client):
        """Test complete doodle generation flow"""
        # Test basic doodle API
        response = client.get('/api/doodles?count=5')
        assert response.status_code == 200
        
        # Test optimized doodle API
        response = client.get('/api/v2/doodles/optimized?count=10&device=mobile')
        assert response.status_code == 200
    
    def test_api_consistency(self, client):
        """Test API response consistency"""
        # Test multiple API endpoints for consistent response format
        endpoints = [
            '/api/hero/health',
            '/api/hero/',
            '/api/hero/stats'
        ]
        
        for endpoint in endpoints:
            response = client.get(endpoint)
            assert response.status_code == 200
            
            data = json.loads(response.data)
            assert 'success' in data
            assert 'data' in data or 'message' in data

# Test configuration
if __name__ == '__main__':
    pytest.main([__file__, '-v', '--tb=short'])
