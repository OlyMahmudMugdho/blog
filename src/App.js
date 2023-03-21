import MainNavigation from "./components/layout/MainNavigation";
import '../src/dist/output.css';
import { AuthContext } from "./store/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import SinglePost from "./pages/SinglePost";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Update from "./pages/Update";
import Signup from "./components/auth/Signup";
import MyPosts from "./pages/MyPosts";

function App() {

  return (
    <AuthContext>
      <BrowserRouter>
        <div className="block">
          <MainNavigation />
        </div>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/update/post/:id" element={<Update />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myposts" element={<MyPosts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
