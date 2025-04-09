export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "product-1",
    name: "Product 1",
    price: 20,
    image: "https://placehold.co/600x400?text=nekosense",
    description:
      "This is a detailed description for Product 1. It features high-quality materials and a sleek design that will complement any style.",
  },
  {
    id: "product-2",
    name: "Product 2",
    price: 30,
    image: "https://placehold.co/600x400?text=nekosense",
    description:
      "Product 2 is our bestseller. It comes with premium features and is built to last. Perfect for everyday use.",
  },
  {
    id: "product-3",
    name: "Product 3",
    price: 40,
    image: "https://placehold.co/600x400?text=nekosense",
    description:
      "Product 3 is the latest addition to our collection. It combines innovative technology with elegant design for an exceptional experience.",
  },
];
