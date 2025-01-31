import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import toast from "react-hot-toast";
import ImagePicker from "../../components/ImagePicker";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [imageValue, setImageValue] = useState();
  const [showPassWord, setShowPassWord] = useState(false);
  const [showPassWord2, setShowPassWord2] = useState(false);
  const [uploadImage, setUploadImage] = useState(true);

  console.log(imageValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setUploadImage(false);
    const imgData = new FormData();
    imgData.append("key", import.meta.env.VITE_IMGBB_APIKEY);
    imgData.append("image", imageValue);

    // Upload image to ImgBB
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imgData,
    });

    const result = await response.json();
    const imageSubmit = result.data.display_url;
    console.log(result.data.display_url);

    console.log(data);

    const toSendData = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: imageSubmit,
      role: "user",
    };
    console.log(toSendData);

    createUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        toast.success("successfully Registered");

        axios
          .post("https://ecommerce1-server.vercel.app/user", {
            ...toSendData,
          })
          .then(function (response) {
            if (response.data.insertedId) {
              toast.success("You have successfully added");
              setUploadImage(true);
              navigate(location?.state ? location.state : "/");
            }

            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (uploadImage === false) {
    return (
      <div className="flex justify-center">
        {" "}
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left md:w-1/2">
          <img src="/src/assets/images/SignUp.jpg" alt="Registration" />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl md:w-1/2">
          <h1 className="font-bold text-3xl text-center">Registration</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered"
                name="name"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input input-bordered"
                name="email"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassWord ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="input input-bordered w-full pr-10" // Ensure input has full width and padding-right
                  name="password"
                />
                <span
                  className="absolute right-3 top-3 hover:cursor-pointer" // Positioning the icon absolutely inside the input
                  onClick={() => setShowPassWord(!showPassWord)}
                >
                  {showPassWord ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>

              {errors.password && errors.password.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one uppercase, one lowercase, one number,
                  and one special character
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassWord2 ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  className="input input-bordered w-full pr-10" // Ensure input has full width and padding-right
                  name="confirmPassword"
                />
                <span
                  className="absolute right-3 top-3 hover:cursor-pointer" // Positioning the icon absolutely inside the input
                  onClick={() => setShowPassWord2(!showPassWord2)}
                >
                  {showPassWord2 ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
            {/*
            <div>
              <input type="file" className="" {...register("image")} />
            </div>*/}

            <ImagePicker setImageValue={setImageValue} />
            <div className="form-control mt-6">
              <input
                className="btn btn-neutral"
                type="submit"
                value="Register"
              />
            </div>
          </form>
          <p className="m-4">
            <small>
              Already have an account?{" "}
              <Link className="text-blue-700 underline font-bold" to={"/login"}>
                Log in
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
