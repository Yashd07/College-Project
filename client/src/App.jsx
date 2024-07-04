import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import SigninPage from "./pages/SigninPage";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import store from "./redux/store";
import Home from "./pages/Home";

import { Provider } from "react-redux";
import EventsList from "./pages/EventsList";
import UserDash from "./pages/UserDash";
import EventForm from "./pages/EventForm";
import ProfileScreen from "./components/ProfileScreen";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SigninPage />} />
        <Route path="/dashboard" element={<UserDash />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/createEvent" element={<EventForm />} />
      </Routes>
      <CssBaseline />
      <ToastContainer />
    </Provider>
  );
}

export default App;
