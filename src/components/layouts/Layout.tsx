import { Box, Container } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

import { Header } from "./Header";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box component="main" height="100%">
      <Header />
      <Container sx={{ pb: 5 }} component="section">
        {children}
      </Container>
    </Box>
  );
};
