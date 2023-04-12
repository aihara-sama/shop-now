import {
  Box,
  Container,
  Hidden,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Search from "components/Search";
import LanguageToggle from "components/common/LanguageToggle";
import { Logo } from "components/common/Logo";
import CartIcon from "components/icons/Cart";
import StoreIcon from "components/icons/Store";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { ApplicationState } from "store";

export const Header = () => {
  const { products } = useSelector<ApplicationState, ApplicationState["cart"]>(
    (state) => state.cart
  );

  return (
    <Box
      component="header"
      sx={{
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: 60,
            pr: 2,
          }}
        >
          <Box mr="auto">
            <Logo />
          </Box>
          <Hidden smDown>
            <Box ml={5} flexBasis="500px" mr="auto">
              <Search />
            </Box>
          </Hidden>
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
                    $
                    {products.reduce(
                      (acc, val) => acc + +val.price * val.amount,
                      0
                    )}
                  </Typography>
                </Box>
              </Box>
            </MuiLink>
          </Box>

          <LanguageToggle />
        </Box>
        <Hidden smUp>
          <Box pr={2}>
            <Search />
          </Box>
        </Hidden>
      </Container>
    </Box>
  );
};
