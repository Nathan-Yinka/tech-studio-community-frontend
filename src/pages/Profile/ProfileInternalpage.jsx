import React, { useEffect, useState } from 'react'
import study from '../../assets/study.png'
import tech from '../../assets/tech.png'
import prof4 from '../../assets/prof4.png'
import { Icon } from '@iconify/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./profile.css"
import { useAuth } from '../../contextData/DataContext';
import userIcon from "../../assets/user-128_nathan.png"


const Profile = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const {token,apiURL} = useAuth()
  const [posts,setPosts] = useState(null)
  const [loading2,setLoading2] = useState(false)
  const [error,setError] = useState(null)


  // console.log(posts);
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(()=>{
    if (token){
      fetchPost()
    }
    else{
      fetchPost2()
    }
  },[])


  async function fetchPost(){
    try {
      setLoading2(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
  
      const response = await fetch(
        `${apiURL}/api/users/${id}/`,
        requestOptions
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }
  
      const result = await response.json();
      setPosts(result)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  }

  async function fetchPost2(){
    try {
      setLoading2(true);
  
      var requestOptions = {
        method: "GET",
      };
  
      const response = await fetch(
        `${apiURL}/api/users/${id}/`,
        requestOptions
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }
  
      const result = await response.json();
      setPosts(result)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  }



  function handleUnFollow(id){
    if (!token){
      navigate("/login")
    }
    else{
    var formdata = new FormData();
    formdata.append("user_to", id);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formdata,
      
    };
  
    fetch(`${apiURL}/api/users/unfollow/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        fetchPost()
        // console.log(result);
      })
      .catch((error) => {
        setError(error.message);
      });
    }
  }

  function handleFollow(id){
    if (!token){
      navigate("/login")
    }
    else{
    var formdata = new FormData();
    formdata.append("user_to", id);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formdata,
      
    };
  
    fetch(`${apiURL}/api/users/follow/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        fetchPost()
        // console.log(result);
      })
      .catch((error) => {
        setError(error.message);
      });
    }
  }


  return (
    
<>
{loading2 && 
<div style={{height:"100vh"}} className='d-flex justify-content-center align-items-center'> 
<div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div><div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</div>
}
{ 
posts && 
    <div className='container my-4' >
     
        <div className="shehu-profile-img">
          <img src={study} alt="" />
          <img src={tech} alt="" />
          <img src={study} alt="" />
        </div>
        <div className="prof4"><img src={posts.image?posts.image:userIcon} alt="" className=" rounded-circle" /> </div> 


          <section className="shehu-prof-text my- px-2 text-center d-md-flex  mx-md-4">
             
             <div className="first">
                <h3>{posts.full_name}</h3>
                <p>{posts.community_name}</p>
                <p className='ps-5'>{posts.cohort}</p>
                <p> <Icon icon="ion:location-outline" /> Lagos  Nigeria</p>
             </div>

             <div className="second d-flex gap-3 mx-auto ">
              <div className=''>
                <h4>{posts.followers_count}</h4>
                <p>Followers</p>
              </div>

              <div className="vert"></div>

              <div>
                <h4>{posts.project_number}</h4>
                <p>Projects</p>
              </div>
             </div>

             <div className="third">
              {token? (posts.is_following?
                 
                 <button className='btn btn-primary' onClick={()=>handleUnFollow(posts.id)}> UnFollow</button>:
                 <button className='btn btn-primary' onClick={()=>handleFollow(posts.id)}> Follow</button>):
                 <a href={`mailto:${posts.email}?subject=Hiring Inquiry`}>  
  <button className="btn btn-primary">Hire</button>
</a>
              }
             </div>
          </section>

          <div className="about-me px-2 px-md-3 my-4 px-lg-5">
            <h2>About Me</h2>
            <p>{posts.bio?posts.bio:"No bio About this user"}</p>
          </div>
    </div>}
    </>
  )
}

export default Profile