import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

async function testAuth() {
  try {
    console.log('🔍 Testing Authentication Flow...\n');

    // Test 1: Check /auth/me without login (should fail with 401)
    console.log('Test 1: GET /auth/me (without login)');
    try {
      const response = await api.get('/auth/me');
      console.log('❌ UNEXPECTED: Should have failed but got:', response.status);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ PASS: Got expected 401 Unauthorized\n');
      } else {
        console.log('❌ FAIL: Got unexpected error:', error.message, '\n');
      }
    }

    // Test 2: Login
    console.log('Test 2: POST /auth/login');
    const loginData = {
      email: 'test@example.com',
      password: 'test123'
    };

    try {
      const loginResponse = await api.post('/auth/login', loginData);
      console.log('✅ Login successful');
      console.log('Response:', loginResponse.data);
      console.log('Cookies:', loginResponse.headers['set-cookie']);
      console.log('');

      // Test 3: Check /auth/me after login (should succeed)
      console.log('Test 3: GET /auth/me (after login)');
      const meResponse = await api.get('/auth/me');
      console.log('✅ PASS: Got user data');
      console.log('User:', meResponse.data.user?.email);
      console.log('');

    } catch (error) {
      console.log('❌ Login failed:', error.response?.data || error.message);
      console.log('Status:', error.response?.status);
      console.log('');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuth();
