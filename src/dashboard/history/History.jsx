import React from "react";
import useHistoryFetch from "../../customHook/useHistoryFetch";

const History = () => {
  const { data, isPending, error } = useHistoryFetch();
  console.log(data);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>location</th>
              <th>Products</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((res) => (
              <tr key={res._id}>
                <td>
                  <div>{res.customer_name}</div>
                </td>
                <td>{res.customer_email}</td>
                <td>{res.location}</td>
                <td>
                  {res.products.map((response) => (
                    <ul key={response._id}>{response.title}</ul>
                  ))}
                </td>
                <th>
                  <button className="btn btn-error btn-xs">Delete</button>
                  <button className="btn btn-success btn-xs">Details</button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default History;
