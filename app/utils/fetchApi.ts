import { env } from 'process';
import { IProduct } from '../interfaces/global_interfaces';

// A function to delay the execution of a promise
async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchApi(
  // ASSUMPTION: 13 pages of data, each page containing 50 items
  totalPage = 13,
  limit = 50,
  delayDuration = 60000 / 1000 // Delay duration in milliseconds
) {
  const data: IProduct[] = [];

  for (let i = 1; i <= totalPage; i++) {
    try {
      const response = await fetch(`${env.BASE_URL}/?page=${i}&limit=${limit}`);
      if (!response.ok) {
        if (response.status === 429) {
          // Too Many Requests
          console.log('Rate limit hit, delaying next request');
          await delay(delayDuration);
          i--; // retry the same request
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      data.push(...json);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
    await delay(delayDuration); // Delay between requests
  }

  return data;
}
