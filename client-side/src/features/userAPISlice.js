import { apiSlice } from "./apiSlice";

const BASE_URL = "/api/v1";

export const userAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/auth/register`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/auth/logout`,
        method: "POST",
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/user/profile`,
        method: "PATCH",
        body: data,
      }),
    }),

    userInfo: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/user/profile`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useUserInfoMutation,
} = userAPISlice;
