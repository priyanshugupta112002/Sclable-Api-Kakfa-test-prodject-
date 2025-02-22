import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '3600s',
  cloud: {
    // Project: Sclable APi Test
    projectID: 3724070,
    // Test runs with the same name groups test runs together.
    name: 'Test (13/11/2024-20:25:26)'
  }
};

export default function() {
  http.post('http://localhost:3000/create-post', JSON.stringify({
    title: "Hello",
    content : "Test Algos"
  }),{
    headers:{
      'Content-Type':'application/json'
    }
  });
  sleep(1);
}