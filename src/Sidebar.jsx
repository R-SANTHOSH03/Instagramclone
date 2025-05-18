import React from 'react'
import { useNavigate } from 'react-router-dom'


function Sidebar() {

  const navigate = useNavigate();

  return (
    <div className="side position-fixed">
      <div className="sidelist d-flex flex-column gap-3">
        <img className="logo-text" src="https://logos-world.net/wp-content/uploads/2020/05/Instagram-Logo-2016-present.png" />
        <div><i className="bi bi-house-heart-fill"></i>Home</div>
        <div><i className="bi bi-search-heart"></i>Search</div>
        <div><i className="bi bi-compass"></i>Explore</div>
        <div><i className="bi bi-camera-reels"></i>Reels</div>
        <div> <i className="bi bi-chat-square-heart"></i>Message</div>
        <div> <i className="bi bi-heart"></i>Notifications</div>
        <div><i className="bi bi-plus-square"></i>Create</div>
        <div onClick={() => { navigate(`/profile`) }}> <i className="bi bi-person-circle"></i>Profile</div>

      </div>
      <div className=" menu position-fixed d-flex flex-column gap-3 mb-1">
        <div><i className="bi bi-threads"></i>Threads</div>
        <div><i className="bi bi-list"></i>More</div>
      </div>
    </div>

  )
}

export default Sidebar
