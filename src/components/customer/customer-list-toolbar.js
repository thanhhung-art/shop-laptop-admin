import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { useState } from 'react';

export const CustomerListToolbar = ({handleSearchValue, searchValue, total, ...rest}) => {

  return (
  <Box {...rest}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography
          sx={{ m: 1 }}
          variant="h4"
          >
          Customers 
        </Typography>
        <Typography variant="subtitle1" >({total})</Typography>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500, position: "relative" }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
              value={searchValue}
              onChange={handleSearchValue}
              sx={{ position: "relative"}}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
)}
