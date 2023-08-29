import React from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Login from "./components/login";
import NavBar from "./components/navbar/BlogNavbar";
import Blog from "./views/blog/Blog";
import Home from "./views/home/Home";
import NewBlogPost from "./views/new/New";
import Success from "./components/success";
import RegistrationForm from "./components/registrationForm";
import Edit from "./views/home/Edit";



function App() {
  const user = useSelector((state) => state.blog.token);

 return (
    <div>
     <Router>
        <NavBar />
        <Routes>
          <Route path="/"exact element={user && user.token ? <Home /> : <Login /> }/>
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/posts/:id/edit" element={<Edit />} />
          <Route path="/new" element={<NewBlogPost />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/success" element={<Success />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
