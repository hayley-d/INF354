export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: {
    name: string;
  };
  productType: {
    name: string;
  };
}
