import PropTypes from "prop-types";
import { Box, Card, CardContent, Divider, Grid, Typography, Button } from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ product, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      cursor: "pointer",
    }}
    {...rest}
  >
    <Link href={`/products/${product._id}`}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Image alt="Product" src={product.img} height={240} width={400} />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="subtitle1">
          {product.name}
        </Typography>
      </CardContent>
    </Link>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <ClockIcon color="action" />
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            {format(Date.parse(product.updatedAt), "dd/MM/yyyy")}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Link href={`/editproduct/${product._id}`}>
            <Button>Edit</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
