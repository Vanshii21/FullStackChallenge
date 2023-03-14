import React,{useEffect,usestate} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './View.css';

const View = () => {
  const[user,setUser]=usestate(null);
  const {id} = useParams();
  useEffect(()=>{
    if(id){
      getSingleUser(id);
    }
  },[id])
  const getSingleUser=async(id)=>{
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
    setUser({...response.data[0]});
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
    <div className="card">
    <div className="card-header">
    <p>User Contact Detail</p>
    </div>
    <div className="container">
    <strong>ID: </strong>
    <span>{id}</span>
    <br />
    <br/>
    <strong>Status: </strong>
    <span>{user && user.status} </span>
    <br />
    <br />
    <strong>Repository Name: </strong>
    <span>{user && user.repoName} </span>
    <br />
    <br />
    <strong>QueuedAt: </strong>
    <span>{user && user.QueuedAt} </span>
    <br />
    <br />
    <strong>ScanningAt: </strong>
    <span>{user && user.ScanningAt} </span>
    <br />
    <br />
    <strong>FinishedAt: </strong>
    <strong>{user && user.FinishedAt} </strong>
    <br />
    <br />
    <Link to="/">
      <button className="btn btn-edit">Go Back</button>
    </Link>
    </div>
    </div>
    </div>
  );
};


export default View