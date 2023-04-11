import { Box, Grid, Typography } from "@mui/material";
import BrowseCategories from "components/BrowseCategories";
import HeroProducts from "components/HeroProducts";
import Services from "components/Services";
import ProductCard from "components/common/ProductCard";
import { Layout } from "components/layouts/Layout";
import {
  equalTo,
  getDatabase,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref as refDB,
} from "firebase/database";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { OrganizationJsonLd } from "next-seo";
import { useEffect, useState } from "react";
import type { IProduct } from "types/product";
import { Categories } from "types/product";

const Index = () => {
  const [laptops, setLaptops] = useState<IProduct[]>([]);
  const [phones, setPhones] = useState<IProduct[]>([]);
  const [furnitures, setFurnitures] = useState<IProduct[]>([]);

  useEffect(() => {
    onValue(
      query(
        refDB(getDatabase(), "products"),
        orderByChild("category"),
        equalTo(Categories.LAPTOPS),
        limitToLast(4)
      ),
      (snapshot) => setLaptops(Object.values(snapshot.val() || {}))
    );
    onValue(
      query(
        refDB(getDatabase(), "products"),
        orderByChild("category"),
        equalTo(Categories.CELL_PHONES),
        limitToLast(4)
      ),
      (snapshot) => setPhones(Object.values(snapshot.val() || {}))
    );
    onValue(
      query(
        refDB(getDatabase(), "products"),
        orderByChild("category"),
        equalTo(Categories.FURNITURES),
        limitToLast(4)
      ),
      (snapshot) => setFurnitures(Object.values(snapshot.val() || {}))
    );
  }, []);

  return (
    <Layout>
      <OrganizationJsonLd
        type="Corporation"
        id="https://shop-now.com"
        logo="https://example.com/static/media/logo.png"
        legalName="Shop Now Private Limited"
        name="Shop Now"
        address={{
          streetAddress: "xxx",
          addressLocality: "xxx",
          addressRegion: "xxx",
          postalCode: "xxx",
          addressCountry: "<XX>",
        }}
        contactPoint={[
          {
            telephone: "<tel>",
            contactType: "query",
            email: "john@example.com",
            areaServed: "<XX>",
            availableLanguage: ["English"],
          },
        ]}
        sameAs={["https://shop-now.com"]}
        url="https://shop-now.com"
      />
      <Box height="100%" display="flex" gap={3} pt={3}>
        <BrowseCategories />
        <Box flex={1}>
          <HeroProducts />
        </Box>
      </Box>
      <Box my={8}>
        <Services />
      </Box>

      {!!phones.length && (
        <Box mb={5}>
          <Typography variant="h2" mb={2}>
            Phones
          </Typography>
          <Grid container spacing={3}>
            {phones.map((phone, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={phone} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {!!furnitures.length && (
        <Box mb={5}>
          <Typography variant="h2" mb={2}>
            Furnitures
          </Typography>
          <Grid container spacing={3}>
            {furnitures.map((furniture, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={furniture} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {!!laptops.length && (
        <Box mb={5}>
          <Typography variant="h2" mb={2}>
            Laptops
          </Typography>
          <Grid container spacing={3}>
            {laptops.map((laptop, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={laptop} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});

export default Index;
