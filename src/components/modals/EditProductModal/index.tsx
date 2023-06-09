import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import UploadButton from "components/common/buttons/UploadButton";
import { getDatabase, ref as refDB, update } from "firebase/database";
import { useFormik } from "formik";
import filterObject from "lodash.pickby";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { IProduct } from "types/product";
import { Categories } from "types/product";
import { capitalize } from "utils/capitalize";
import getErrorProps from "utils/getErrorProps";
import { snakeCase } from "utils/snakeCase";
import * as Yup from "yup";
import type { RequiredStringSchema } from "yup/lib/string";
import type { AnyObject } from "yup/lib/types";

interface IProps {
  open: boolean;
  handleClose: () => void;
  product: IProduct;
}

const EditProductModal: FunctionComponent<IProps> = ({
  open,
  handleClose,
  product,
}) => {
  // e.g. weight, color, etc.

  const extraProperties = filterObject(
    product,
    (_, key) =>
      !["id", "image", "category", "price", "name", "description"].includes(key)
  );

  const [productExtraProperties, setProductExtraProperties] = useState<
    string[]
  >(Object.keys(extraProperties));

  const [validationSchema, setValidationSchema] = useState(
    Yup.object().shape({
      name: Yup.string().required("Please enter a name"),
      category: Yup.string().required("Please select a category"),
      price: Yup.string().required("Please enter a price"),
      image: Yup.string().optional(),
    })
  );

  const formik = useFormik<IProduct>({
    initialValues: { ...product },
    validationSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const db = getDatabase();
      try {
        await update(refDB(db, `products/${values.id}`), values);
        toast.success("Product updated successfully");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        actions.setSubmitting(false);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        onClose();
      }
    },
    validateOnMount: false,
  });

  useEffect(() => {
    formik.validateForm();
  }, [validationSchema]);
  useEffect(() => {
    const additionalValidationSchemaShape: Record<
      string,
      RequiredStringSchema<string, AnyObject>
    > = {};
    Object.keys(extraProperties).forEach((prop) => {
      additionalValidationSchemaShape[prop] = Yup.string().required(
        "This field can't be empty"
      );
    });
    setValidationSchema((prev) =>
      prev.concat(Yup.object().shape(additionalValidationSchemaShape))
    );
  }, []);

  const onClose = () => {
    setProductExtraProperties([]);
    setValidationSchema(
      Yup.object().shape({
        name: Yup.string().required("Please enter a name"),
        category: Yup.string().required("Please select a category"),
        price: Yup.string().required("Please enter a price"),
        image: Yup.string().optional(),
      })
    );
    formik.resetForm();
    handleClose();
  };

  const addProductProperty = () => {
    const productProperty = window.prompt("Please enter a product property");
    if (productProperty) {
      const productPropertyCapitalized = capitalize(productProperty);

      if (productExtraProperties.includes(productPropertyCapitalized)) {
        toast.error("This property already exists");
      } else {
        setProductExtraProperties((prev) => [
          ...prev,
          productPropertyCapitalized,
        ]);

        setValidationSchema((prev) =>
          prev.concat(
            Yup.object().shape({
              [snakeCase(productProperty)]: Yup.string().required(
                "This field can't be empty"
              ),
            })
          )
        );
        formik.setFieldValue(snakeCase(productProperty), "");
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            color="text.secondary"
            id="modal-modal-title"
            variant="h3"
            ml="auto"
          >
            Update Product
          </Typography>
          <CloseIcon
            sx={{
              ml: "auto",
              cursor: "pointer",
              borderRadius: 1,
              ":hover": { bgcolor: "secondary.light" },
              transition: "0.1s",
            }}
            onClick={() => onClose()}
          />
        </Box>
        <Box mt={4}>
          <TextField
            fullWidth
            size="small"
            {...formik.getFieldProps("name")}
            {...getErrorProps(formik, "name")}
            label="Product name"
          />

          <FormControl sx={{ my: 2 }} fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              size="small"
              data-testid="select-category"
              name="category"
              value={formik.values.category}
              label="Category"
              onChange={(e) => {
                formik.setFieldValue("category", e.target.value);
              }}
            >
              {Object.values(Categories).map((val, idx) => (
                <MenuItem
                  data-testid={`menu-item-${val}`}
                  value={val}
                  key={idx}
                >
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size="small"
            {...formik.getFieldProps("price")}
            {...getErrorProps(formik, "price")}
            onChange={(e) => {
              const input = e.target.value;
              const regex = /^[0-9]+(\.[0-9]{0,2})?$/;
              if (!regex.test(input) || parseFloat(input) < 1) {
                e.target.value = input.substring(0, input.length - 1);
              }
              formik.setFieldValue("price", e.target.value);
            }}
            label="Product price"
          />

          {!!productExtraProperties.length && (
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              {productExtraProperties.map((property, idx) => (
                <TextField
                  key={idx}
                  fullWidth
                  size="small"
                  {...formik.getFieldProps(snakeCase(property))}
                  {...getErrorProps(formik, snakeCase(property))}
                  label={`Product ${property}`}
                />
              ))}
            </Box>
          )}

          <Box my={1} display="flex" justifyContent="right" gap={1}>
            <Typography
              onClick={() => addProductProperty()}
              sx={{ cursor: "pointer", fontWeight: 500 }}
              color="info.main"
            >
              Add property
            </Typography>
          </Box>

          <Box>
            <UploadButton
              defaultImageUrl={product.image}
              handleIsUploading={(isUploading) => {
                if (isUploading) {
                  formik.setFieldError("image", "Wait for uploading...");
                } else {
                  formik.setErrors(
                    filterObject(formik.errors, (_, key) => key !== "image")
                  );
                }
              }}
              onUpload={(url) => formik.setFieldValue("image", url)}
            />
            <Button
              fullWidth
              onClick={() => formik.submitForm()}
              sx={{ cursor: "pointer" }}
              disabled={
                !!Object.values(formik.errors).length || formik.isSubmitting
              }
            >
              {formik.isSubmitting && (
                <CircularProgress color="inherit" size="24.5px" />
              )}
              {!formik.isSubmitting && "Update product"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
