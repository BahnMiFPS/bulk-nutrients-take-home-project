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
    .map((field) => item[field].toString().toLowerCase().replace(/\s+/g, '')) // Remove whitespaces and ensure case-insensitive comparison
    .join('-');
};

export const findDuplicates = (
  data: ICleanedProduct[],
  keysToCheck: (keyof ICleanedProduct)[][]
): IDuplicate[][] => {
  const duplicatesTracker = new Map<string, IDuplicate[]>();

  data.forEach((item) => {
    keysToCheck.forEach((fields) => {
      const key = createKey(item, fields);

      // If the key doesn't exist in the map, initialize it with the current item
      if (!duplicatesTracker.has(key)) {
        duplicatesTracker.set(key, [{ ...item, Fields: fields }]); // Initialize the group
      } else {
        // If the key already exists, add the current item to the group
        const duplicates = duplicatesTracker.get(key);
        console.log('🚀 ~ keysToCheck.forEach ~ duplicates:', duplicates);
        if (duplicates) {
          duplicates.push({ ...item, Fields: fields }); // Add the current item to the group
        }
      }
    });
  });

  // Filter out any "groups" that don't actually have duplicates (length <= 1)
  const allDuplicates = Array.from(duplicatesTracker.values()).filter(
    (group) => group.length > 1
  );

  return allDuplicates;
};
