import { ICleanedProduct, IDuplicate } from '../interfaces/global_interfaces';

// Helper function to create a unique key based on specified fields of an item
const createKey = (
  item: ICleanedProduct,
  fields: (keyof ICleanedProduct)[]
): string => {
  if (!fields.length) {
    throw new Error('No fields specified');
  }
  return fields
    .map((field) => item[field].toString().toLowerCase()) // Ensure case-insensitive comparison
    .join('-');
};

// Function to find duplicated entries based on multiple fields
export const findDuplicates = (
  data: ICleanedProduct[],
  keysToCheck: (keyof ICleanedProduct)[][]
): IDuplicate[][] => {
  const duplicatesMap = new Map<
    string,
    { item: ICleanedProduct; fields: (keyof ICleanedProduct)[] }[]
  >();
  const allDuplicates: IDuplicate[][] = [];

  data.forEach((item) => {
    keysToCheck.forEach((fields) => {
      // ['Name', 'State', 'Flavour']

      const key = createKey(item, fields); // 'name-state-flavour'

      let entry = duplicatesMap.get(key);
      if (!entry) {
        entry = [];
        duplicatesMap.set(key, entry);
      }

      entry.push({ item, fields });
      // Directly check for duplicates after insertion
      if (entry.length === 2) {
        // The first time we detect duplicates for this key
        const transformedItems: IDuplicate[] = entry.map(
          ({ item, fields }) => ({
            ...item,
            Fields: fields
          })
        );
        allDuplicates.push(transformedItems);
      } else if (entry.length > 2) {
        // Already detected as duplicates, just add the new one
        allDuplicates[allDuplicates.length - 1].push({
          ...item,
          Fields: fields
        });
      }
    });
  });

  return allDuplicates;
};
