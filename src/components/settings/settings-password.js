import { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { useMutation } from 'react-query';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

export const SettingsPassword = (props) => {
  const id = useRef(null)
  if (typeof window !== 'undefined') id.current = localStorage.getItem("userId");

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const mutation = useMutation(values => {
    return fetch("/api/users/"+ id.current, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(res => res.json())
  }, {
    onSuccess: (data) => {
      toast.success("Password updated successfully")
    },
    enabled: values.confirm !== "" && id.current !== null
  }) 

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordEncrypted = {
      password: CryptoJS.AES.encrypt(values.password,process.env.NEXT_PUBLIC_PASSWORD).toString(),
    }
    mutation.mutate(passwordEncrypted);
  }

  return (
    <form {...props} onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
            error={values.password !== values.confirm}
            hepper={values.password !== values.confirm ? "Passwords do not match" : ""}
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={values.password !== values.confirm}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
