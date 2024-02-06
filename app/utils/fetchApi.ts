import { IProduct } from '../interfaces/global_interfaces';

const BASE_URL = process.env.BASE_URL;

// A function to delay the execution of a promise
async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchApi(
  limit = 50,
  defaultDelayDuration = 6000 // Adjust based on your API's rate limit policy
): Promise<IProduct[]> {
  console.trace('Trace at fetchApi');
  const data: IProduct[] = [];
  let page = 1;
  let isLastPage = false;

  while (!isLastPage) {
    try {
      const response = await fetch(`${BASE_URL}/?page=${page}&limit=${limit}`);
      console.log(`Current Page: ${page}`);
      const limitRemaining = parseInt(
        response.headers.get('X-RateLimit-Remaining') || '1',
        10
      );
      if (limitRemaining <= 1) {
        console.log('Approaching rate limit, increasing delay...');
        await delay(defaultDelayDuration * 10); // Increase delay significantly to allow for reset
      }
      console.log('🚀 ~ limitRemaining:', limitRemaining);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const pageData = await response.json();
      if (pageData.length < limit) {
        isLastPage = true;
      }

      data.push(...pageData);
      page++;
      // await delay(defaultDelayDuration); // Delay between successful requests
      // Adjust delay based on rate limit remaining
    } catch (error) {
      console.error('Failed to fetch:', error);
      throw error; // Re-throw the error so it can be handled by the caller
    }
  }

  return data;
}

export { fetchApi };
