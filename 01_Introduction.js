// React Query == TanStack Query

// # Advantages :
//    In react.js, to fetch data, we have to use either fetch/axios and that too
//    with useState, useEffect() or ContextAPIs to show the response we get from the
//    api. We have to handle manually the loading screen, success , failure errors
//    React TanStack handles it automatically and thus reduces our manual work.

// 1. Data Fetching made easy : With a simple useQuery hook, fetching data becomes
//                              super easy.
// 2. Built-in loading & error states : No need to write custom codes for handling
//                                      loading, erorr or success states.
// 3. Automatic Caching : React Query automatic caches your data.
// 4. Background Refetching : If your data gets stale or out of date, TanStack query
//                            can refetch it in the background.
// 5. Pagination & Infinite Scrolling : Handling pagination or infinite scrolling ?
//     React query has covered you with tools specifically designed for those cases.

// Installation :
// 1. Install react+vite using command : npm create vite@latest (react + javascript)
// 2. Install Tanstack using command : npm i @tanstack/react-query
// 3. Install React router dom : npm i react-router-dom
// 4. Upgrade react to latest v19 : npm install --save-exact react@^19.0.0 react-dom@^19.0.0

// QueryClientProvider : In react query, the QueryClientProvider is a crucial component
//                       that provides a QueryClient instance to your React Application.
//                       This QueryClient is responsible for managing all the data
//                       fetching, caching, and state management related to your queries.

// How to use ?
// You will wrap the QueryClientProvider component around your ReactProvider
// It should be the topmost root parent component in the app.jsx file (check it out)
// "client" prop is passed within that component.
// example :
// const queryClient = new QueryClient();

return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
);

// Query Client : It is the core part of the react-query library. It manages the
//                caching, background fetching, data synchronization, and other
//                query related logic. It provides a centralized store for managing
//                and caching asynchronous data in your application.

// new QueryClient() : This creates a new QueryClient instance with default settings.
//                     You can configure it with options if needed (eg. setting cache time)
//                     , stale time etc.)

// QueryClientProvider : This component is a part of react-query and is used to provide
//                       the QueryClient instance to your entire React Application
//                       (or a portion of it). This makes the QueryClient available
//                       via React's context API so that all the components in the
//                       tree can use the useQuery, useMutation, and the other hooks
//                       provided by react-query.

// In the FetchOld.jsx file, we have seen that how do we previous fetch the data
// using old way (axios + useState + useEffect) and how we have to manage isLoading
// isError and all these stuff manually which is for sure time taking.

// Now we will see, how can we do the same thing using React Query

// useQuery : It takes 2 arguments (queryKey and queryFn)

// queryKey : The queryKey is typically an array or string that uniquely identifies
//            a query. It allows react query to determine if the data in the cache
//            is associated with a particular request.

// It is used to cache the data with a specific key and refetch or update data when
// certain dependencies change.

// Importance of options passed in the useQuery
const {
  data = [],
  error,
  isLoading,
  isError,
  isSuccess,
  isFetching,
} = useQuery({
  queryKey: ["posts"],
  queryFn: getPostData,
  staleTime: 1000 * 60 * 5, // ✅ cache stays fresh for 5 mins
  cacheTime: 1000 * 60 * 10, // ✅ (now replaced by gcTime)
  retry: 2, // ✅ retry failed requests twice
  refetchOnWindowFocus: true, // ✅ refetch when window gets focus
});

// querykey : It's just like useState, the useQuery says that after getting the
//            data, I will store it with the name variable (no use for us Ig)
// staleTime : It tells the query till when the data is fresh.
//             let say staleTime : 5 minutes, The react query will re-fetch the
//             data automatically after 5 minutes if we are on that page.
// cache time : It's the time till we store the data in the memory for instant getting
// Let say : stale time : 5 minutes & cacheTime : 10 minutes
// on t = 0 min :  React query fetches the data and saves in the cache memory
// on t = 4 min : The data is fresh, no re-fetching we will get the data instantly from memory
// on t = 6 min : The data is stale now, but we will get the cached data till we re-fetches
//                so that we don't get (no post found) type of messages on the screen.

// Important : The data doesn't re-fetches automatically after the stale time
//             let say : stale time : 5 minutes, till 6 minutes, if we are on
//             the same page, the reactQuery just marks it as stale, but it doesn't
//             re-fetches. but when we change the screen , tab, and comes back later
//             then again it checkes, if the data is marked as stale, then it re-fetches.

// Use Case : useQuery also provides you with isLoading, isError, error as the
//            output destructured of useQuery response. We can directly use it.

// One more point to note that is, on refreshing the tab, the cache memory fades away
// because cache memory is stored in the ram / memory and not in the local storage
// So the browser will re-fetch the data even if the staleTime and the cacheTime
// was not yet expired.

// Okay, so byDefault value of retry is 3, It retries after 1s , 2s, and 4s and then
// it throws the error. We can set it with our wish as : retry : 2,

// React query lifecycle : fresh -> stale -> inactive -> Garbage Collected (GC)
// fresh : we just fetched the data and it's not stale yet (before stale time)
// stale : The data has expired, now query will again hit the network api
// inactive : user has navigated to the different tab (query now marked as inactive)
// garbage collected : The cache time has expired and now react query will remove it from cache memory.

// React TanStack Dev Tools : It is a debugging dashboard for everything React Query
//                does under the hood. It is a separate package "@tanstack/react-query-devtools"
//                that plugs in my app and gives you an overlay panel in the browser
//                showing :
// 1. All active queries
// 2. Whether data is fresh/stale/inactivce
// 3. Current states: isLoading, isFetching, isError, isSuccess
// 4. Cache contents (the actual data in memory)
// 5. Retry attempts, error messages
// 6. Mutation status (pending, success, error)

// How to Install : npm install @tanstack/react-query-devtools@5 (@5 optional)
// Implement : Wrap your app with QueryClientProvider (you already did), then add:

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* your app here */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// So after importing, you will see a react dev tools icon at the bottom right of the
// tab, and on opening, you will be able to see all the states with it's information
// fresh/in-active/GC and all the information about it.

// For the GET requests, we use useQuery
// useQuery : Fetches and reads the data (GET request) from an API and automatically
//            caches the result.
// useMutation : Used for creating, updating, or deleting data (POST, PUT, DELETE) req,
//               and It allows triggering the manual side effects.

// useMutation is for POST / PUT / PATCH / DELETE requests (change data).
// It doesn't cache results like useQuery(), because mutation typically changes
// the server state.
// But it gives you powerful tools :
// 1. mutate() or mutateAsync() to trigger the request.
// 2. Built-in loading/error/success states.
// 3. Retry support.
// 4. Ability to update/invalidate queries after a mutation (so the UI stays in sync).

// Best use case : We can make the operation before even the server invalidates it
//                 (be it any invalidation) and If the server throws error, we can
//                 rollback our operation.

// now in the latest version v5, the cacheTime is replaced by gcTime.
// Default time of gcTime : 5 minutes.

// Important Note : When we hit the page again, react query first check on the cache
//                  memory, if there is some data stored, It will load that data
//                  But there is a problem, let say there is some modifications
//      of data in the backend, then in that case, we won't be needing old
//      cached memory data to be shown in the website. So what we should do is
//      staleTime : 0, because what staleTime does is, it makes us trust that
//      the data is fresh for x minutes and in our case , it might not be possible
//      If stale time is 5 minutes, the server won't hit the network request till
//      5 minutes and shows us the caches results. But if the staleTime : 0 s
//      Then react query will first check the cache memory and shows us the results
//      along with it, it will also hit the network request and get the response
//      If the response doesn't matches with out cacheMemroy, it will update the memory
//      and load us the latest response. This is how react Tanstack is way too smart.

// Default value of staleTime : 0.
// staleTime : 0 doesn't means it will hit the backend every second.
// staleTime only means the data is marked as stale once the time expires.
// Then on tab change, or focus shift (going to other app/tab) or page change in
// the same website, or network connectivity online/offline. Then only again
// it sends the request to the backend to re-fetch things again to get the latest data.

// Polling in react query : Have you every seen stock websites getting updated
//                          in milliseconds, how to hit the API in ms (again and again)
// It can be easily handled with the help of react-query.

// Polling : In react query, polling refers to the technique of fetching data from
//           an API at regular intervals to keep the UI up-to-date with the latest
//           Information. This is especially useful for scenarios where data changes
//           frequently and you want to display real-time updates without requiring
//           the user to manually refresh the page.

// 'refetchInterval' option : The simplest way to enable polling is to pass this
//      option to the 'useQuery' hook. This option specifies the interval (in ms)
//      at which react query should automatically refetch the data.

// When you want to fetch the data even in the background or you are in another tab.
// 'refetchIntervalInBackground' option : If you want to continue polling even when
// the component is not mounted, you can use this option.

// Now we will see dynamic routing using React TanStack. like www.google.com/page/:id

// For unique elements let say we designed dynamic routes for posts. there in the
// react keys, we will pass ["post", id]. Id we are passing to make that key unique.

// How to Implement Pagination using React Query ?
// To pass arguments in the queryFn, we have to use arrow functions.
// The queryFn will gets called only when the arguments in the "queryKey" changes.

// Another cool option is : keepPreviousData (import it from @tanstack/react-query)
// and pass this in useQuery as :
// placeholderData : keepPreviousData
// what it does is, while switching pages, the API was showing loading page until
// it gets the data. But what it does now is, It remains at the same page till it
// gets the next page data in pagination thing. By doing this, we avoided the
// annoying loading screen till then and made the functionality smoother.

// Now we will study about useMutation :
// useMutation is used to modify or send data to a server (create, update, or delete op).

// The useMutation is a part of react query and is used for operations that modify
// data like CREATE, UPDATE & DELETE (CRUD Operations)

// Syntax : const mutation = useMutation(mutation Fn, {
//                               // Optional Configuration options
//                             });

// We can provide various configuration options to customize the behavior of mutation
// such as :
// 1. onSuccess : A callback function that runs when the mutation is successful.
// 2. onError   : A callback function that runs if mutation fails.
// 3. onSettled : A callback Fn that runs regardless of success or failure.
// 4. mutationKey : A unique key to identify the mutation in the cache.

// The mutate function is used to execute the mutation in the React query.
// The process is same whether you're :
// 1. Deleting Data      2. Updating Data     3. Creating new Data

// When you call .mutate(), It tells the React Query to run the mutation function
// defined inside the useMutation hook. This is needed because the mutation is
// an action that changes the data. unlike queries, which are used to fetch data
// and are often auto-executed.

// Code to perform DELETE Operation using useMutation:
// const deleteMutation = useMutation({
//   mutationFn: (id) => deletePost(id),
// });

<button className="delete-btn" onClick={() => deleteMutation.mutate(post.id)}>
  🗑 Delete
</button>;

export const deletePost = async (id) => {
  return await api.delete(`/posts/${id}`);
};

// The thing is, by doing this we've deleted the data from the backend and we've
// got the 200 network response as well. But as in real time deletion, we would
// want to get the list updated after performing the delete operation.

// so now let's remove the data from the cache memory as well to get the updated list.
// queryClient.setQueryData is used to update the cached data for a specific query.
//       In this case, It's the query with the key ["post", pageNumber], which
//       likely represents the list of posts of the current page.

// Here is the code to perform delete operation in the cache memory.

const queryClient = useQueryClient();
const deleteMutation = useMutation({
  mutationFn: (id) => deletePost(id),
  onSuccess: (data, id) => {
    // Data is what we'll get back from backend. and Id :unique we will use to delete the post from the cache memory.
    queryClient.setQueryData(["posts", pageNumber], (currEl) => {
      return currEl?.filter((post) => post.id !== id);
    });
  },
});
// queryClient.setQueryData gives the whole data of the arguments we've passed in it.
// Then we just used the basic filter thing to remove the element from the list.

// Similar to DELETE Operation, we can do Update/Create operation as well using TanStack.

// How to Implement Infinite Scrolling ?
// React Query provides us the useInfiniteQuery

// Scroll Events in JS :
// 1. window.innerHeight : The height of the visible part of the webpage (the viewport)
// 2. window.scrollY : The amount of pixels the user has scrolled down the page.
// 3. document.documentElement.scrollHeight : The total height of the webpage, including
//                                            the part not visible without scrolling.

// When the sum of window.innerHeight and window.scrollY is approximaterly equals to
// document.documentElement.scrollHeight - 1, the user is near to bottomost possible of the webpage.

// you can implement infinite scrolling directly using react-intersection-observer
