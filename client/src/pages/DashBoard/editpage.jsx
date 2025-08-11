import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/postsSlice"; // Assuming you have a setPosts action
import axios from "axios";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const post = useSelector((state) => state.posts.posts.find((p) => p.id === id));
  
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.put(
          `http://localhost:5000/api/posts/${id}`,
          { title, content },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
  
        const updatedPosts = posts.map((post) =>
          post.id === id
            ? { ...post, title: response.data.title, content: response.data.content }
            : post
        );
        dispatch(setPosts(updatedPosts));
  
        navigate("/dashboard");
      } catch (err) {
        console.error("Error updating post:", err);
      }
    };
  
    useEffect(() => {
      if (!post) {
        navigate("/dashboard");
      }
    }, [post, navigate]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            multiline
            rows={4}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/dashboard")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default EditPost;
