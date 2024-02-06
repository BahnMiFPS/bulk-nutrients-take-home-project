import { IProduct } from '../interfaces/global_interfaces';

// A function to delay the execution of a promise
async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchApi(
  limit = 50,
  defaultDelayDuration = 6000 // Adjust based on your API's rate limit policy
): Promise<IProduct[]> {
  const data: IProduct[] = [];
  let page = 1;
  let isLastPage = false;

  while (!isLastPage) {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/?page=${page}&limit=${limit}`
      );
      console.log(`Current Page: ${page}`);
      const limitRemaining = parseInt(
        response.headers.get('X-RateLimit-Remaining') || '1',
        10
      );
      console.log('🚀 ~ limitRemaining:', limitRemaining);
      if (!response.ok) {
        if (response.status === 429) {
          console.log('Rate limit hit, delaying next request');
          await delay(defaultDelayDuration);
          continue; // retry the same request
        } else throw new Error(`HTTP error! status: ${response.status}`);
      }

      const pageData = await response.json();
      data.push(...pageData);
      page++;

      // Assuming the last page has been reached if the number of items is less than the limit
      if (pageData.length < limit) {
        isLastPage = true;
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      throw error;
    }
  }

  return data;
}
