import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3000/profile")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching profile:", err));

    const Suggestions = [
      {
        "id": "101",
        "user_name": "santhosh_003",
        "profile_pic": "https://media.istockphoto.com/id/458017717/vector/king-lion-aslan.jpg?s=612x612&w=0&k=20&c=yKt4ae9kvAdf3JsMsZqb4vZ43sch49ky5rEQ_n8X7-Q="
      },
      {
        "id": "102",
        "user_name": "mani_0007",
        "profile_pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMDKAdCfujA1NAnS8M07t183Sa_oz9AFTyg&s"
      },
      {
        "id": "103",
        "user_name": "mathan_001",
        "profile_pic": "https://musicart.xboxlive.com/7/94dc1000-0000-0000-0000-000000000002/504/image.jpg"
      },
      {
        "id": "104",
        "user_name": "shinchan_the_07 ",
        "profile_pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIYgvoM7QtaHTMEI7IEGh_JDGHx87CHu1Irg&s"
      },
      {
        "id": "105",
        "user_name": "Doremon_cartoon",
        "profile_pic": "https://cdn.dribbble.com/userupload/15015966/file/original-b6c609d63079aca3d4d1b4815ccca74c.png?resize=400x0"
      },
      {
        "id": "106",
        "user_name": "Master_rain_Drop",
        "profile_pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4I-nVJ3KDPZiqYHe6IPsCGrIUT4uaJiZ1Yw&s"
      }
    ];
    setSuggestions(Suggestions);
  }, []);

  const handleFollow = async (id, user_name) => {
    console.log(id, user_name)
    await axios.post('http://localhost:3000/Followers', { "id": id, "user_name": user_name })
      .then(alert("Followed successfully!"))
      .catch(err => console.log(err))
  }

  return (

    <div className="Suggestions w-75 ">

      {profile ? (
        <div className="d-flex align-items-center mb-4">
          <img
            className="dp rounded-circle me-3"
            src={profile.profile_pic}
            alt={`${profile.user_name}`}
            width="50"
            height="50"
          />
          <div className="d-flex namestyle w-100 align-items-center my-4">
            <h4 className="mb-0 ">{profile.user_name}</h4>
            <b className="ms-auto text-primary mb-0">Switch</b>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}


      <div className="d-flex suggested mb-3">
        <b className="text-muted ms-0">Suggested for you</b>
        <b className="ms-auto">See All</b>
      </div>


      {suggestions.length > 0 ? (
        <div>
          {suggestions.map((suggestion) => (
            <div className="d-flex align-items-center mb-3" key={suggestion.id}>
              <img
                className="dp rounded-circle me-3"
                src={suggestion.profile_pic}
                alt={suggestion.user_name}
                width="32"
                height="32"
              />
              <div className="d-flex flex-grow-1 align-items-center">
                <h6 className="mb-0">{suggestion.user_name}</h6>
                <a className="btn btn-link text-primary ms-auto p-0" onClick={() => { handleFollow(suggestion.id, suggestion.user_name) }}>Follow</a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading suggestions...</div>
      )}
    </div>

  );
}

export default Suggestions;