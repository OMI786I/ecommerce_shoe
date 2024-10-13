import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:5000/user", {
        credentials: "include",
      }).then((res) => res.json()),
  });
  console.log(data);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  const handleRole = (id, roleName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `http://localhost:5000/user/admin/${id}`,
            { role: roleName },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: `Made ${roleName}!`,
                text: `User is Successfully made ${roleName}.`,
                icon: "success",
              });
            } else toast.error("There was an error");
          });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-center p-3">Recent Donation Requests</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>User Avatar</th>
                <th>User Email</th>
                <th>User Name</th>
                <th>User Role</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((res, index) => (
                <tr key={res._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={res.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {res.email}
                    <br />
                  </td>
                  <td>{res.name}</td>
                  <th>{res.role}</th>
                  <th>{res.status}</th>

                  <th>
                    {res.role === "admin" ? (
                      <button
                        onClick={() => handleRole(res._id, "user")}
                        className="btn btn-neutral mx-3"
                      >
                        Un admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRole(res._id, "admin")}
                        className="btn btn-neutral mx-3"
                      >
                        Make Admin
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
