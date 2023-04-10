import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Categories } from "types/product";

import { Search as MuiSearch } from "@mui/icons-material";

const Search = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Categories.CELL_PHONES
  );
  return (
    <Box display="flex">
      <TextField
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
              <Select
                sx={{
                  "> fieldset": {
                    border: "none",
                  },
                }}
                size="small"
                data-testid="select-category"
                name="category"
                value={selectedCategory}
                label="Category"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
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
              <Button
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
