import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "components/icons/Add";
import { Layout } from "components/layouts/Layout";
import type { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAmount,
  decreaseProductAmount,
  removeFromCart,
} from "slices/cart.slice";
import type { ApplicationState } from "store";
import type { IProduct } from "types/product";

const PoductRow: FunctionComponent<{ product: IProduct; idx: number }> = ({
  product,
  idx,
}) => {
  const dispatch = useDispatch();
  const { products } = useSelector<ApplicationState, ApplicationState["cart"]>(
    (state) => state.cart
  );
  return (
    <TableRow
      key={idx}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Box key={idx} display="flex" gap={1}>
          <img
            src={product.image || process.env.DEFAULT_PRODUCT_IMAGE_URL}
            width={26}
            alt={product.name}
          />
          <Typography>{product.name}</Typography>
        </Box>
      </TableCell>
      <TableCell>${product.price}</TableCell>

      <TableCell>
        <Box display="flex" alignItems="center">
          <Button
            onClick={() =>
              product.amount !== 1 &&
              dispatch(decreaseProductAmount(product.id))
            }
            size="small"
            sx={{ minWidth: "30px" }}
            variant="contained"
          >
            <AddIcon />
          </Button>
          <Typography mx={1}>{product.amount}</Typography>
          <Button
            onClick={() => dispatch(addProductAmount(product.id))}
            size="small"
            sx={{ minWidth: "30px" }}
            variant="contained"
          >
            <AddIcon />
          </Button>
        </Box>
      </TableCell>
      <TableCell>
        $
        {products
          .filter((p) => p.id === product.id)
          .reduce((acc, val) => acc + +val.price, 0)}
      </TableCell>
      <TableCell>
        <CloseIcon
          sx={{
            ml: "auto",
            cursor: "pointer",
            borderRadius: 1,
            ":hover": { bgcolor: "secondary.light" },
            transition: "0.1s",
          }}
          onClick={() => dispatch(removeFromCart(product.id))}
        />
      </TableCell>
    </TableRow>
  );
};

const Cart = () => {
  const { products } = useSelector<ApplicationState, ApplicationState["cart"]>(
    (state) => state.cart
  );

  return (
    <Layout>
      <Box
        my={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3" color="text.secondary">
          Your cart
        </Typography>
        <Button disabled={!products.length}>Purchase</Button>
      </Box>
      <Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Product name</TableCell>
              <TableCell>Product price</TableCell>
              <TableCell>Product amount</TableCell>
              <TableCell>Total price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, idx) => (
              <PoductRow key={idx} idx={idx} product={product} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Layout>
  );
};

export default Cart;
