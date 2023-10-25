import React, { useEffect, useState } from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import details from '../../assets/details.png'
import study from '../../assets/study.png'
import { Icon } from '@iconify/react';
import '../Dashboard/dashboard.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import Heart from 'react-animated-heart'
import { useAuth } from '../../contextData/DataContext';
import ReactPlayer from 'react-player';
import LoadingPage from '../Loading';
import userIcon from "../../assets/user-128_nathan.png"

const PostDetails = () => {

    const {id} = useParams()
    const navigate = useNavigate();
    const {token,apiURL} = useAuth()
    const [posts,setPosts] = useState(null)
    const [loading,setLoading] = useState(false)
    const [showAlert,SetShowAlert] = useState(false)
    const [error,setError] = useState(null)
    const [loading2,setLoading2] = useState(false)
    const [comment,setComment] = useState("")
    
    const initialLike = JSON.parse(window.localStorage.getItem('likes')) || 0;
  const [likes, setLikes] = useState(initialLike);

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };


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
        `${apiURL}/feeds/post/${id}/`,
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
        setPosts(result);
      })
      .catch((error) => {
        setError(error.message);
      });
    }
  }


  const validateForm = () => {
    if (comment.trim() === "") {
      return true
    }
    else{
      return false
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (!validationErrors) {
      try {
        setLoading2(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formData = new FormData();
        
        formData.append('text', comment);
        
        formData.append('feed', posts.id);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formData
        };

        const response = await fetch(
          `${apiURL}/feeds/post/comment/`,
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
        setComment('')

      } catch (error) {
        console.log(error);
      } finally {
        setLoading2(false);
        fetchPost()
        setComment('')
      }
    } else {
      setError(validationErrors);
    }
  };
  return (
    <>
    {loading2 && <LoadingPage/>}
    {posts && 
    <div>
      <div>
        <div onClick={goBack}>
          <box-icon
            name="left-arrow-alt"
            flip="horizontal"
            width="48"
            animation="burst"
          ></box-icon>
        </div>
        <hr />
      </div>

      <div>
        <div className="details d-flex gap-3">
        <img src={posts.user.image?posts.user.image:userIcon} alt="" className=" rounded-circle" />
          <div className="tex ">
            <h3>
              {posts.user.fullname} <span>{posts.created}</span>
            </h3>
            <p>{posts.tag.name} {posts.month}</p>
          </div>
        </div>

        <h4 className="my-3 ps-lg-3">
          {posts.description}
        </h4>

        <div className="shehu-img">
        {posts.media_file && 
                  <div className="" style={{zIndex:"-200000000"}}>
                  {posts.file_type === "video"?<ReactPlayer url={posts.media_file} playing={true} width={"100%"} maxHeight={"500px"}/>:(posts.media_file? <img src={posts.media_file} alt="" className="img-fluid object-fit-contain" style={{width:"100%",maxHeight:"500px"}} />:"" )}
                  </div>
                  }

          <div className="lov d-flex justify-content-between me-5 mt-3">
            

                    <div className="d-flex gap-2">
                      <Icon icon="system-uicons:message-writing" width="30" height="30" className='ico' />
                      <div className='ico'>{posts.comment_number}</div>
                    </div>

                    <div className='d-flex'>
                <Heart isClick={posts.liked_by_user} onClick={()=>{handleHeartClick(posts.id)}} />
                <div className="likes-count heart">{posts.total_likes}</div>
                    </div>

            <Icon icon="tdesign:share" width="30" height="30" className="ico" />
          </div>
        </div>
      </div>
      <hr />
      <form action="" onSubmit={handleSubmit}>
      <div className="d-flex flex-wrap justify-content-between align-items-center text-center mx-1 mx-md-3">
       
        <div className="d-flex  shehu-comment details col-11">
        <img src={posts.user.image?posts.user.image:userIcon} alt="" className=" rounded-circle" />
          <input
            type="text"
            name=""
            id=""
            value={comment}
            onChange={(e)=>{setComment(e.target.value)}}
            placeholder="Write A Comment"
            className="w-100 border-0 no-border p-4 fs-5"
            style={{border:"none",outline:"none"}}
          />
        </div>

        {comment && 
        <div className='col-1'>
        <button className="bt my-2 " type='submit' onClick={handleSubmit} >Post</button>
    </div>
        }
      </div>
      </form>
      <hr />

        {posts.comments && posts.comments.map((comment)=>{
          return(
          <div>
            <div className="details d-flex gap-3 mx-1 mx-md-3">
            <img src={comment.user.image?comment.user.image:userIcon} alt="" className=" rounded-circle" />
              <div className="tex ">
                <h3>
                   {comment.user.fullname}<span> &nbsp;{comment.created}</span>
                </h3>
                <h6>{comment.text}</h6>
              </div>
            </div>
            <hr />
          </div>)
        })}
    </div>}</>
  );
}

export default PostDetails