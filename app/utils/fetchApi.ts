import { env } from 'process';
import { IProduct } from '../interfaces/global_interfaces';

// A function to delay the execution of a promise
async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchApi(
  limit = 50,
  delayDuration = 60000 / 1000 // 6 seconds delay duration
) {
  console.log('Fetching data from the API');
  const data: IProduct[] = [];
  let page = 1;

  while (true) {
    try {
      const response = await fetch(
        `${env.BASE_URL}/?page=${page}&limit=${limit}`
      );
      console.log('Fetching data from the API');

      if (!response.ok) {
        if (response.status === 429) {
          // Too Many Requests
          console.log('Rate limit hit, delaying next request');
          await delay(delayDuration);
          continue; // retry the same request
        } else if (response.status === 400) {
          // Bad Request && No more pages, exit the loop
          // console.error('Bad request:', response.statusText);
          break;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      data.push(...json);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
    await delay(delayDuration); // Delay between requests
    page++;
  }

  return data;
}
