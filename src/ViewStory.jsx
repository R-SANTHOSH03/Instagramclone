import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ViewStory = () => {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/Story/${id}`)
      .then((response) => response.json())
      .then((data) => setStory(data))
      .catch((err) => console.error("Error fetching story:", err));
  }, [id]);

  if (id > tot || id <= 0) {
    navigate('/');
  }
  return (

    <div className='storybg'>

      {story ? (
        <div className='viewstory'>
          <b>@{story.user_name}</b>

          <div className='arrow d-flex justify-content-center align-items-center'>

            <Link to={`http://localhost:5173/Story/${Number(id) - 1}/${tot}`}><i class="bi bi-arrow-left-circle-fill"></i></Link>
            <img className="vh-100" src={story.image} alt="story" />
            <Link to={`http://localhost:5173/Story/${Number(id) + 1}/${tot}`}><i class="bi bi-arrow-right-circle-fill"></i></Link>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

    </div>
  );
};

export default ViewStory;
