The Challenge

Bulk Nutrients runs a free sample request program which allows new and existing users to request a product sample before purchasing. The form that collects these requests doesn't have any duplicate or error checking.

To make it a little more interesting, the data is at an API endpoint (https://bulk-nutrients-admin-git-feature-code-challenge-bulk-nutrients.vercel.app/api/code-challenge) that applies rate limiting (because we deal with this a bit at work). You will be limited to 10 requests per minute, else will get hit with a 429 error. The data is also paginated, so you can pass query params of page (default is 1) and limit (default is 50). Using this data, you’ll be working through three parts to build a simple interface that visualises the data and allows a user to find out:

Part 1

Parse and clean the data. This should result in all relevant fields being standardised to be able to build on in subsequent parts. i.e. customers don't always fill things in perfectly, so you might need to clean up some of their data entry.

Answer:
I used NextJS App Router extended fetch feature to fetch all the data from the API pages on build time. (https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch)

I marked my page.tsx as async component. These are React server components so they securely run on the server by default. Now our component is asynchronous so they can await some promise inside of their body. This is static data fetching by default. It means that on production build, this data will actually be cached static for the entirety of our application.
This is great for our specific application due to rate limitting.

To understand that, i will talk a little bit about NextJS powerful caching system (https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data)

By default, Next.js automatically caches the returned values of fetch in the Data Cache(https://nextjs.org/docs/app/building-your-application/caching#data-cache) on the server. This means that the data can be fetched at build time or request time, cached, and reused on each data request (page reloads).

So if I hit f5 here, we would still send a fetch request to the server, the server will check the Data Cache, and if the data is there, it will return it from the cache. This data cache is persistent throughout

I proceed to clean the data by standardising the state and product fields for consistency and passed it down to all the components.

While looking at the data I realized the state field was not consistent and I had to standardize it to be able to build on in subsequent parts.

cleanState.ts
In the cleanState.ts, I created a function that takes in a state and returns a standardized state.
I used a dictionary to store the standard state and the possible variants from the users inputs. I will then trim the state, convert it to lowercase and remove any commas and dots. I will then loop through the dictionary and check if the state is in the dictionary. If it is, I will return the key which is the standardized state. If it is not, I will return the state as it is. (I will log the state that was not found)

This is helpful for the next part where I will be calculating the number of samples sent to each state.

Aside from that I will also need to clean out the data by creating extra fields: Flavour and Product. Which i will explain later on.

# Part 2

Having the cleaned data passed down to each charts. I will need to figure out what kind of charts are the best to display the data based on the requirements.

## The most popular product requested

ANS: I decided to use the donut chart to display the top 15-10-5 most popular products requested. This will give a clear visual representation of the most popular products requested.
Technical:

1.  Initialization of productCount object: The function initializes an empty object called productCount, which will be used to store the count of each product in the input data.

2.  Aggregation of data: The function iterates over each item in the data array using forEach. For each item, it increments the count of the corresponding product in the productCount object. If the product does not yet exist in productCount, it initializes its count to 1; otherwise, it increments the existing count.

3.  Transformation to TProductCount[]:
    Object.entries(productCount) converts the productCount object into an array of [name, count] tuples, where name is the product name and count is the number of times it appears in the input data.
    .map(([name, count]) => ({ name, count })) transforms each tuple into an object with name and count properties, creating an array of these objects. This step formats the data in a way that's typically useful for visualization (e.g., in a donut chart).
    .sort((a, b) => b.count - a.count) sorts the resulting array in descending order based on the count property, ensuring that the items with the highest counts come first.

4.  Applying filterValue:
    result.slice(0, Number(filterValue) || 5) trims the sorted array to include only the top items, as specified by filterValue. If filterValue is not a valid number or is not provided, it defaults to including the top 5 items.
    This sliced array is what the function ultimately returns.

## The number of samples sent by day of week:

Displaying the number of samples sent by day of the week is a good use case for a bar chart. A bar chart is a common choice for visualizing the frequency of categorical data like this one. The x-axis can represent the days of the week, and the y-axis can represent the number of samples sent on each day.

Data Transformation Process:

1.  Raw Data Input: The component takes an array of cleanedData objects as input. Each object in this array represents a product sample, including a Date property indicating when the sample was sent.

2.  Initialization of Chart Data Structure: A record object named chartData is initialized outside the turnDataIntoChartData function with days of the week as keys and sample counts as values. This structure is used to aggregate the number of samples sent on each day of the week.

3.  Aggregating Samples by Day: The turnDataIntoChartData function iterates over the input data, converting each product's date to a day of the week using the getWeekday function. It then increments the count for the corresponding day in the chartData object. This step aggregates the total number of samples sent on each day of the week.

4.  Formatting for Visualization: The aggregated data is then transformed into an array of ChartData objects, where each object represents a day of the week and the corresponding number of samples sent. This array format is suitable for use with the BarChart component from @tremor/react.

## The number of samples sent to each state:

With the cleaned data containing the cleaned state field, it is quite easy to process the data for this specific request. Preferrably i should have created a country map where i can display the number of samples sent to each state in the country. But due to time constraints, I will use a bar horizontal chart to display the number of samples sent to each state.

Technical:

1.  Input Data: The component receives an array of cleanedData. Each object represents a product sample that includes a State property, indicating the state associated with the sample.

2.  Aggregation of State Counts: The turnDataIntoChartData function is where the transformation begins. It uses the reduce method to iterate over the data arr, accumulating a count of occurrences for each state. The accumulator (acc) is a record object where keys are state names and values are the counts of samples associated with those states.

3.  Conversion to Array of Objects: After aggregating the counts, the function converts the record object into an array of IStateSampleData objects. Each object in this array has a name property (the state name) and a value property (the count of samples for that state). This step involves using Object.entries to get an array of key-value pairs from the record object, then map to transform each pair into the desired object format.

4.  Sorting by Sample Count: The array is then sorted in descending order based on the value property, ensuring that states with more samples appear first in the visualization. This sorting makes it easier to identify states with higher sample distributions.

## A flavour breakdown across all products

The flavour breakdown across all products is a good use case for a pie chart. A pie chart is a common choice for visualizing the distribution of categorical data like this one. The chart can represent the distribution of flavours across all products, with each slice of the pie representing a different flavour and its proportion of the total samples.

However, because we have a lot of different flavour and product combinations, it might be difficult to display all of them in a single pie chart. Instead, we can use the chart to display the top 5 most popular flavours, then have a table next to the chart to display the rest of the flavours. This way, we can provide a clear visual representation of the most popular flavours while still allowing users to see the full flavour breakdown. I also added a filter option that allows you to breakdown the flavour across any specific product, which aligns greatly with the next requirement, where you need A flavour breakdown across the Pre Workout 101 product

Technical:

1. Process:
   Conditional Filtering: If a targetProduct is specified, the function filters out data points that do not match the target product.
2. Data Aggregation: For each item in the dataset, it aggregates flavor data. Each flavor entry in the accumulator (IFlavourDataAccumulator) includes:
   The flavor's name.
   A total count of occurrences of this flavor across all products (or the filtered product).
   A breakdown of product counts for each flavor.

3. Initialization and Incrementation: For each data item, if its flavor hasn't been encountered before, the function initializes an entry for it. Then, it increments the count for the flavor and also tracks which products have been associated with this flavor, including their counts.
   This function uses a more complex hashmap. Each key in this hashmap is the name of a flavor, and the value is an object containing the flavor's name, its total count, and another hashmap (samples) of product names to their counts. This nested structure enables the function to aggregate data at two levels: overall flavor counts and the distribution of those flavors across different products.

4. Transformation and Sorting: The accumulated data is transformed into an array of objects matching the IFlavourBreakdown interface. Each object includes the flavor name, its total count, and an array of samples detailing the counts of each product associated with that flavor. Finally, this array is sorted by the count of flavors in descending order to prioritize flavors with higher occurrences.

## An approximation of the duplicates submitted

Purpose: Finds and groups duplicate entries in the input data based on the combinations of fields specified in keysToCheck.
Process:

1. Initialization:

- A Map object (duplicatesMap) is used to track items and their associated fields. The keys of this map are the unique keys generated by createKey, and the values are arrays of objects containing the item and the fields used to generate the key.
- A Map object ()

2. Duplication Check:
   For each item in the input data, the function iterates over the array of field combinations (keysToCheck). For each combination:
   A unique key is generated for the item using createKey.
   The function checks if this key already exists in duplicatesMap.
   If not, an entry is created with the item and fields.
   If yes, the item is added to the existing entry, indicating a duplicate.
   When the second item for a unique key is added (indicating the first occurrence of duplication), the items are transformed into the IDuplicate format and added to allDuplicates. This includes the item data and the fields causing duplication.
   For any further duplicates of the same key, the new item is added to the last group of duplicates in allDuplicates.
