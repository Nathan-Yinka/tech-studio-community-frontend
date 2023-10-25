import React, { useEffect, useState } from "react";
import Sidebar from '../../component/Sidebar'
import HeaderDashboard from '../../component/HeaderDashboard';
import gal from '../../assets/gal.png'
import gif from '../../assets/gif.png'
import hero from '../../assets/hero.png'
import details from '../../assets/details.png'
import study from '../../assets/study.png'
import { Icon } from '@iconify/react';
import tech from '../../assets/tech.png'
import logo from '../../assets/logo.png'
import '../Dashboard/dashboard.css'
import { Link, useNavigate } from "react-router-dom";
import Heart from 'react-animated-heart'
import { useAuth } from "../../contextData/DataContext";
import Alert from "../../component/Alert"
import { AlertHeading, AlertLink } from "react-bootstrap";
import Loader from "../../component/Loader";
import ReactPlayer from 'react-player'
import userIcon from "../../assets/user-128_nathan.png"
import LoadingPage from "../Loading";


const Dashboard = () => {
  const [newPost ,setNewPost] = useState("")
  const [newFile,SetNewFile] = useState(null)
  const {token,apiURL} = useAuth()
  const [error,setError] = useState(null)
  const [showAlert,SetShowAlert] = useState(false)
  const [loading,setLoading] = useState(false)
  const [loading2,setLoading2] = useState(false)
  const [posts,setPosts] = useState([])

  const navigate = useNavigate()
const initialLike = JSON.parse(window.localStorage.getItem('likes')) || 1;
  const [likes, setLikes] = useState(initialLike);


  useEffect(()=>{
    if(!token){
        navigate("/")
    }
  },[])

  useEffect(()=>{
    fetchPost()
  },[])

  const initialClick = JSON.parse(window.localStorage.getItem('isClick')) || false;
  const [isClick, setClick] = useState(initialClick);


  useEffect(() => {
    window.localStorage.setItem('likes', likes)
    window.localStorage.setItem('isClick', isClick);
  }, [isClick, likes]);

  const validateForm = () => {
    if (newPost.trim() === "") {
      setError(true)
    }
    else{
      setError(null)
    }
    return error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (!validationErrors) {
      try {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formData = new FormData();
        if (newFile){
          formData.append('media_file', newFile);
        }
        formData.append('description', newPost);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formData
        };

        const response = await fetch(
          `${apiURL}/feeds/post/`,
          requestOptions
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "An error occurred");
        }

        const result = await response.json();
        SetShowAlert(true)
        setTimeout(() => {
          SetShowAlert(false)
        }, 5000);
        setNewPost("")
        SetNewFile(null)

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        fetchPost()
      }
    } else {
      setError(validationErrors);
    }
  };
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
      `${apiURL}/feeds/post/`,
      requestOptions
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    const result = await response.json();
    setPosts(result.results)
  } catch (error) {
    console.log(error);
  } finally {
    setLoading2(false);
  }
}


function handleHeartClick(id){
  if (!token){
    navigate("/login")
  }
  else{
  var formdata = new FormData();
  formdata.append("feed_id", id);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formdata,
    
  };

  fetch(`${apiURL}/feeds/project/like-unlike/`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      setPosts((projects) => {
        const updatedProjects = posts.map((item) => {
          if (item.id === id) {
            return result;
          } else {
            return item;
          }
        });
        return updatedProjects;
      });
    })
    .catch((error) => {
      setError(error.message);
    });
  }
}
 
  return (
    <div>
      <div className="sidebar-shehu">
      <Sidebar />
      </div>
      <section className=''>
       <div className="shehu-board ">
       <HeaderDashboard />
        </div>
        
        <section className="ps-md-4  shehu-dash ">
          <form action="" className="" style={{zIndex:"-300000"}} onSubmit={handleSubmit} >
          {showAlert && 
          <div class="alert alert-success alert-dismissible fade show " style={{zIndex:"-300000"}} role="alert">
          <strong>Your Post Been Uploaded Successfully</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
          }
           <textarea type="text" className="w-100 border-0 fs-4 px-3 mb-3" value={newPost} onChange={(e)=>{setNewPost(e.target.value)}} style={{outline:"none"}} rows={6} placeholder="What Have You Been Up To?!" id="yyy"/>

           <div className="d-flex justify-content-between  align-items-center container"  style={{width:"100%"}}>

          <div className="">
          <label htmlFor="poster-img" className=" d-block" >
            <div className="d-flex">
            <img src={gal} alt="" id=""/>
            <img src={gif} alt="" className='mx-3' /> <img src={hero} alt="" /> 
          </div>
          </label>
          </div>

          <div className="d-flex justify-content-end"> <button className={`bt ${!newPost && "d-none"}`}  type="submit">{loading?<Loader/>:"Post"}</button>
          </div>
        
           </div>
          </form>

          <input type="file" accept="image/*, video/*" id="poster-img" className="d-none" onChange={(e)=>{SetNewFile(e.target.files[0])}}/>
          <hr />

          <p className="feed mb-5 fs-3">News Feed</p>
          {loading2 && 
          <div>
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
</div>
          </div>
          }
          {posts && !loading2 && posts.map((post)=>{
              return (
                <div keys={post.id} onClick={()=>{navigate(`/postdetails/${post.id}`)}}>
                <div className="details d-flex gap-3">
                  <img src={post.user.image?post.user.image:userIcon} alt="" className=" rounded-circle" />
                  <div className="tex ">
                    <h3>{post.user.fullname}<span> &nbsp;&nbsp;{post.created}</span></h3>
                    <p className="fs-6">{post.tag.name} {post.month}</p>
                  </div>
                </div>
    
                <h4 className='my-3 ps-lg-3'>{post.description}</h4>
    
                <div className='shehu-img'>
                  {post.media_file && 
                  <div className="" style={{zIndex:"-200000000"}}>
                  {post.file_type === "video"?<ReactPlayer url={post.media_file} playing={true} width={"100%"} maxHeight={"500px"}/>:(post.media_file? <img src={post.media_file} alt="" className="img-fluid object-fit-contain" style={{width:"100%",maxHeight:"500px"}} />:"" )}
                  </div>
                  }
                  <div className="lov d-flex justify-content-between me-5 mt-3">
    
                    <div className="d-flex gap-2">
                      <Icon icon="system-uicons:message-writing" width="30" height="30" className='ico' />
                      <div className='ico'>{post.comment_number}</div>
                    </div>
    
                    <div className='d-flex'>
                <Heart isClick={post.liked_by_user} onClick={()=>{handleHeartClick(post.id)}} />
                <div className="likes-count heart">{post.total_likes}</div>
                    </div>
    
                    <Icon icon="tdesign:share" width="30" height="30" className='ico' />
                  </div>
                </div>
                  <hr />
              </div>
              )
          })
}
        </section>

      </section>
    </div>
  )
}

export default Dashboard