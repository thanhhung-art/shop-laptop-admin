import Head from "next/head";
import { Box, Container, Grid, Backdrop, CircularProgress, Typography } from "@mui/material";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { dehydrate, useQuery, QueryClient, useInfiniteQuery } from "react-query";
import React, { useEffect, useRef, useState } from "react";
import { getAmountProduct, getInfiniteProducts } from "../utils/fetch";

const Products = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showBackdrop, setShowBackdrop] = useState(false);
  const anchor = useRef(null);

  
  const handleBackdrop = () => setShowBackdrop(true);
  const handleClose = () => setShowBackdrop(false);
  const handleSearch = (e) => setSearchValue(e.target.value);
  
  const amountProducts = useQuery("getAmountProducts", getAmountProduct);

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery("getInfiniteProducts", getInfiniteProducts, {
      getNextPageParam: (lastPage, page) => {
        const { next } = lastPage;
        if (next <= Math.ceil(amountProducts.data / 9) - 1) {
          return next;
        }
        return undefined;
      },
    });

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const loadMore = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, options);

    loadMore.observe(anchor.current);

    return () => loadMore.disconnect();
  });

  return (
    <>
      <Head>
        <title>Products | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar
            searchValue={searchValue}
            handleSearchValue={handleSearch}
            total={amountProducts?.data}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {(() => {
                if (error) return <Typography>Error: {error}</Typography>;
                else if (isFetchingNextPage || data) {
                  return data.pages.map((group) => {
                    return group.products.map((product) => (
                      <Grid item key={product._id} lg={4} md={6} xs={12} onClick={handleBackdrop}>
                        <ProductCard product={product} />
                      </Grid>
                    ));
                  });
                } else if (isFetching) return Spinner();
              })()}
            </Grid>
            <Box ref={anchor}></Box>
          </Box>
        </Container>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
        onClick={handleClose}
      >
        <CircularProgress />
      </Backdrop>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery("getInfiniteProducts", () => fetch("http://localhost:5000/api/products/?page=0").then(res => res.json()));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

function Spinner() {
  return (
    <Box display="flex" justifyContent="center" sx={{ width: "100%", p: 4 }}>
      <CircularProgress />
    </Box>
  );
}

export default Products;
