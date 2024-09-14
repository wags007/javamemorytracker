import http from 'k6/http';
import { check, sleep } from 'k6';
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
    api: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 },
      ],
    },
  },
};

export default function () {
  http.get('http://localhost:5001/');
}

export async function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');
  return {
    'summary.json': JSON.stringify(data),
  };
}

export async function browserTest() {
  const page = browser.newPage();

  try {
    await page.goto('http://localhost:5001/');

    check(page, {
      'header is present': (p) => p.locator('h1').textContent() === 'Java Memory Information',
    });

    const fetchButton = page.locator('#fetchMemoryInfo');
    await fetchButton.click();

    await page.waitForTimeout(5000); // Wait for 5 seconds to allow data to load

    check(page, {
      'memory info is displayed': (p) => p.locator('#memoryInfo').textContent().includes('Total Memory'),
    });

    const simulateLeakButton = page.locator('#simulateMemoryLeak');
    await simulateLeakButton.click();

    await page.waitForTimeout(5000); // Wait for 5 seconds to allow leak simulation

    check(page, {
      'memory leak is simulated': (p) => p.locator('#memoryInfo').textContent().includes('Simulated Memory Leak Size'),
    });

  } finally {
    page.close();
  }
}
