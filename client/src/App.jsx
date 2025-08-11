import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Dashboard from "./pages/DashBoard/dashboard";
import AddPost from "./pages/DashBoard/addpost";
import EditPost from "./pages/DashBoard/editpage";
import GoogleCallback from "./pages/googleCallBack";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// PrivateRoute using Redux
const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth); // Get token from Redux state
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/google-callback" element={<GoogleCallback />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/add-post" element={<PrivateRoute><AddPost /></PrivateRoute>} />
          <Route path="/edit-post/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
