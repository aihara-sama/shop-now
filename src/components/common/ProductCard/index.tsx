import { Box, Typography } from "@mui/material";
import AddToCartIcon from "components/icons/AddToCart";
import StarIcon from "components/icons/Star";
import type { FunctionComponent } from "react";
import type { IProduct } from "types/product";

interface IProps {
  product: IProduct;
}

const ProductCard: FunctionComponent<IProps> = ({ product }) => {
  return (
    <Box>
      {/* header */}
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
        <Box
          bottom="8px"
          left="8px"
          position="absolute"
          alignItems="center"
          display="flex"
          gap={0.5}
          bgcolor="primary.main"
          borderRadius={5}
          py={0.7}
          px={1.3}
        >
          <StarIcon />{" "}
          <Typography
            lineHeight={1}
            mb="-1px"
            fontSize="13px"
            color="primary.contrastText"
          >
            4.5
          </Typography>
        </Box>
      </Box>
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
          <Typography fontWeight={500} lineHeight={1.4} color="text.secondary">
            {product.name}
          </Typography>
        </Box>
        <AddToCartIcon />
      </Box>
    </Box>
  );
};

export default ProductCard;
