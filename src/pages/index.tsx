import { Box } from "@mui/material";
import { Layout } from "components/layouts/Layout";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { OrganizationJsonLd } from "next-seo";

const Index = () => {
  const A = 2;
  return (
    <Layout>
      <OrganizationJsonLd
        type="Corporation"
        id="https://example.com"
        logo="https://example.com/static/media/logo.png"
        legalName="Example Private Limited"
        name="example"
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
        sameAs={["https://example.com"]}
        url="https://example.com"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      ></Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});

export default Index;
