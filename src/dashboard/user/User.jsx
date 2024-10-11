import React from "react";
import useUserFetch from "../../customHook/useUserFetch";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
const User = () => {
  const { isPending, error, data, refetch } = useUserFetch();

  if (isPending) {
    <span className="loading loading-spinner loading-lg"></span>;
  } else
    return (
      <div>
        <section className="w-full overflow-hidden dark:bg-gray-900">
          <div className="flex flex-col">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="User Cover"
              className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
            />
            <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
              <img
                src={data[0]?.image}
                alt="User Profile"
                className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
              />

              <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                {data[0]?.name}
              </h1>
            </div>

            <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
              <div className="flex justify-between items-center gap-10">
                <div className="w-fit text-gray-700 dark:text-gray-400 text-md text-xl font-bold">
                  user Information
                </div>
                <div>
                  <Link to={`/dashboard/edit/${data[0]?._id}`}>
                    <button className="btn hover:btn-error hover:text-white">
                      <FaEdit /> Edit{" "}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                  <div className="w-full">
                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                      <div className="flex flex-col pb-3">
                        <dt className="mb-1 flex items-center gap-2 text-gray-500 md:text-lg dark:text-gray-400">
                          Name
                        </dt>
                        <dd className="text-lg font-semibold">
                          {data[0]?.name}
                        </dd>
                      </div>
                      <div className="flex flex-col py-3">
                        <dt className="mb-1 flex items-center gap-2 text-gray-500 md:text-lg dark:text-gray-400">
                          Date of Birth
                        </dt>
                        <dd className="text-lg font-semibold">
                          {data[0]?.dob}
                        </dd>
                      </div>
                      <div className="flex flex-col py-3">
                        <dt className="mb-1 flex items-center gap-2 text-gray-500 md:text-lg dark:text-gray-400">
                          Gender
                        </dt>
                        <dd className="text-lg font-semibold">
                          {data[0]?.gender
                            ? data[0]?.gender
                            : "Please enter your gender"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="w-full">
                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                      <div className="flex flex-col pb-3">
                        <dt className="mb-1 flex items-center gap-2 text-gray-500 md:text-lg dark:text-gray-400">
                          Location
                        </dt>
                        <dd className="text-lg font-semibold">
                          {data[0]?.location}
                        </dd>
                      </div>

                      <div className="flex flex-col pt-3">
                        <dt className="mb-1 flex items-center gap-2 text-gray-500 md:text-lg dark:text-gray-400">
                          Phone number
                        </dt>
                        <dd className="text-lg font-semibold">
                          {data[0]?.phone
                            ? data[0]?.phone
                            : "Please enter your phone number"}
                        </dd>
                      </div>
                      <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Email
                        </dt>
                        <dd className="text-lg font-semibold">
                          {data[0]?.email}
                        </dd>
                      </div>

                      <div className="flex flex-col pt-3">
                        <dt className="mb-1 flex items-center gap-2 text-gray-500 md:text-lg dark:text-gray-400">
                          Website
                        </dt>
                        <dd className="text-lg font-semibold hover:text-blue-500">
                          <a href={data[0]?.website}>{data[0]?.website}</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default User;
