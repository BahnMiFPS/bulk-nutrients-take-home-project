export interface IProduct {
  Date: string;
  FirstName: string;
  LastName: string;
  Postcode: string;
  Sample: string;
  State: string;
}

export interface ICleanedProduct extends IProduct {
  Product: string;
  Flavour: string;
}

export interface IDuplicate extends ICleanedProduct {
  Fields: (keyof ICleanedProduct)[];
}
