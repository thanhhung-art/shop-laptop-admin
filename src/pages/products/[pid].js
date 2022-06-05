import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import Image from "next/image";
import {
  Container,
  Typography,
  Grid,
  Stack,
  Box,
  ButtonGroup,
  Button,
  CircularProgress,
  Avatar,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import format from "date-fns/format";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../../firebase";
import { useQuery, dehydrate, QueryClient, useMutation } from "react-query";
import UserReview from "../../components/product/UserReivew";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 3,
};

const storage = getStorage(app);

const Item = styled("div")({
  backgroundColor: "fff",
  padding: ".3rem",
});

const NameProduct = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const BoxProduct = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: 14,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 14,
  },
}));

const Key = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const Value = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",

  [theme.breakpoints.down("sm")]: {
    fontSize: ".8rem",
  },
}));

const categorySkip = ["_id", "createdAt", "updatedAt", "reviews", "img", "__v"];

const Product = () => {
  const router = useRouter();
  const pid = router.query.pid;
  const [openModal, setOpenModel] = useState(false);
  const handleModalOpen = () => setOpenModel(true);
  const handleModalClose = () => setOpenModel(false);

  const { isLoading, data, error } = useQuery(["getProduct", pid], () => getProduct(pid), {
    enabled: pid !== undefined,
  });

  const deleteProduct = useMutation(
    () => {
      return fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        router.push("/products");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  // const deleteProduct = async () => {
  //   const imgName = data.img.slice(69).match(/(.*)\?/gm);
  //   imgName = imgName[0].slice(0, -1);

  //   const desertRef = ref(storage, imgName);

  //   remove image from storage

  //   deleteObject(desertRef)
  //     .then(() => {
  //       // File deleted successfully
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   deleteProductMutation.mutate();
  // };

  if (isLoading || pid === undefined) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ py: 5 }}>
          <NameProduct variant="h5" textAlign="center">
            {data.name}
          </NameProduct>
        </Box>
        <BoxProduct>
          <Box>
            <Image width={350} height={200} src={data.img} />
            <Box display="flex" justifyContent="center">
              <ButtonGroup variant="outlined">
                <Link href={`/editproduct/${data._id}`}>
                  <Button>Edit product</Button>
                </Link>
                <Button onClick={handleModalOpen}>Delete product</Button>
              </ButtonGroup>
              <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure want to delete this product?
                  </Typography>
                  <ButtonGroup fullWidth sx={{ mt: 2 }}>
                    <Button onClick={handleModalClose}>No</Button>
                    <Button color="error" onClick={() => deleteProduct.mutate()}>
                      Yes
                    </Button>
                  </ButtonGroup>
                </Box>
              </Modal>
            </Box>
          </Box>
          <Stack>
            {Object.entries(data).map(([key, value], i) => {
              if (categorySkip.includes(key)) return;

              if (key === "instock")
                return (
                  <Box key={i} display="flex" sx={{ gap: 1 }}>
                    <Key variant="h6">{key}</Key>
                    <Value variant="body2">{value ? "stocking" : "out of stock"}</Value>
                  </Box>
                );

              return (
                <Box key={i} display="flex" sx={{ gap: 1 }}>
                  <Key variant="h6">{key}</Key>
                  <Value variant="body2">
                    {value}
                    {key === "price" && "$"}
                  </Value>
                </Box>
              );
            })}
          </Stack>
        </BoxProduct>
        <UserReview reviews={data.reviews} pid={data._id} />
      </Container>
    </>
  );
};

Product.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

function getProduct(id) {
  return fetch(`http://localhost:5000/api/products/find/${id}`)
    .then((res) => res.json())
    .then((res) => {
      res.createdAt = format(Date.parse(res.createdAt), "dd/MM/yyyy");
      res.updatedAt = format(Date.parse(res.updatedAt), "dd/MM/yyyy");
      return res;
    });
}

// export async function getStaticProps({ params }) {
//   const pid = params?.pid;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["getProduct", pid], () => getProduct(pid));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:5000/api/products").then(res => res.json());
//   const paths = res.map(({ _id }) => ({ params: { pid: _id } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default Product;
