import { Box, TextField, Button, Grid, Checkbox, Typography } from "@mui/material";
import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import UploadImage from "../../utils/uploadImage";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProduct } from "../../utils/fetch";

const fields = {
  name: "",
  desc: "",
  categories: "",
  ram: "",
  rom: "",
  price: "",
  cpu: "",
  gpu: "",
  sreen: "",
  camera: "",
  battery: "",
  os: "",
  color: "",
  brand: "",
};

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [linkToImage, setLinkToImage] = useState("");
  const [file, setFile] = useState("");
  const [instock, setInStock] = useState(false);
  const [upload, setUpload] = useState(false);
  const { link } = UploadImage(file, upload, setUpload);
  const valuesSended = useRef({});
  const [productInfo, setProductInfo] = useState(null);

  const { data, error, isLoading } = useQuery(["getProduct", id], () => getProduct(id), {
    enabled: id !== undefined,
    onSuccess: (data) => {
      if (data.desc === undefined || data.categories === undefined) {
        setProductInfo({ ...data, desc: "", categories: "" });
      } else {
        setProductInfo(data);
      }
      setLinkToImage(data.img);
    },
  });

  const uploadProduct = useMutation(
    (values) => {
      return fetch("/api/products/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
    {
      onSuccess: () => {
        toast("Product updated successfully");
      },
    }
  );

  useEffect(() => {
    if (link) {
      uploadProduct.mutate({ ...valuesSended.current, img: link });
    }
  }, [link]);

  const loadFile = function (event) {
    setLinkToImage(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataChecked = { ...productInfo };

    // for (let i in dataChecked) {
    //   if (dataChecked[i] === "") {
    //     delete dataChecked[i];
    //   }
    //   // check if the price is not changed
    //   if (i === "price" && dataChecked[i] === 0) {
    //     delete dataChecked[i];
    //   }
    // }

    // check image change or not
    if (linkToImage && linkToImage !== productInfo.img) {
      setUpload(true);
      valuesSended.current = dataChecked;
    } else {
      uploadProduct.mutate(dataChecked);
    }
  };

  if (isLoading || !productInfo) {
    return (
      <>
        <Head>
          <title>Eidt product</title>
        </Head>
        <Typography>loading...</Typography>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Eidt product</title>
      </Head>
      <Box
        component="main"
        display="flex"
        alignItems="center"
        flexGrow={1}
        flexDirection="column"
        sx={{ p: 4 }}
      >
        <Typography variant="h4">Edit Product Page</Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={1}
            sx={{
              my: 3,
            }}
          >
            {Object.keys(fields).map((key, index) => {
              if (
                key === "name" ||
                key === "ram" ||
                key === "rom" ||
                key === "desc" ||
                key === "categories"
              ) {
                return (
                  <Grid item xs={12} key={index}>
                    <TextField
                      fullWidth
                      label={key}
                      name={key}
                      onChange={handleChange}
                      value={productInfo[key]}
                      variant="outlined"
                    />
                  </Grid>
                );
              }

              return (
                <Grid item xs={12} lg={6} md={6} sm={12} key={index}>
                  <TextField
                    fullWidth
                    label={key}
                    margin="normal"
                    name={key}
                    onChange={handleChange}
                    type={key == "price" ? "number" : "text"}
                    value={productInfo ? productInfo[key] : key === "price" ? 0 : ""}
                    variant="outlined"
                  />
                </Grid>
              );
            })}
            <Grid item xs={12} sx={{ pl: 1 }}>
              In stock:{" "}
              <Checkbox
                checked={productInfo.instock}
                onClick={() => setProductInfo({ ...productInfo, instock: !productInfo.instock })}
              ></Checkbox>
            </Grid>
            <Grid container spacing={3} alignItems={"center"}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" hidden onChange={loadFile} accept="image/*" />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Image
                  src={linkToImage ? linkToImage : "/static/images/250x150.png"}
                  className="image-preview"
                  alt="product image"
                  width="250px"
                  height="150px"
                />
              </Grid>
            </Grid>
            <Box sx={{ py: 2 }}>
              <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                Edit Product
              </Button>
            </Box>
          </Grid>
        </form>
      </Box>
    </>
  );
}

EditProduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
