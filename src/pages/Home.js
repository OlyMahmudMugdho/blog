import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthStatusContext from "../store/AuthContext";
import AllPosts from "./AllPosts";

const Home = () => {
  const navigate = useNavigate();
  const AuthCtx = useContext(AuthStatusContext);
  const check = async () => {
    let val = await AuthCtx.isActive;
    console.log(await val);
  }

  check();

  if (AuthCtx.isActive !== 1) {
    navigate('/auth', { replace: true })
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl text-cyan-600 py-2 "> All Posts </h1>
      </div>
      <AllPosts />
    </div>
  )
}

export default Home