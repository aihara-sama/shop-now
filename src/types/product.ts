export interface IProduct {
  name: string;
  price: string;
  category: Categories;
  id: string;
  image?: string;
  [key: string]: string | number;
}

export enum Categories {
  CELL_PHONES = "Cell Phones",
}
