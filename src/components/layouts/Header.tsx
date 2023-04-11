import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Container,
  Hidden,
  IconButton,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Search from "components/Search";
import LanguageToggle from "components/common/LanguageToggle";
import { Logo } from "components/common/Logo";
import MobileNavbarDrawer from "components/common/MobileNavbarDrawer";
import CartIcon from "components/icons/Cart";
import StoreIcon from "components/icons/Store";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { ApplicationState } from "store";

export const Header = () => {
  const { products } = useSelector<ApplicationState, ApplicationState["cart"]>(
    (state) => state.cart
  );
  const [isMobileNavbarDrawerOpen, setIsMobileNavbarDrawerOpen] =
    useState<boolean>(false);

  return (
    <Box
      component="header"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: "appBar",
        bgcolor: "background.default",
      }}
    >
      <Box>
        <Box
          display="flex"
          gap={1}
          py={1}
          bgcolor="secondary.light"
          justifyContent="center"
        >
          <StoreIcon />
          <Typography color="text.secondary">
            Up to 70% for the entire store!
          </Typography>
        </Box>
      </Box>
      <Container
        sx={{
          px: 2,
          display: "flex",
          alignItems: "center",
          height: 60,
        }}
      >
        <Logo />
        <Box ml={5} flexBasis="500px" mr="auto">
          <Search />
        </Box>
        <Box display="flex" alignItems="center" gap={2} mr={2} ml={2}>
          <MuiLink component={Link} href="/cart" underline="none">
            <Box display="flex" alignItems="center" gap={1}>
              <CartIcon />
              <Box display="flex" flexDirection="column">
                <Typography
                  lineHeight={1.1}
                  variant="caption"
                  color="text.secondary"
                >
                  Total
                </Typography>
                <Typography lineHeight={1.1} variant="body1">
                  ${products.reduce((acc, val) => acc + +val.price, 0)}
                </Typography>
              </Box>
            </Box>
          </MuiLink>
        </Box>
        <Box>
          <LanguageToggle />
          <Hidden smUp>
            <IconButton
              sx={{ px: 0 }}
              onClick={() => setIsMobileNavbarDrawerOpen((prev) => !prev)}
            >
              {!isMobileNavbarDrawerOpen ? (
                <MenuIcon fontSize="large" />
              ) : (
                <CloseIcon fontSize="large" />
              )}
            </IconButton>
          </Hidden>
        </Box>
        <MobileNavbarDrawer
          isDrawer={isMobileNavbarDrawerOpen}
          setIsDrawer={setIsMobileNavbarDrawerOpen}
        />
      </Container>
    </Box>
  );
};
