import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:5001/');
  check(res, { 'status was 200': (r) => r.status === 200 });

  const memoryInfo = http.get('http://localhost:5001/get_memory_info');
  check(memoryInfo, {
    'status was 200': (r) => r.status === 200,
    'body contains Total Memory': (r) => r.body.includes('Total Memory'),
  });

  sleep(1);
}
