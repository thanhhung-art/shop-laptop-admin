import {
  Box,
  Avatar,
  Rating,
  Typography,
  TextareaAutosize,
  Stack,
  Button,
  styled,
  FormControl,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchUser } from "../../utils/fetch";
import StarPurple500Icon from '@mui/icons-material/StarPurple500';

const Review = ({ review, pid }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [replies, setReplies] = useState(review.reply);

  const handleValue = (e) => {
    setValue(e.target.value);
  }

  const handleClick = () => setOpen(!open);

  const id = null;
  if (typeof window !== "undefined") id = localStorage.getItem("userId");
  const {data} = useQuery("getUser", () => fetchUser(id), {enabled: id !== null});

  const postReply = useMutation((values) => {
    return fetch(`/api/products/reply/${pid}/${review.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(res => res.json());
  }, {
    onSuccess: (data) => {
      const temp = [...replies, data.latestReply]
      setReplies(temp);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    postReply.mutate({
      name: data.username,
      userId: data._id,
      userImg: data.img,
      content: value,
      isAdmin: data.isadmin,
    })

    setValue("");
  };

  return (
    <Box sx={{ my: 3 }} key={review.userId}>
      <Grid container>
        <Grid container item xs={12} lg={3} sm={12}>
          <Box display="flex" sx={{ gap: 1, flexDirection: "column", mt: 3 }}>
            <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
              <Avatar src={review.userImg} />
              <Typography variant="subtitle1" fontWeight="bold">{review.name}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sx={{ px: 2, pt: 1, width: "100%" }} xs={12} lg={9} sm={12}>
          <Box display="flex" sx={{ gap: 2 }} alignItems="center">
            <Rating value={review.rating} readOnly size="small" />
            <Typography variant="subtitle1" fontWeight="bold">
              {review.rating === 5 && "Excellent"}
              {review.rating === 4 && "Good"}
              {review.rating === 3 && "Average"}
              {review.rating === 2 && "Bad"}
              {review.rating === 1 && "Terrible"}
            </Typography>
          </Box>
          {review.review && (
            <Typography variant="body2">{review.review}</Typography>
          )}
          {replies.length > 0 &&
            replies.map((reply) => (
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{ pl: 3, pb: 1, mt: 1 }}
                key={reply.userId}
              >
                <Box>
                  <Avatar src={reply.userImg} sx={{height: 30, width: 30}} />
                </Box>
                <Box>
                  <Stack>
                    <Box display="flex" gap={0.3} alignItems="center">
                      <Typography fontSize={14} fontWeight="bold">
                        {reply.name}
                      </Typography>
                      {reply.isAdmin && <StarPurple500Icon fontSize="small" />}
                    </Box>
                    <Typography fontSize={12}>{reply.content}</Typography>
                  </Stack>
                </Box>
              </Box>
            ))}
          <Box display="flex" sx={{ gap: 1, mt: 0.2, mb: 0.5 }}>
            <Typography
              fontSize={13}
              sx={{ cursor: "pointer" }}
              onClick={handleClick}
            >
              reply
            </Typography>
          </Box>
          {open && (
            <>
              <FormControl sx={{ width: "100%" }}>
                <form onSubmit={handleSubmit}>
                  <Box>
                    <TextareaAutosize
                      placeholder={`reply to ${review.name}`}
                      minRows={3}
                      maxRows={3}
                      style={{ padding: 5, width: "100%" }}
                      onChange={handleValue}
                      value={value}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end">
                    <Button variant="contained" size="small" type="submit">
                      reply
                    </Button>
                  </Box>
                </form>
              </FormControl>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Review;
