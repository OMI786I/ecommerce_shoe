import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
          {...register("description", { required: "Description is required" })}
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
          onClick={() => appendDimension({ width: "", height: "", length: "" })}
          className="btn btn-success btn-sm"
        >
          Add Dimension
        </button>
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium">Image</label>
        <input
          {...register("image", { required: "Image is required" })}
          type="file"
          className="file-input file-input-bordered w-full"
        />
        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
        )}
      </div>

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

      <button type="submit" className="btn btn-success text-white w-full">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
