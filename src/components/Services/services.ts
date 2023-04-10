import DiscountIcon from "components/icons/Discount";
import SupportIcon from "components/icons/Support";
import TruckIcon from "components/icons/Truck";
import WalletIcon from "components/icons/Wallet";
import type { FunctionComponent } from "react";

interface IItem {
  title: string;
  body: string;
  Icon: FunctionComponent;
}

const services: IItem[] = [
  {
    title: "Free delivery",
    body: "Free shipping on all orders",
    Icon: TruckIcon,
  },
  {
    title: "Online support 24/7",
    body: "Support online 24 hours a day",
    Icon: SupportIcon,
  },
  {
    title: "Money return",
    body: "Back guarantee under 7 days",
    Icon: WalletIcon,
  },
  {
    title: "Member discount",
    body: "On every order over $120.00",
    Icon: DiscountIcon,
  },
];

export { services };
