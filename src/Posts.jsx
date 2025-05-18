import React, { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error loading posts. Please try again later.</p>
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
function Post({ post }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="post">
        <div className="d-flex">
          <img className=" dp rounded-circle" src={post.image_url} alt={`${post.username}`} />
          <div className="namestyle">
            <h5> {post.user_name}</h5>
          </div>
        </div>
        <img className=" my-3 image" src={post.image} alt={`${post.username}`} />
        <div>
          <i className="bi bi-heart"></i>
          <i className="bi bi-chat-square-text"></i>
          <i class="bi bi-send"></i>
        </div>
        <div>
          <b>Likes:{post.likes}</b> <br />
          <b>Comments:{post.comments.length}</b>
        </div>
        <p className="caption">{post.captions}</p>
      </div>
    </div>
  );
}

export default Posts;
