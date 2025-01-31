import axios from "axios";
import Swal from "sweetalert2";
import useWishListFetch from "./useWishListFetch";

const useCartDelete = () => {
  const { refetch } = useWishListFetch();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://ecommerce1-server.vercel.app/wishlist/${id}`, {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res);
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                refetch();
              }
            });
        }
      })
      .catch((err) => console.log(err));
  };
  return handleDelete;
};

export default useCartDelete;
