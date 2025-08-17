// This is the new tanstack way to fetch data.

import { NavLink } from "react-router-dom";
import { fetchPosts, deletePost, updatePost } from "../API/api";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

// Even this part of block can be removed as well, if we return data in the
// api call as well. Then in only 3 lines, we are able to get/fetch/cache the data.
// Nice use case of react tanstack.
export const FetchRQ = () => {
  const queryClient = useQueryClient();
  const getPostData = async (pageNumber) => {
    try {
      const res = await fetchPosts(pageNumber);
      return res.status === 200 ? res.data : [];
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => getPostData(pageNumber),
    // refetchInterval:1000, // Hits the backend every 1s to refetch the data
    // refetchIntervalInBackground :true,  // Hits the backend every refetchInterval of time, even when we are not on the focus to current tab.
    staleTime: 1000 * 60 * 5, // 5 minutes of stale time (data is fresh till 5 minutes)
    gcTime: 1000 * 60 * 10, // 10min of garbage time (memory saves data for 10 minutes after fetching it & Then removes from the cache storage)
    retry: 2,
    placeholderData: keepPreviousData,
  });

  //! Mutation function to delete the post:
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // Data is what we'll get back from backend. and Id :unique we will use to delete the post from the cache memory.
      queryClient.setQueryData(["posts", pageNumber], (currEl) => {
        return currEl?.filter((post) => post.id !== id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),

    onSuccess: (data, variables) => { // the data here is the data returned by the api.
      queryClient.setQueryData(["posts", pageNumber], (oldPosts) =>
        oldPosts?.map((post) =>
          post.id === variables ? { ...post, ...data } : post
        )
      );
    },
  });

  // See, how simply we did it.
  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>{error.message || "Something went wrong !!"}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        <div className="card-grid">
          {data.map((post) => (
            <div key={post.id} className="post-card">
              <div className="card-header">
                <span className="user">👤 User {post.userId}</span>
                <span className="post-id">#{post.id}</span>
              </div>

              {/* Clickable title/body via NavLink */}
              <NavLink
                style={{ cursor: "pointer", textDecoration: "none" }}
                to={`/rq/${post.id}`}
              >
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
              </NavLink>

              <button
                className="delete-btn"
                onClick={() => updateMutation.mutate(post.id)}
              >
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteMutation.mutate(post.id)}
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      </ul>
      <div className="pagination">
        <button
          onClick={() =>
            pageNumber > 1
              ? setPageNumber((prev) => prev - 1)
              : setPageNumber(pageNumber)
          }
          className="page-btn"
        >
          Prev
        </button>
        <p className="page-number">{pageNumber}</p>
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          className="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};
