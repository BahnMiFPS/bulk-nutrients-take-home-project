export function cleanFlavour(sample: string, type: string) {
  // Assuming the format is always "Product - Flavour"
  const parts = sample.split(' - ');

  if (parts.length !== 2) {
    // Handle unexpected format
    console.error('Unexpected Sample format:', sample);
    return sample; // or return an empty string, or handle this case as needed
  }

  const [product, flavour] = parts;

  if (type === 'product') {
    return product.trim();
  } else if (type === 'flavour') {
    return flavour.trim();
  } else {
    // Handle unexpected type
    console.error('Unexpected type:', type);
    return ''; // or handle this case as needed
  }
}
