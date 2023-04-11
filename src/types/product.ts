export interface IProduct {
  name: string;
  price: string;
  category: Categories;
  id: string;
  image?: string;
  description: string;

  [key: string]: string;
}

export enum Categories {
  CELL_PHONES = "Cell Phones",
  LAPTOPS = "Laptops",
  FURNITURES = "Furnitures",
  SNEAKERS = "Sneakers",
  WATCHES = "Watches",
  HOME_GARDEN = "Home & Garden",
  HEALTH_BEAUTY = "Health & Beauty",
  BABY = "Baby",
}

export interface IReview {
  text: string;
  id: string;
  productId: string;
  starsCount: number;
}
