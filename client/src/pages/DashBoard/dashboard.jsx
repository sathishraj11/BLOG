import { useState, useEffect } from "react";
import {
  Container,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { setPosts, deletePost } from "../../redux/postsSlice";
import axios from "axios";

import Sidebar from "./sidebar";
import Header from "./header";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(true);
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Redux state for user and token
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // Logout via Redux
    navigate("/login");
  };

  const toggleSidebar = () => setOpenSidebar(!openSidebar);

  const sidebarItems = [
    { text: "Dashboard", link: "/dashboard", page: "dashboard" },
    { text: "Add Post", link: "/add-post", page: "addPost" },
    { text: "Logout", action: handleLogout, page: "logout" },
  ];

  const handlePageChange = (page) => setSelectedPage(page);

  // Redux state for posts
  const posts = useSelector((state) => state.posts.posts);

  // Fetch posts from backend when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts?userId=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Use token from Redux
        });
        dispatch(setPosts(response.data)); // Dispatch the posts to Redux store
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user, token]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Use token from Redux
      });
      dispatch(deletePost(postId)); // Use the deletePost reducer
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        sidebarItems={sidebarItems}
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        handlePageChange={handlePageChange}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          marginLeft: isMobile ? 0 : 0,
          transition: "margin 0.3s ease",
        }}
      >
        <Header
          user={user || { name: "Guest" }}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          openSidebar={openSidebar}
          theme={theme}
        />
        <Container sx={{ flexGrow: 1, maxWidth: "100%", padding: 4, marginTop: 8 }}>
          {selectedPage === "dashboard" && (
            <>
              <Typography variant="h4" gutterBottom>
                Welcome, {user?.name || "Guest"}
              </Typography>
              {posts.length === 0 ? (
                <Typography variant="h6">No posts available.</Typography>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{post.title}</Typography>
                      <Typography>{post.content}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(post.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                ))
              )}
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;







