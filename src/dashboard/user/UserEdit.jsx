import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserFetchbyId from "../../customHook/useUserFetchbyId";
import { useForm } from "react-hook-form";
import ImagePicker from "../../components/ImagePicker";
import useUserUpdate from "../../customHook/useUserUpdate";
import toast from "react-hot-toast";

const UserEdit = () => {
  const params = useParams();
  const [uploadImage, setUploadImage] = useState(false);
  const { update, updateData } = useUserUpdate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setUploadImage(true);
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
    const submitData = { ...data, image: result.data.display_url };

    if (imageSubmit) {
      update(params.id, submitData);
      setUploadImage(false);
    } else {
      toast.error("Submit image");
    }

    console.log(submitData);
  };

  const [imageValue, setImageValue] = useState();
  const { isPending, error, data, refetch } = useUserFetchbyId(params.id);
  console.log(data);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        dob: data.dob,
        gender: data.gender,
        phone: data.phone,
        website: data.website,
        location: data.location,
      });
    }
  }, [data, reset]);

  if (!data) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="card w-full max-w-md md:max-w-lg lg:max-w-xl bg-base-100 shadow-2xl">
        <h1 className="font-bold text-3xl text-center p-3">Update Profile</h1>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
        >
          {/* Name field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>

          {/* Date of Birth field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="input input-bordered"
            />
            {errors.dob && (
              <span className="text-red-600">{errors.dob.message}</span>
            )}
          </div>

          {/* Gender field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="select select-bordered"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-600">{errors.gender.message}</span>
            )}
          </div>

          {/* Phone Number field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              {...register("phone", { required: "Phone number is required" })}
              placeholder="Phone Number"
              className="input input-bordered"
            />
            {errors.phone && (
              <span className="text-red-600">{errors.phone.message}</span>
            )}
          </div>

          {/* Website field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Website</span>
            </label>
            <input
              type="text"
              {...register("website", { required: "Website is required" })}
              placeholder="https://example.com"
              className="input input-bordered"
            />
            {errors.website && (
              <span className="text-red-600">{errors.website.message}</span>
            )}
          </div>

          {/* Location field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              placeholder="Location"
              className="input input-bordered"
            />
            {errors.location && (
              <span className="text-red-600">{errors.location.message}</span>
            )}
          </div>

          {/* Image Picker */}
          <div className="form-control mb-4">
            <ImagePicker setImageValue={setImageValue} />
          </div>

          {/* Submit Button */}
          <div className="form-control">
            {uploadImage === false && updateData === false ? (
              <input
                className="btn btn-neutral w-full"
                type="submit"
                value="Update"
              />
            ) : (
              <span className="loading loading-spinner loading-lg"></span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
