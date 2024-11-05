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
    <InfiniteScroll
      dataLength={users.length}
      next={fetchUsers}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more users to display</p>}
    >
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.login}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default App;
