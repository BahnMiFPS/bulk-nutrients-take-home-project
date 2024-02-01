import { IFlavourBreakdown } from '../components/Charts/FlavourBreakdown';
import { ICleanedProduct } from '../interfaces/global_interfaces';
interface IFlavourDataAccumulator {
  [key: string]: {
    name: string;
    count: number;
    samples: Record<string, number>;
  };
}

export const getAllProducts = (
  data: ICleanedProduct[]
): { label: string; value: string }[] => {
  const products = data.reduce<Record<string, number>>((acc, curr) => {
    const product = curr.Product;
    if (!acc[product]) {
      acc[product] = 0;
    }
    acc[product] += 1;
    return acc;
  }, {});
  return Object.keys(products).map((product) => ({
    label: product,
    value: product
  }));
};

export const turnDataIntoFlavourData = (
  data: ICleanedProduct[],
  targetProduct: string | undefined
): IFlavourBreakdown[] => {
  const flavourData = data.reduce<IFlavourDataAccumulator>((acc, curr) => {
    const flavour = curr.Flavour;
    const product = curr.Product;

    // If a target product is specified and the current product does not match, skip it
    if (targetProduct && product !== targetProduct) return acc;

    // Initialize the flavour if it doesn't exist
    if (!acc[flavour]) {
      acc[flavour] = {
        name: flavour,
        count: 0,
        samples: {}
      };
    }

    // Increment flavour count
    acc[flavour].count += 1;

    // Aggregate products under the flavour
    if (!acc[flavour].samples[product]) {
      acc[flavour].samples[product] = 1;
    } else {
      acc[flavour].samples[product] += 1;
    }

    return acc;
  }, {});

  // Format data to the desired structure
  const formattedData = Object.keys(flavourData).map((flavour) => ({
    name: flavour,
    count: flavourData[flavour].count,
    samples: Object.keys(flavourData[flavour].samples).map((productName) => ({
      name: productName,
      count: flavourData[flavour].samples[productName]
    }))
  }));

  return formattedData.sort((a, b) => b.count - a.count);
};
