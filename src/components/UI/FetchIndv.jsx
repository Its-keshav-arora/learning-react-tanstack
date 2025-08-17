import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fetchIndividualPost } from "../../API/api";

export const FetchIndv = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id], // unique cache per post
    queryFn: () => fetchIndividualPost(id),
  });

  if (isLoading) return <p className="loading">Loading...</p>;
  if (isError) return <p className="error">{error.message || "Something went wrong"}</p>;

  return (
    <div className="post-card">
      <div>
        <span>Post ID: {data.id}</span>
        {/* <span>User ID: {data.userId}</span> */}
      </div>
      <h3 className="post-title">{data.title}</h3>
      <p className="post-body">{data.body}</p>
      <NavLink to={"/rq"}>
        <button className="back-btn">Go Back</button>
      </NavLink>
    </div>
  );
};
