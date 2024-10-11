import React from "react";
import { useParams } from "react-router-dom";
import useUserFetchbyId from "../../customHook/useUserFetchbyId";
import { useForm } from "react-hook-form";

const UserEdit = () => {
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const { isPending, error, data, refetch } = useUserFetchbyId(params.id);
  console.log(data);

  if (!data) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div className="flex justify-center items-center">
        <div className="card w-full max-w-md md:max-w-lg lg:max-w-xl bg-base-100 shadow-2xl">
          <h1 className="font-bold text-3xl text-center p-3">Update Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className="input input-bordered"
                name="name"
                defaultValue={data.name}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                {...register("dob")}
                className="input input-bordered"
                defaultValue={data.dob}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                {...register("gender")}
                className="select select-bordered"
                defaultValue={data.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Phone Number"
                className="input input-bordered"
                defaultValue={data.phone}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Website</span>
              </label>
              <input
                type="text"
                {...register("website")}
                placeholder="https://example.com"
                className="input input-bordered"
                defaultValue={data.website}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                {...register("image")}
                type="text"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <input
                className="btn btn-neutral w-full"
                type="submit"
                value="Update"
              />
            </div>
          </form>
        </div>
      </div>
    );
};

export default UserEdit;
