import "../styles/projects.css";
import image1 from "../assets/image1.png";
import userIcon from "../assets/user-128_nathan.png"
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { Container } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { useAuth } from "../contextData/DataContext";
import { useEffect, useState } from "react";
import Heart from 'react-animated-heart'
import LoadingPage from "../pages/Loading";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { communityData,loading,apiURL,token } = useAuth()
  const navigate = useNavigate()
  const [project,setProject] = useState([])
  const [error,setError] = useState("")
  const [loading2,setLoading] = useState(false)
  const [filter,setFilter] = useState("")
  const [page,setPage] = useState(1)
  const [pageCount,setPageCount] = useState(1)
  const itemPerPage = 20

  useEffect(() => {
    fetchProject()
  }, [filter,page,token,loading]);

  useEffect(()=>{
    setPage(1)
  },[filter])

  function fetchProject(){
    setLoading(true)
    const requestOptions = {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    };
  
    fetch(`${apiURL}/feeds/project/?community=${filter}&page=${page}`, token && requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setProject(result.results);
        setPageCount(Math.ceil(result.count / itemPerPage));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
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
        setProject((projects) => {
          const updatedProjects = projects.map((item) => {
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
  
  

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  }
  return (
    <>
    {(loading && loading2 ) && <LoadingPage/>}
    {(!loading && !loading2) && (<Container>
      <div className="">
        <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center filter gap-3 ">
              <h3 className="fs-3">Community Projects</h3>
              <select name="" id="" value={filter} onChange={(e)=>setFilter(e.target.value)} className=" fs-6">
              <option value="" disabled>Filter By</option>
              <option value="">All</option>
                {communityData && communityData.map((item)=>{
                  return <option value={item.id} key={item.id}>{item.name}</option>
                })}
              </select>
            </div>
            <hr />
            <div className="d-flex flex-column flex-md-row flex-wrap ">
              {!project.length && <h3 className="fw-bold my-5">No Project Found</h3>}
              {project && project.map(project=>
                  <div className="col-12 col-md-6 col-lg-4 d-flex flex-column gap-2 px-md-3 pb-3 position-relative" key={project.id} style={{overflow:"hidden"}}>

                    <div className="col-12 text-captionerr-con">
                  <img src={project.thumbnail? project.thumbnail: image1} alt={project.title} className=" img-fluid rounded-4" style={{height:"300px",width:"100%"}} />
                  </div>
                  <div className="text-center text-captionerr">
                    <p className="text-center fs-3 fw-bold ">{project.title}</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex gap-2 col-7">
                      <img src={project.user.image?project.user.image:userIcon} alt="" className="profile-icon rounded-circle" />
                      <p className="profile-name p-0 m-0">{truncateText(project.user.fullname, 18)}</p>
                    </div>
  
                    <div className="col-3 d-flex align-items-center justify-content-between px-2">
                      <div className="d-flex align-items-center position-relative">
                          <div className="d-flex justify-content-center align-items-center heart333 position-absolute">
                          <Heart isClick={project.liked_by_user} onClick={()=>{handleHeartClick(project.id)}}/>
                          </div>
                        <p className="m-0">{project.total_likes}</p>
                      </div>
  
                      <div className="d-flex align-items-center gap-2">
                        <p className="d-flex fs-4 p-1 align-items-center m-0">
                          {" "}
                          <AiOutlineEye />
                        </p>
                        <p className="m-0">{project.views}</p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
            </div>
      
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-center">
      <Pagination>
    {[...Array(pageCount)].map((_, index) => (
      <Pagination.Item key={index + 1} onClick={() => setPage(index + 1)} active={page===(index+1)}>
        {index + 1}
      </Pagination.Item>
    ))}
      <Pagination.Last />
  </Pagination>

      </div>
    </Container>)}
    </>);
};

export default Projects;
