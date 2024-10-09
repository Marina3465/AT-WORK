import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const saveToLocalStorage = (key: string, value: any) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch (error) {
//     console.error("Unable to save to localStorage", error);
//   }
// };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/users',
      // onQueryStarted: async (arg, { queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled;
      //     saveToLocalStorage('data', data);
      //   } catch (error) {
      //     console.error("Error while saving data to localStorage", error);
      //   }
      // },
    }),
  }),
});

export const { useGetPostsQuery } = apiSlice;
