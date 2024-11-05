import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [users, setUsers] = useState([]);
  const [lastUserId, setLastUserId] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          per_page: 15, // Adjust the number of users per page
          since: lastUserId, //The user id it should begin listing
        },
      });
      const newUsers = response.data;
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setLastUserId(newUsers[newUsers.length - 1]?.id); // update the last user ID
      setHasMore(newUsers.length > 0);
    } catch (error) {
      console.error("Error fetching users from GitHub API:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container py-8">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          React Infinite Scroll Demo
        </h1>
        <InfiniteScroll
          dataLength={users.length}
          next={fetchUsers}
          hasMore={hasMore}
          loader={
            <h4 className="font-semibold mt-4 text-center">Loading...</h4>
          }
          endMessage={<p>No more users to display</p>}
        >
          <div className="flex flex-wrap gap-4 justify-between items-center">
            {users.map((user, key) => (
              <div
                key={key}
                className="border h-[8rem] w-[45%] sm:w-[30%] md:w-[20%] flex flex-col gap-2 items-center p-2"
              >
                <img
                  src={user.avatar_url}
                  alt={`Avatar image of ${user.login}`}
                  width="80px"
                  height="80px"
                  className="rounded-full"
                />
                <p>{user.login}</p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
