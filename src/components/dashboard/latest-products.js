import { formatDistanceToNow, subHours } from "date-fns";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import { useQuery } from "react-query";

export const LatestProducts = (props) => {
  const { isLoading, data, error } = useQuery("fetchProducts", () => {
    return fetch("/api/products/?new=true")
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  });

  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Card {...props}>
          <CardHeader subtitle={`${data.length} in total`} title="Latest Products" />
          <Divider />
          <List>
            {data.map((product, i) => (
              <ListItem divider={i < data.length - 1} key={product._id}>
                <ListItemAvatar>
                  <img
                    alt={product.name}
                    src={product.img}
                    style={{
                      height: 40,
                      width: 70,
                    }}
                  />
                </ListItemAvatar>
                <Box>
                  <Typography variant="subtitle2" fontSize={12}>
                    {product.name.slice(0, 35) + " ..."}
                  </Typography>
                  <Typography variant="caption" fontSize={11}>{`Updated ${formatDistanceToNow(
                    new Date(product.updatedAt)
                  )} ago`}</Typography>
                </Box>
                <IconButton edge="end" size="small" sx={{ ml: "auto" }}>
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Link href={`/products`}>
              <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
                View all
              </Button>
            </Link>
          </Box>
        </Card>
      )}
    </>
  );
};
