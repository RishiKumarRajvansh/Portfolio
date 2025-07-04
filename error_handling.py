"""
Production-Ready Error Handling System
Comprehensive error handling for all components
"""

import functools
import logging
import traceback
from typing import Any, Callable, Dict, Optional, Tuple, Union
from flask import jsonify, request, current_app
import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('portfolio_errors.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

class ErrorHandler:
    """Centralized error handling system"""
    
    def __init__(self):
        self.error_counts = {}
        self.error_log = []
        
    def log_error(self, error_type: str, error_message: str, context: Dict = None):
        """Log error with context"""
        timestamp = datetime.datetime.now().isoformat()
        
        error_entry = {
            'timestamp': timestamp,
            'type': error_type,
            'message': error_message,
            'context': context or {},
            'stack_trace': traceback.format_exc()
        }
        
        self.error_log.append(error_entry)
        
        # Count errors
        if error_type in self.error_counts:
            self.error_counts[error_type] += 1
        else:
            self.error_counts[error_type] = 1
            
        # Log to file
        logger.error(f"{error_type}: {error_message}", extra=context)
        
        # Alert if too many errors
        if self.error_counts[error_type] > 10:
            logger.critical(f"High error count for {error_type}: {self.error_counts[error_type]}")
    
    def get_error_stats(self) -> Dict:
        """Get error statistics"""
        return {
            'total_errors': len(self.error_log),
            'error_types': self.error_counts,
            'recent_errors': self.error_log[-10:] if self.error_log else []
        }

# Global error handler instance
error_handler = ErrorHandler()

def handle_api_errors(func: Callable) -> Callable:
    """Decorator for API error handling"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            error_handler.log_error(
                error_type=f"API_ERROR_{func.__name__}",
                error_message=str(e),
                context={
                    'function': func.__name__,
                    'args': str(args),
                    'kwargs': str(kwargs),
                    'request_url': request.url if request else None,
                    'request_method': request.method if request else None
                }
            )
            
            # Return proper error response
            return jsonify({
                'success': False,
                'error': 'Internal server error',
                'message': 'An error occurred while processing your request',
                'error_id': len(error_handler.error_log),
                'timestamp': datetime.datetime.now().isoformat()
            }), 500
    return wrapper

def handle_service_errors(func: Callable) -> Callable:
    """Decorator for service layer error handling"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            error_handler.log_error(
                error_type=f"SERVICE_ERROR_{func.__name__}",
                error_message=str(e),
                context={
                    'service': func.__name__,
                    'args': str(args),
                    'kwargs': str(kwargs)
                }
            )
            
            # Return None or appropriate fallback
            return None
    return wrapper

def safe_api_call(api_function: Callable, fallback_data: Any = None, 
                 error_context: str = "") -> Tuple[bool, Any]:
    """Safe API call with fallback"""
    try:
        result = api_function()
        return True, result
    except Exception as e:
        error_handler.log_error(
            error_type="SAFE_API_CALL_ERROR",
            error_message=str(e),
            context={
                'function': api_function.__name__ if hasattr(api_function, '__name__') else str(api_function),
                'error_context': error_context,
                'fallback_used': fallback_data is not None
            }
        )
        return False, fallback_data

class ValidationError(Exception):
    """Custom validation error"""
    pass

class APIError(Exception):
    """Custom API error"""
    pass

class ServiceError(Exception):
    """Custom service error"""
    pass

def validate_required_fields(data: Dict, required_fields: list) -> Tuple[bool, str]:
    """Validate required fields in data"""
    try:
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        
        if missing_fields:
            error_msg = f"Missing required fields: {', '.join(missing_fields)}"
            error_handler.log_error(
                error_type="VALIDATION_ERROR",
                error_message=error_msg,
                context={'data_keys': list(data.keys()), 'required_fields': required_fields}
            )
            return False, error_msg
            
        return True, "Validation passed"
    except Exception as e:
        error_handler.log_error(
            error_type="VALIDATION_SYSTEM_ERROR",
            error_message=str(e),
            context={'data': str(data), 'required_fields': required_fields}
        )
        return False, "Validation system error"

def create_error_response(error_type: str, error_message: str, 
                         status_code: int = 500, context: Dict = None) -> tuple:
    """Create standardized error response"""
    error_id = len(error_handler.error_log) + 1
    
    error_handler.log_error(
        error_type=error_type,
        error_message=error_message,
        context=context
    )
    
    response = {
        'success': False,
        'error': error_type,
        'message': error_message,
        'error_id': error_id,
        'timestamp': datetime.datetime.now().isoformat(),
        'status_code': status_code
    }
    
    if current_app.debug and context:
        response['debug_context'] = context
    
    return jsonify(response), status_code

def handle_404_error(error):
    """Handle 404 errors"""
    error_handler.log_error(
        error_type="404_ERROR",
        error_message=f"Page not found: {request.url}",
        context={'url': request.url, 'method': request.method}
    )
    
    return jsonify({
        'success': False,
        'error': 'Page not found',
        'message': 'The requested resource was not found',
        'status_code': 404,
        'timestamp': datetime.datetime.now().isoformat()
    }), 404

def handle_500_error(error):
    """Handle 500 errors"""
    error_handler.log_error(
        error_type="500_ERROR",
        error_message=f"Internal server error: {str(error)}",
        context={'url': request.url, 'method': request.method}
    )
    
    return jsonify({
        'success': False,
        'error': 'Internal server error',
        'message': 'An unexpected error occurred',
        'status_code': 500,
        'timestamp': datetime.datetime.now().isoformat()
    }), 500

# Performance monitoring
class PerformanceMonitor:
    """Monitor performance metrics"""
    
    def __init__(self):
        self.metrics = {
            'api_calls': 0,
            'slow_requests': 0,
            'errors': 0,
            'cache_hits': 0,
            'cache_misses': 0
        }
        self.request_times = []
    
    def record_request_time(self, duration: float, endpoint: str):
        """Record request timing"""
        self.request_times.append({
            'duration': duration,
            'endpoint': endpoint,
            'timestamp': datetime.datetime.now().isoformat()
        })
        
        if duration > 1.0:  # Slow request threshold
            self.metrics['slow_requests'] += 1
            logger.warning(f"Slow request detected: {endpoint} took {duration:.2f}s")
    
    def get_performance_stats(self) -> Dict:
        """Get performance statistics"""
        if self.request_times:
            avg_time = sum(r['duration'] for r in self.request_times) / len(self.request_times)
            max_time = max(r['duration'] for r in self.request_times)
            min_time = min(r['duration'] for r in self.request_times)
        else:
            avg_time = max_time = min_time = 0
        
        return {
            'metrics': self.metrics,
            'request_stats': {
                'total_requests': len(self.request_times),
                'average_time': avg_time,
                'max_time': max_time,
                'min_time': min_time
            },
            'recent_requests': self.request_times[-10:] if self.request_times else []
        }

# Global performance monitor
performance_monitor = PerformanceMonitor()

def monitor_performance(func: Callable) -> Callable:
    """Decorator for performance monitoring"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        import time
        start_time = time.time()
        
        try:
            result = func(*args, **kwargs)
            duration = time.time() - start_time
            
            performance_monitor.record_request_time(duration, func.__name__)
            performance_monitor.metrics['api_calls'] += 1
            
            return result
        except Exception as e:
            duration = time.time() - start_time
            performance_monitor.record_request_time(duration, func.__name__)
            performance_monitor.metrics['errors'] += 1
            raise
    
    return wrapper

# Health check functions
def check_system_health() -> Dict:
    """Comprehensive system health check"""
    health_status = {
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat(),
        'checks': {}
    }
    
    # Check error rates
    error_stats = error_handler.get_error_stats()
    if error_stats['total_errors'] > 100:
        health_status['checks']['error_rate'] = 'warning'
        health_status['status'] = 'degraded'
    else:
        health_status['checks']['error_rate'] = 'healthy'
    
    # Check performance
    perf_stats = performance_monitor.get_performance_stats()
    if perf_stats['request_stats']['average_time'] > 2.0:
        health_status['checks']['performance'] = 'warning'
        health_status['status'] = 'degraded'
    else:
        health_status['checks']['performance'] = 'healthy'
    
    # Check memory usage (basic)
    import psutil
    memory_usage = psutil.virtual_memory().percent
    if memory_usage > 80:
        health_status['checks']['memory'] = 'warning'
        health_status['status'] = 'degraded'
    else:
        health_status['checks']['memory'] = 'healthy'
    
    return health_status
