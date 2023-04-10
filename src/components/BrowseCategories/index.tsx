import { ArrowRight } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import { Categories } from "types/product";
import { snakeCase } from "utils/snakeCase";

const BrowseCategories = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        px={2}
        py={1}
        bgcolor="error.main"
        gap={1}
      >
        <MenuIcon sx={{ color: "primary.contrastText" }} fontSize="large" />
        <Typography color="secondary.contrastText">
          Browse categories
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        bgcolor="secondary.light"
        p={2}
      >
        {Object.values(Categories).map((cat, idx) => {
          return (
            <MuiLink
              color="text.secondary"
              underline="none"
              component={Link}
              key={idx}
              href={`/products?cat=${snakeCase(cat)}`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {cat}
              <ArrowRight />
            </MuiLink>
          );
        })}
      </Box>
    </Box>
  );
};

export default BrowseCategories;
