import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [Followers, setFollowers] = useState([]);
  const [unfollowed, setUnfollowed] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/profile')
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error('Error fetching profile:', error));

    axios.get('http://localhost:3000/Followers')
      .then(data => setFollowers(data.data))
      .catch((error) => console.error('Error fetching followers:', error));

  }, [unfollowed]);

  function HandleOnChange(e) {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleUpdate = async () => {
    axios.put("http://localhost:3000/profile", profile)
      .then(alert("Update successfully!"))
      .catch(err => console.log(err))
  }

  const handleUnFollow = async (id) => {
    const confirmation = window.confirm("Are you sure you want to unfollow this user?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3000/Followers/${id}`);
        alert("Unfollowed successfully!");
        setUnfollowed(!unfollowed);
      } catch (err) {
        console.error("Error unfollowing user:", err);
        alert("Failed to unfollow. Please try again.");
      }
    }
  };

  return (
    <div>

      {profile ? (
        <div className=' profileimg m-5'>
          <h1>Profile</h1>
          <img src={profile.profile_pic} className="profile rounded-circle" alt="Profile" />
          <h5>{profile.user_name}</h5>
          <div className='forminput d-flex ' >
            <span > User_name: </span>

            <input type="text"
              name='user_name'
              value={profile.user_name}
              className='form-control my-2'
              onChange={HandleOnChange}
            />
            <span>Profile_pic :</span>
            <input type="text"
              name='profile_pic'
              value={profile.profile_pic}
              className='form-control my-2'
              onChange={HandleOnChange}
            />
          </div>
          <button className='updatebtn btn-primary my-2' onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <div>Loading profile...</div>
      )}
      <div>
        <b className='followtext'>Followers :</b>
      </div>

      {Followers.length > 0 ? (
        Followers.map((Follower) => (
          <div key={Follower.id} className='sugg '>
            <p>{Follower.user_name}</p>
            <button className='btn btn-primary ms-auto my-2' onClick={() => { handleUnFollow(Follower.id) }}>unfollow</button>
          </div>
        ))
      ) : (
        <p>No followers found.</p>
      )}
    </div>
  );
}

export default Profile;
