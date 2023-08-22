import React from "react";
import { Formik, Form, Field } from "formik";
import { AiOutlineLogin } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showSignUp } from "../../features/modalSlice";
import { validateLogIn } from "../../utils/validateForm";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "../../features/userAPISlice";
import { setCredentials } from "../../features/authSlice";
import Spinner from "../Spinner";

const Login = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async ({ email, password }) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      dispatch(hideModal());
      toast.success("Successfully logged in!");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || err);
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values) => validateLogIn(values)}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ errors, values, isSubmitting }) => (
          <Form className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="flex-col items-center justify-center rounded-full bg-blue-200 px-11 py-8 text-xl text-gray-500 ">
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <div className="flex items-center justify-center">
                    <AiOutlineLogin size="50" color="white" />
                  </div>
                  <p>Log in</p>
                </>
              )}
            </div>

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
              Log in
            </button>

            <div className="p-3 text-center text-gray-500">
              Don't have an account yet?{" "}
              <span
                onClick={() => {
                  dispatch(hideModal());
                  dispatch(showSignUp());
                  toast.dismiss();
                }}
                className="cursor-pointer text-blue-500"
              >
                Sign up!
              </span>{" "}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
