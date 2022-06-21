import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import UploadImage from "../../utils/uploadImage";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const AccountProfile = ({ user }) => {
  const id = localStorage.getItem("userId");
  const [linkToImage, setLinkToImage] = useState("");
  const [file, setFile] = useState("");
  const [upload, setUpload] = useState(false);
  const { link } = UploadImage(file, upload, setUpload);

  const loadFile = function (event) {
    setLinkToImage(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handleClick = () => setUpload(true)

  const mutation = useMutation(values => {
    return fetch("/api/users/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(res => res.json())
  }, {
    onSuccess: (data) => {
      toast.success("Profile image updated successfully")
    }
  })

  useEffect(() => {
    if (link) {
      mutation.mutate({img: link});
    }
  },[link]);

  return (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={linkToImage || user.img}
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h5">
          {user.username}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.address}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button variant="outlined" component="label" fullWidth>
        Load Image
        <input type="file" hidden onChange={loadFile} accept="image/*" />
      </Button>
      <Button fullWidth variant="outlined" disabled={!file} onClick={handleClick}>
        Save image
      </Button>
    </CardActions>
  </Card>
)};
