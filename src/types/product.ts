export interface IProduct {
  name: string;
  price: string;
  category: Categories;
  [key: string]: string | number;
}

export enum Categories {
  CELL_PHONES = "Cell Phones",
}
