import { Box, Container, TextField, Typography, Button, Grid, Checkbox } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import UploadImage from "../utils/uploadImage";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";

const fields = {
  name: "",
  ram: "",
  rom: "",
  categories: "",
  desc: "",
  price: "",
  cpu: "",
  gpu: "",
  screen: "",
  camera: "",
  battery: "",
  os: "",
  color: "",
  brand: "",
};

const original = {
  name: "",
  price: 0,
  desc: "",
  categories: "",
  ram: "",
  rom: "",
  cpu: "",
  gpu: "",
  screen: "",
  camera: "",
  battery: "",
  os: "",
  brand: "",
  color: "",
  desc: "",
  categories: "",
};

export default function NewProduct() {
  const [linkToImage, setLinkToImage] = useState("");
  const [file, setFile] = useState("");
  const [instock, setInStock] = useState(false);
  const [upload, setUpload] = useState(false);
  const valuesSended = useRef({});
  const [product, setProduct] = useState(original);

  const { link } = UploadImage(file, upload, setUpload);

  const uploadProduct = useMutation(
    (values) => {
      return fetch("/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
    {
      onSuccess: () => {
        setLinkToImage("");
        setFile("");
        setInStock(false);
        return toast("Product added successfully");
      },
    }
  );

  useEffect(() => {
    if (link) {
      uploadProduct.mutate({ ...valuesSended.current, img: link, instock });
    }
  }, [link]);

  const loadFile = function (event) {
    setLinkToImage(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpload(true);
    valuesSended.current = { ...product };
    setProduct(original);
  };

  return (
    <>
      <Head>
        <title>Add new product</title>
      </Head>
      <ToastContainer />
      <Box component="main" display="flex" flexDirection="column" sx={{ p: 4 }}>
        <>
          <Typography variant="h4" textAlign="center">
            Add New Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              sx={{
                my: 3,
              }}
            >
              {Object.keys(fields).map((key, index) => {
                if (key === "name" || key === "ram" || key === "rom" || key === "categories" || key === "desc") {
                  return (
                    <Grid item xs={12} key={index}>
                      <TextField
                        fullWidth
                        label={key}
                        name={key}
                        onChange={handleChange}
                        value={product[key]}
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
                      value={product[key]}
                      variant="outlined"
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                In stock: <Checkbox onClick={() => setInStock(!instock)}></Checkbox>
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
                  Add to database
                </Button>
              </Box>
            </Grid>
          </form>
        </>
      </Box>
    </>
  );
}

NewProduct.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
