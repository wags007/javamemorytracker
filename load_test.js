import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 users over 30 seconds
    { duration: '1m', target: 20 },   // Stay at 20 users for 1 minute
    { duration: '30s', target: 0 },   // Ramp down to 0 users over 30 seconds
  ],
};

export default function () {
  // Test the main page
  let res = http.get('http://localhost:5001/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  
  // Test the get_memory_info endpoint
  res = http.get('http://localhost:5001/get_memory_info');
  check(res, { 
    'status was 200': (r) => r.status == 200,
    'body contains memory info': (r) => r.body.includes('Total Memory'),
  });
  
  // Test the simulate_memory_leak endpoint
  res = http.get('http://localhost:5001/simulate_memory_leak');
  check(res, { 
    'status was 200': (r) => r.status == 200,
    'body contains leaked memory info': (r) => r.body.includes('Simulated Memory Leak Size'),
  });
  
  sleep(1);
}
