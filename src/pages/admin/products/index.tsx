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
import AdminLayout from "components/layouts/AdminLayout";
import EditProductModal from "components/modals/EditProductModal";
import {
  getDatabase,
  limitToLast,
  onValue,
  query,
  ref as refDB,
  remove,
} from "firebase/database";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import type { IProduct } from "types/product";

const PoductRow: FunctionComponent<{ product: IProduct; idx: number }> = ({
  product,
  idx,
}) => {
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  return (
    <TableRow
      key={idx}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {idx + 1}
      </TableCell>
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
      <TableCell>{product.category}</TableCell>
      <TableCell>
        <Button
          onClick={() => setIsEditProductModalOpen(true)}
          sx={{ cursor: "pointer" }}
          size="small"
        >
          Edit
        </Button>
        {isEditProductModalOpen && (
          <EditProductModal
            product={product}
            handleClose={() => setIsEditProductModalOpen(false)}
            open={isEditProductModalOpen}
          />
        )}
      </TableCell>
      <TableCell>
        <Button
          sx={{ cursor: "pointer" }}
          size="small"
          onClick={() => remove(refDB(getDatabase(), `products/${product.id}`))}
          color="error"
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    onValue(
      query(refDB(getDatabase(), "products"), limitToLast(10)),
      (snapshot) => setProducts(Object.values(snapshot.val() || {}))
    );
  }, []);

  return (
    <AdminLayout>
      <Typography variant="h3">Products</Typography>

      <Box
        sx={{
          overflow: "auto",
          height: "calc(100% - 185px)",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product name</TableCell>
              <TableCell>Product price</TableCell>
              <TableCell>Product category</TableCell>
              <TableCell>Actions 1</TableCell>
              <TableCell>Actions 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, idx) => (
              <PoductRow key={idx} idx={idx} product={product} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </AdminLayout>
  );
};

export default Products;
