import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useRouter } from 'next/router'

export const ProductListToolbar = ({searchValue, handleSearchValue, total}) => {

  const router = useRouter();
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography sx={{ m: 1 }} variant="h4">
            Products
          </Typography>
          <Typography variant="subtitle1">({total})</Typography>
        </Box>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={() => router.push('/newproduct')} >
            Add products
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search product"
                variant="outlined"
                value={searchValue}
                onChange={handleSearchValue}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
