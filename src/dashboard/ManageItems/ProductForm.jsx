import axios from "axios";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ImagePicker from "../../components/ImagePicker";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const ProductForm = ({ category, type, refetch }) => {
  const [imageValue, setImageValue] = useState();
  const [loading, setLoading] = useState(false);
  console.log(type);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      colors: ["red", "blue"], // default color array
      dimensions: [{ width: "", height: "", length: "" }], // default dimension array
    },
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors", // for color array
  });

  const {
    fields: dimensionFields,
    append: appendDimension,
    remove: removeDimension,
  } = useFieldArray({
    control,
    name: "dimensions", // for dimension array
  });

  const onSubmit = async (data) => {
    reset();
    setLoading(true);
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

    const toSendData = {
      ...data,
      image: imageSubmit,
    };
    console.log(toSendData);

    if (imageSubmit) {
      axios
        .post(`http://localhost:5000/${category}`, toSendData, {
          withCredentials: true,
        })
        .then(function (response) {
          setLoading(false);
          console.log(response);
          toast.success("successfully added");
          refetch();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else toast.error("add an image");
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Enter product title"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Enter product description"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        {/* Color (Array) */}
        <div>
          <label className="block text-sm font-medium">Colors</label>
          {colorFields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <input
                {...register(`colors.${index}`, {
                  required: "Color is required",
                })}
                className="input input-bordered"
                placeholder={`Color ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendColor("")}
            className="btn btn-success btn-sm"
          >
            Add Color
          </button>
        </div>

        {/* Dimensions (Array) */}
        <div>
          <label className="block text-sm font-medium">
            Dimensions (width x height x length)
          </label>
          {dimensionFields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <input
                {...register(`dimensions.${index}.width`, {
                  required: "Width is required",
                })}
                className="input input-bordered w-24"
                placeholder="Width"
              />
              <input
                {...register(`dimensions.${index}.height`, {
                  required: "Height is required",
                })}
                className="input input-bordered w-24"
                placeholder="Height"
              />
              <input
                {...register(`dimensions.${index}.length`, {
                  required: "Length is required",
                })}
                className="input input-bordered w-24"
                placeholder="Length"
              />
              <button
                type="button"
                onClick={() => removeDimension(index)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendDimension({ width: "", height: "", length: "" })
            }
            className="btn btn-success btn-sm"
          >
            Add Dimension
          </button>
        </div>

        {/* Image */}
        <ImagePicker setImageValue={setImageValue} />

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              validate: (value) => value > 0 || "Price must be greater than 0",
            })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Enter product price"
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <input
            {...register("rating", {
              required: "Rating is required",
              min: { value: 0, message: "Rating must be at least 0" },
              max: { value: 5, message: "Rating can't be more than 5" },
              valueAsNumber: true,
            })}
            type="number"
            step="0.1"
            className="input input-bordered w-full"
            placeholder="Enter rating (0-5)"
          />
          {errors.rating && (
            <span className="text-red-500">{errors.rating.message}</span>
          )}
        </div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("type")}
        >
          <option selected disabled value={""}>
            Choose a Category
          </option>
          {type?.map((res) => (
            <option key={res} value={res}>
              {res}
            </option>
          ))}
        </select>
        {loading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <button type="submit" className="btn btn-success text-white w-full">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
