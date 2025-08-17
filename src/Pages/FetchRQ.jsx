// This is the new tanstack way to fetch data.

import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

// Even this part of block can be removed as well, if we return data in the
// api call as well. Then in only 3 lines, we are able to get/fetch/cache the data.
// Nice use case of react tanstack.
export const FetchRQ = () => {  
  const getPostData = async () => {
    try {
      const res = await fetchPosts();
      return (res.status === 200 ? res.data : []);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostData,
    staleTime:1000 * 60 * 5, // 5 minutes of stale time (data is fresh till 5 minutes) 
    gcTime : 1000 * 60 * 10, // 10 minutes of cache time (memory saves data for 10 minutes after fetching it)
    retry : 2,
  });

  // See, how simply we did it.
  if(isLoading) return <p>loading...</p>
  if(isError) return <p>{error.message || "Something went wrong !!"}</p>

  return (
    <div>
      <h2>Posts</h2>
        <ul>
          {data?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
    </div>
  );
};
