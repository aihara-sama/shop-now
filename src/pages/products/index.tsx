import { Box, Grid, Hidden, Typography } from "@mui/material";
import BrowseCategories from "components/BrowseCategories";
import ProductCard from "components/common/ProductCard";
import { Layout } from "components/layouts/Layout";
import {
  equalTo,
  get,
  getDatabase,
  limitToFirst,
  orderByChild,
  query,
  ref as refDB,
} from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { IProduct } from "types/product";
import { capitalize } from "utils/capitalize";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isReady)
      if (router.query.search) {
        get(
          query(
            refDB(getDatabase(), "products"),
            orderByChild("name"),
            equalTo(
              capitalize(decodeURIComponent(router.query.search as string))
            ),
            limitToFirst(4)
          )
        )
          .then((snapshot) => {
            setProducts(Object.values(snapshot.val() || {}));
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else if (router.query.category) {
        get(
          query(
            refDB(getDatabase(), "products"),
            orderByChild("category"),
            equalTo(
              capitalize(decodeURIComponent(router.query.category as string))
            ),
            limitToFirst(4)
          )
        )
          .then((snapshot) => setProducts(Object.values(snapshot.val() || {})))
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        router.push("/");
      }
  }, [router.query, router.isReady]);

  return (
    <Layout>
      <Box mt={3} display="flex" gap={3} pr={2}>
        <Hidden mdDown>
          <Box>
            <BrowseCategories />
          </Box>
        </Hidden>
        <Box sx={{ flex: 1 }}>
          {!isLoading && !products.length && (
            <Typography variant="h3" color="text.secondary">
              No results
            </Typography>
          )}
          <Grid container spacing={3}>
            {products.map((product, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Products;
