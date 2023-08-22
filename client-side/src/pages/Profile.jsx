import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { validateSignUp } from "../utils/validateForm";
import { toast } from "react-hot-toast";
import {
  useUpdateUserMutation,
  useUserInfoMutation,
} from "../features/userAPISlice";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [getUserInfo] = useUserInfoMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const res = await getUserInfo().unwrap();
        setUser(res.user);
      } catch (err) {
        toast.error(err?.data?.message || err.error || err);
      }
    };
    loadUserInfo();
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      await updateUser(values).unwrap();
      toast.success("Successfully updated your profile!");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validate={(values) => validateSignUp(values)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ errors, values, isSubmitting }) => (
          <Form className="m-auto flex h-full w-[50%] flex-col items-center justify-center gap-3 text-xs lg:text-base">
            <div className="flex-col items-center justify-center rounded bg-blue-200 p-8 ">
              <div className="text-center text-xl text-gray-500 ">
                Profile info
              </div>
              {user && (
                <div
                  className="grid gap-2 p-4 text-left text-sm"
                  style={{
                    gridTemplateColumns: "1fr 3fr",
                    gridTemplateRows: "1fr 1fr 1fr",
                  }}
                >
                  <div>First name:</div>
                  <div>{user.firstName} </div>
                  <div>Last name:</div>
                  <div>{user.lastName} </div>
                  <div>E-mail:</div>
                  <div>{user.email} </div>
                </div>
              )}
            </div>
            <p className="text-center text-xl text-gray-500 ">Update profile</p>
            <Field
              className="block w-3/4 min-w-[10rem] rounded border border-gray-300 p-2 transition duration-75 focus:border-blue-500 focus:outline-none"
              placeholder="First name"
              type="text"
              id="firstName"
              name="firstName"
            />
            <Field
              className="block w-3/4 min-w-[10rem] rounded border border-gray-300 p-2 transition duration-75 focus:border-blue-500 focus:outline-none"
              placeholder="Last name"
              type="text"
              id="lastName"
              name="lastName"
            />
            <Field
              className="block w-3/4 min-w-[10rem] rounded border border-gray-300 p-2 transition duration-75 focus:border-blue-500 focus:outline-none"
              placeholder="example@gmail.com"
              type="email"
              id="email"
              name="email"
            />
            <Field
              className="block w-3/4 min-w-[10rem] rounded border border-gray-300 p-2 transition duration-75 focus:border-blue-500 focus:outline-none"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
            />

            <button
              disabled={isSubmitting}
              className="w-3/4 min-w-[10rem] rounded bg-blue-600 p-2 text-white hover:bg-blue-500"
              type="submit"
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
