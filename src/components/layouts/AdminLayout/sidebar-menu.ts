import DashboardIcon from "components/icons/Dashboard";
import HeroProductsIcon from "components/icons/HeroProducts";
import OrdersIcon from "components/icons/Orders";
import ProductsIcon from "components/icons/Products";
import type { FunctionComponent } from "react";

interface IMenuItem {
  href: string;
  title: string;
  Icon: FunctionComponent;
}

const menuList: IMenuItem[] = [
  {
    href: "/admin",
    title: "Dashboard",
    Icon: DashboardIcon,
  },
  {
    href: "/admin/orders",
    title: "Orders",
    Icon: OrdersIcon,
  },
  {
    href: "/admin/products",
    title: "Products",
    Icon: ProductsIcon,
  },
  {
    href: "/admin/hero-products",
    title: "Hero Products",
    Icon: HeroProductsIcon,
  },
];

export { menuList };
