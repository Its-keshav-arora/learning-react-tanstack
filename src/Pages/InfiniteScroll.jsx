import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";

export const InfiniteScroll = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    status,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 1 }) => fetchUsers(pageParam), // must pass pageParam
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage 👉", lastPage); // It includes the content of the current page before loading the new scrolled data
      console.log("allPages 👉", allPages); // It's the number of pages that have been shown till now.
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
      // agar last page ne bhi poora content show kardia toh go to next page
      // else agar last page hi poora content show nahi kar paya to aage
      // kyu hi load karenge hum. You got it ? right !!
    },
  });

  // Flatten pages
  const users = data?.pages.flat() ?? [];

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;

    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  if (status === "loading") return <p>Loading...</p>;
  if (isError) return <p>Error Fetching Data</p>;

  return (
    <div>
      <h2>👥 Users</h2>
      <div className="card-grid">
        {users.map((user) => (
          <div key={user.id} className="post-card">
            <div className="card-header">
              <img src={user.avatar_url} alt={user.login} className="avatar" />
              <span className="user-name">{user.login}</span>
            </div>
            <p>ID: #{user.id}</p>
            <p>Node: {user.node_id}</p>
          </div>
        ))}
      </div>

      {/* Loader at bottom */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll to load more..."
          : "No more users 🚀"}
      </div>
    </div>
  );
};

// When the sum of window.innerHeight and window.scrollY is approximaterly equals to
// document.documentElement.scrollHeight - 1, the user is near to bottomost possible of the webpage.
