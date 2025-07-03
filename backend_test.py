#!/usr/bin/env python3
import requests
import json
import time
import sys
from datetime import datetime

# Get the backend URL from the frontend/.env file
BACKEND_URL = "http://localhost:8001/api"

def test_root_endpoint():
    """Test the root endpoint GET /api/"""
    print("\n=== Testing Root Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert response.json() == {"message": "Hello World"}, f"Expected response {{'message': 'Hello World'}}, got {response.json()}"
        
        print("✅ Root endpoint test passed!")
        return True
    except Exception as e:
        print(f"❌ Root endpoint test failed: {str(e)}")
        return False

def test_create_status_check():
    """Test the POST /api/status endpoint"""
    print("\n=== Testing Create Status Check ===")
    try:
        client_name = f"Test Client {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        payload = {"client_name": client_name}
        
        response = requests.post(f"{BACKEND_URL}/status", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert response.json()["client_name"] == client_name, f"Expected client_name {client_name}, got {response.json()['client_name']}"
        assert "id" in response.json(), "Response missing 'id' field"
        assert "timestamp" in response.json(), "Response missing 'timestamp' field"
        
        print("✅ Create status check test passed!")
        return True, response.json()["id"]
    except Exception as e:
        print(f"❌ Create status check test failed: {str(e)}")
        return False, None

def test_get_status_checks(created_id=None):
    """Test the GET /api/status endpoint"""
    print("\n=== Testing Get Status Checks ===")
    try:
        response = requests.get(f"{BACKEND_URL}/status")
        print(f"Status Code: {response.status_code}")
        print(f"Found {len(response.json())} status checks")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert isinstance(response.json(), list), f"Expected list response, got {type(response.json())}"
        
        # If we created a status check, verify it's in the list
        if created_id:
            found = False
            for status in response.json():
                if status["id"] == created_id:
                    found = True
                    break
            assert found, f"Created status check with ID {created_id} not found in response"
            print(f"✅ Successfully found created status check with ID {created_id}")
        
        print("✅ Get status checks test passed!")
        return True
    except Exception as e:
        print(f"❌ Get status checks test failed: {str(e)}")
        return False

def test_cors():
    """Test CORS headers"""
    print("\n=== Testing CORS Headers ===")
    try:
        headers = {
            "Origin": "http://example.com",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "Content-Type"
        }
        
        # Options request to check CORS preflight
        response = requests.options(f"{BACKEND_URL}/", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"CORS Headers: {response.headers.get('Access-Control-Allow-Origin')}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert response.headers.get("Access-Control-Allow-Origin") == "*", "CORS headers not properly set"
        
        print("✅ CORS test passed!")
        return True
    except Exception as e:
        print(f"❌ CORS test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all tests and return overall status"""
    print("\n🔍 Starting Backend API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    
    # Test connectivity
    try:
        requests.get(f"{BACKEND_URL}/")
        print("✅ Backend server is accessible")
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend server. Make sure it's running on port 8001")
        return False
    
    # Run all tests
    root_test = test_root_endpoint()
    create_test, created_id = test_create_status_check()
    get_test = test_get_status_checks(created_id)
    cors_test = test_cors()
    
    # Overall status
    all_passed = root_test and create_test and get_test and cors_test
    
    if all_passed:
        print("\n✅ All backend API tests passed successfully!")
    else:
        print("\n❌ Some backend API tests failed. See details above.")
    
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)