import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassWord, setShowPassWord] = useState(false);
  const [showPassWord2, setShowPassWord2] = useState(false);

  const status = "active";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
  };

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

            <div className="form-control w-full my-6">
              <label>image url</label>
              <input
                {...register("image", { required: true })}
                type="text"
                className=" input input-bordered"
              />
              {errors.image && (
                <p className="text-red-600">image is required</p>
              )}
            </div>

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