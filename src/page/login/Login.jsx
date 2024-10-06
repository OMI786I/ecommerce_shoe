import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
const Login = () => {
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [showPassWord, setShowPassWord] = useState(false);
  const { googleSignIn } = useContext(AuthContext);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(location?.state ? location.state : "/");
        console.log(user);
        axios.post("http://localhost:5000/jwt", user).then((res) => {
          console.log(res.data);
        });

        Swal.fire({
          title: "Successfully logged In!",
          text: "You clicked the button!",
          icon: "success",
        });
      })
      .catch((error) => {
        toast.error("Couldn't sign. Are you registered?");
        console.log(error);
      });
  };

  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        console.log(result.user.email);
        console.log(result.user.displayName);
        console.log(result.user.photoURL);
        const toSendData = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        axios
          .post("http://localhost:5000/user/check", {
            email: result.user.email,
          })
          .then((response) => {
            if (response.data.exists) {
              // User already exists, proceed to login
              toast.success("Welcome back!");
              navigate(location?.state ? location.state : "/");
            } else {
              // User doesn't exist, insert new user into the database
              axios
                .post("http://localhost:5000/user", { ...toSendData })
                .then((response) => {
                  if (response.data.insertedId) {
                    toast.success("You have successfully been added");
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  console.log("Error inserting new user:", error);
                });
            }
          })
          .catch((error) => {
            console.log("Error checking user existence:", error);
          });

        // Success toast for Google login
        toast.success("Successfully logged in with Google");
      })
      .catch((error) => {
        console.log("Google Sign In Error:", error);
      });
  };

  const handleValidateCapthca = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left ">
          <img
            className="md:w-[500px] mx-auto lg:mx-0 rounded-3xl"
            src="/src/assets/images/Mobile-login.jpg"
          />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl ">
          <h1 className="font-bold text-3xl text-center">Login</h1>
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassWord ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full pr-10"
                  name="password"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassWord(!showPassWord)}
                >
                  {showPassWord ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleValidateCapthca}
                type="text"
                placeholder="type the text above"
                className="input input-bordered"
                name="captcha"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral" disabled={disabled}>
                Login
              </button>
            </div>
          </form>
          <p className="p-3">
            <small>
              New Here?{" "}
              <Link
                to={"/signUp"}
                className="underline text-blue-600 font-bold"
              >
                Create an account
              </Link>
            </small>
          </p>
          <div className="flex gap-4 p-3">
            <button className="btn" onClick={handleGoogle}>
              <FcGoogle className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
