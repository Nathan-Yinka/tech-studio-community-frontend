import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import "../styles/Profiles.css"
import { AiOutlineSearch } from "react-icons/ai"
import { useAuth } from "../contextData/DataContext";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import prof from "../assets/prof.png"
import userIcon from "../assets/user-128_nathan.png"
import { Pagination } from "react-bootstrap";
import LoadingPage from "../pages/Loading";
import { useNavigate } from "react-router-dom";

const Profiles = () => {
  

const {communityData,apiURL,token} = useAuth()
const [filter,setFilter] = useState("")
const [page,setPage] = useState(1)
  const [pageCount,setPageCount] = useState(1)
  const itemPerPage = 20

  const [profiles, setProfiles] = useState([])

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
 
  

  useEffect(() => {
    fetchData()
  }, [selectedOption,search,page]);

  useEffect(()=>{
    setPage(1)
  },[selectedOption,search])

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  function fetchData(){
    setLoading(true)
    const requestOptions = {
      method: 'GET', 
      // headers: {
      //   'Authorization': `Bearer ${token}`, 
      // },
    };
  
    fetch(`${apiURL}/api/users/?community=${selectedOption}&page=${page}&name=${search}`,requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setProfiles(result.results);
        setPageCount(Math.ceil(result.count / itemPerPage));
        
        setLoading(false);
      })
      .catch((error) => {
        // setError(error.message);
        setLoading(false);
      });
  }





  return (
    <div className="container-md">
      <div className="d-flex justify-content-between mt-4">
        <select
          name=""
          id=""
          value={selectedOption}
          placeholder="Select Field"
          onChange={handleOptionChange}
          className="sl col-5 col-md-3 col-lg-2"
        >
          <option value="" disabled>
            Select Field
          </option>
          <option value="">All</option>
          {communityData &&
            communityData.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            })}
        </select>

        <div className="">
          <input
            type="text"
            placeholder="Search for a member"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ip px-1 px-md-3"
          />
          <AiOutlineSearch className="search" />
        </div>
      </div>
{!loading?
  <section>
        <div className="shehu-card-body gap-3">
          {profiles && profiles.map((user)=>{
            return(
              <Card key={user.id} onClick={()=>{navigate(`/profile/${user.id}`)}}
            style={{  backgroundColor: "#D2D4E0" }}
            className="text-center shehu-card col-12"
          >
            {/* <img src={prof} alt="" className=" border-0 rounded-circle" /> */}
            <img src={user.image?user.image:userIcon} alt="" className="  border-white rounded-circle" />
            <Card.Body>
              <h2>{user.full_name}</h2>
              <h4 className="fs-6 ">{user.community_name}</h4>
              <h6 className=""> {user.cohort}</h6>
              {/* <Button variant="primary">View Profile</Button> */}
            </Card.Body>
          </Card>
            )
          })}
        </div>
      </section>
      :
      <div className="d-flex justify-content-center my-5">
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
    </div>
  );
}

export default Profiles;
