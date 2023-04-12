import { Box, Link as MuiLink, Typography } from "@mui/material";
import AddToCartIcon from "components/icons/AddToCart";
import RemoveFromCartIcon from "components/icons/RemoveFromCart";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "slices/cart.slice";
import type { AppDispatch, ApplicationState } from "store";
import type { IProduct } from "types/product";

interface IProps {
  product: IProduct;
}

const ProductCard: FunctionComponent<IProps> = ({ product }) => {
  const { products } = useSelector<ApplicationState, ApplicationState["cart"]>(
    (state) => state.cart
  );
  const isProductInCart = !!products.find(({ id }) => id === product.id);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box>
      {/* header */}
      <MuiLink href={`/product/${product.id}`} component={Link}>
        <Box
          width="100%"
          p={5}
          position="relative"
          height={250}
          bgcolor="secondary.light"
        >
          <Box
            sx={{
              backgroundImage: `url(${
                product.image || process.env.DEFAULT_PRODUCT_IMAGE_URL
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </MuiLink>

      {/* header */}

      <Box
        py={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        bgcolor="rgb(177 177 177 / 12%)"
      >
        <Box display="flex" flexDirection="column">
          <Typography lineHeight={1.4} variant="button">
            ${product.price}
          </Typography>
          <MuiLink
            underline="none"
            href={`/product/${product.id}`}
            component={Link}
          >
            <Typography
              fontWeight={500}
              lineHeight={1.4}
              color="text.secondary"
            >
              {product.name}
            </Typography>
          </MuiLink>
        </Box>
        <Box
          sx={{ cursor: "pointer", display: "flex" }}
          onClick={() => {
            dispatch(
              isProductInCart ? removeFromCart(product.id) : addToCart(product)
            );
          }}
        >
          {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
