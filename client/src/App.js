import './App.css';
import MyHeader from './Components/MyHeader';
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import CreatePost from './Pages/CreatePost';
import SingleBlog from "./Pages/SingleBlog"
import Reset from "./Pages/Reset"
import ProtectedRoute from "./ProtectedRoutes.js"

function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token; // true if token exists, false if null or undefined

  return (
    <div className="App">
      <MyHeader />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/reset' element={<Reset />} />

        <Route path="/" element={<ProtectedRoute />}>

          <Route path="/Create-new-post" element={<CreatePost />} />

        </Route>
        <Route path="/post/:postId" element={<SingleBlog />} />

      </Routes>
    </div>
  );
}

export default App;
