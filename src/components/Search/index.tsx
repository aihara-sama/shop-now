import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { Search as MuiSearch } from "@mui/icons-material";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    setSearchInput((router.query.search as string) || "");
  }, [router.query.category]);

  return (
    <Box display="flex">
      <TextField
        value={searchInput}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (searchInput.length)
              router.push(`/products?search=${searchInput}`);
          }
        }}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{
          "> fieldset": {
            borderColor: "rgba(0, 0, 0, 0.23) !important",
          },
        }}
        fullWidth
        size="small"
        placeholder="Search"
        InputProps={{
          endAdornment: (
            <Box display="flex" alignItems="center">
              <Button
                onClick={() => {
                  if (searchInput.length)
                    router.push(`/products?search=${searchInput}`);
                }}
                sx={{
                  borderRadius: 0,
                  py: "7px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                }}
              >
                <MuiSearch />
              </Button>
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
