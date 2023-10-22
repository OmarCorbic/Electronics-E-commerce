import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { validateSignUp } from "../../utils/validateForm";
import { hideModal, showLogIn } from "../../features/modalSlice";
import { useRegisterMutation } from "../../features/userAPISlice";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner";

const SignUp = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      await register(values).unwrap();
      dispatch(hideModal());
      toast.success("Successfully registered!");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err?.error || err);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values) => validateSignUp(values)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ errors, values, isSubmitting }) => (
          <Form className="flex h-full w-full flex-col items-center justify-center gap-3 text-sm">
            <div className="flex-col items-center justify-center rounded-full bg-blue-200 p-8 text-xl text-gray-500 ">
              <div className="flex items-center justify-center">
                <AiOutlineUserAdd size="50" color="white" />
              </div>
              <p>Sign up</p>
            </div>

            <Field
              className="block w-full max-w-sm rounded border border-gray-300 p-2 transition duration-75 focus:border-blue-500 focus:outline-none"
              placeholder="First name"
              type="text"
              id="firstName"
              name="firstName"
            />
            <Field
              className="block w-full max-w-sm rounded border border-gray-300 p-2 transition duration-75 focus:border-blue-500 focus:outline-none"
              placeholder="Last name"
              type="text"
              id="lastName"
              name="lastName"
            />
            <Field
              className="block w-full max-w-sm rounded border border-gray-300 p-2 transition duration-75 focus:border-blue-500 focus:outline-none"
              placeholder="example@gmail.com"
              type="email"
              id="email"
              name="email"
            />
            <Field
              className="block w-full max-w-sm rounded border border-gray-300 p-2 transition duration-75 focus:border-blue-500 focus:outline-none"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
            />

            <button
              disabled={isSubmitting}
              className="w-full max-w-sm rounded bg-blue-600 p-2 text-white hover:bg-blue-500"
              type="submit"
            >
              Sign up
            </button>

            <div className="p-3 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => {
                  dispatch(hideModal());
                  dispatch(showLogIn());
                  toast.dismiss();
                }}
                className="cursor-pointer text-blue-500"
              >
                Log in!
              </span>{" "}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
