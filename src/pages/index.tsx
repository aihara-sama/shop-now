import { Box } from "@mui/material";
import BrowseCategories from "components/BrowseCategories";
import HeroProducts from "components/HeroProducts";
import { Layout } from "components/layouts/Layout";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { OrganizationJsonLd } from "next-seo";

const Index = () => {
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
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});

export default Index;
