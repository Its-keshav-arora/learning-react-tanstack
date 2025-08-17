
// This is the old way of fetching the data using basic axios setup and useState, useEffect()
// The thing is, using react tanstack we can do the same thing within 3-4 lines
// Including error handling, page loading, data fetching, data caching & success/failure messages.

import { useState, useEffect } from "react"
import { fetchPosts } from "../API/api";

export const FetchOld = () => {
    const [Posts, setPosts] = useState([]);

    const getPostData = async () =>  {
        try {
            const res = await fetchPosts();
            res.status === 200 ? setPosts(res.data) : []
        }
        catch(err) {
            console.log(err);
            return [];
        }
    }

    useEffect(() => {
        getPostData();  
    }, []);

    return (
    <div>
      <h2>Posts</h2>
      {Posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {Posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}