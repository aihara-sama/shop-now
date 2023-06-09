import type { FunctionComponent } from "react";

interface IProps {
  size?: "small" | "large";
}

const AddIcon: FunctionComponent<IProps> = ({ size = "small" }) => {
  const sizePx = size === "small" ? 20 : 82;
  const d =
    size === "small"
      ? "M10.0003 0.666626C10.6447 0.666626 11.167 1.18897 11.167 1.83329V8.83329H18.167C18.8113 8.83329 19.3337 9.35561 19.3337 9.99996C19.3337 10.6443 18.8113 11.1666 18.167 11.1666H11.167V18.1666C11.167 18.811 10.6447 19.3333 10.0003 19.3333C9.35598 19.3333 8.83366 18.811 8.83366 18.1666V11.1666H1.83366C1.18933 11.1666 0.666992 10.6443 0.666992 9.99996C0.666992 9.35561 1.18933 8.83329 1.83366 8.83329H8.83366V1.83329C8.83366 1.18897 9.35598 0.666626 10.0003 0.666626Z"
      : "M41 0C43.8305 0 46.125 2.29456 46.125 5.125V35.875H76.875C79.7055 35.875 82 38.1695 82 41C82 43.8305 79.7055 46.125 76.875 46.125H46.125V76.875C46.125 79.7055 43.8305 82 41 82C38.1695 82 35.875 79.7055 35.875 76.875V46.125H5.125C2.29456 46.125 0 43.8305 0 41C0 38.1695 2.29456 35.875 5.125 35.875H35.875V5.125C35.875 2.29456 38.1695 0 41 0Z";

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox={`0 0 ${sizePx} ${sizePx}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={d} fill="white" />
    </svg>
  );
};

export default AddIcon;
