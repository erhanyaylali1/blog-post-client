import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import User from "./pages/user/index";
import Post from "./pages/post/index";
import CreatePostEditor from "./pages/post/create-post";
import Layout from './components/shared/Layout';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/register" element={<Register /> } />
            <Route path="/user/:id" element={<User /> } />
            <Route exact path="/post/create-post" element={<CreatePostEditor /> } />
            <Route path="/post/:id" element={<Post /> } />
        </Routes>
        </Layout>
      </BrowserRouter>  
    </div>
  );
}

export default App;
