# Bulk Nutrients Sample Request Data Challenge

## Overview

Bulk Nutrients, a provider of nutritional supplements, offers a free sample request program. This program allows both new and existing users to request product samples before making a purchase. However, the current request collection form lacks duplicate and error checking, leading to potential data inconsistencies.

### Assumptions

- Response data is sorted by date and time in ascending order.
- Response data are the same for each request.
- The form provide a list of products to select from in a dropdown. (consistent product names)

### The Challenge

The challenge involves interacting with a paginated API that imposes rate limits, cleaning and parsing the data, and finally visualizing it in a meaningful way.

#### API Details

- **Endpoint**: Bulk Nutrients API
- **Rate Limiting**: 10 requests per minute (exceeding this results in a 429 error)
- **Pagination**: Supports `page` (default 1 / max 13) and `limit` (default 50) query parameters

### Objectives

Using the provided API data, the task is to build a simple interface that allows users to determine:

1. The most popular product requested.
2. The number of samples sent by day of the week.
3. The number of samples sent to each state.
4. A flavour breakdown across all products.
5. A flavour breakdown for the 'Pre Workout 101' product.
6. An approximation of duplicate submissions.

### The Process

#### Part 1: Data Parsing and Cleaning

- Standardize relevant fields for consistency.
- Address any data entry irregularities from customers.

#### Part 2: Data Calculation

- Develop code to calculate the six required outputs.
- Document any assumptions made during the process.

#### Part 3: Data Visualization

- Design and implement a visualization interface.
- Ensure each data point is presented clearly and effectively.

## Overview

Using the following stack:

- Framework - [Next.js 14](https://nextjs.org/14)
- Language - [TypeScript](https://www.typescriptlang.org)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Tremor](https://www.tremor.so)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

This uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

Run the following commands to start the development server:

create a .env.local file and add the following:

```
BASE_URL = "API_URL/api/code-challenge"
```

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.
