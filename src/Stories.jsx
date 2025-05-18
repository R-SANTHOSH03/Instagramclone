import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Stories() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  let tot = 0;

  useEffect(() => {
    fetch("http://localhost:3000/Story")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        return response.json();
      })
      .then((data) => setStories(data))
      .catch((err) => console.error("Error fetching stories:", err));
  }, []);

  return (
    <div className="story d-flex">
      <div className="d-none">
        {tot = stories.length}
      </div>
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story.id} onClick={() => { navigate(`/Story/${story.id}/${tot}`) }}>
            <div className="gradient-border">
              <img
                src={story.image_url}
                alt="Story"
                className="story-dp rounded-circle" />
            </div>
            <p className="text-truncate" style={{ width: "90px" }}>{story.user_name}</p>
          </div>
        ))
      ) : (
        <p>No stories available</p>
      )}
    </div >
  );
}

export default Stories;
