import React,{useState,useEffect} from 'react';
import{useNavigate, useLocation} from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import "./AddEdit.css";

const initialState={
  status: "",
  repoName:"",
  QueuedAt:"",
  ScanningAt:"",
  FinishedAt:"",
};
const AddEdit = () => {
  const[state, setState]= useState(initialState);
  const{status,repoName,QueuedAt,ScanningAt,FinishedAt}= initialState;

  const navigate = useNavigate ();
const addContact = async (data) => {
const response = await axios.post("http://localhost:5000/user", data);
if (response.status === 200) {
toast.success(response.data);
}
};
  function handleSubmit(e) {
    e.preventDefault();
if (!status || !repoName || !QueuedAt || !ScanningAt || !FinishedAt) {
toast.error("Please provide value into each input field");
} else {
addContact(state);
  setTimeout(()=> navigate.push("/"),500); 
}
  };

  const handleInputChange=(e)=>{
    let{status, value}=e.target;
    setState({...state,[status]: value})
  };
  return (
    <div style={{marginTop: "33px"}}>
      <form
      style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center",
      }}
      onSubmit={handleSubmit}
      >
        <label htmlFor= "status">Status</label>
        <input type="text" id="status" 
        name="status" 
        placeholder="Enter Status" 
        onChange={handleInputChange} 
        />

        <label htmlFor= "repoName">Repository Name</label>
        <input type="text" id="repoName" 
        name="repoName" 
        placeholder="Enter Repository" 
        onChange={handleInputChange} 
        />

        <label htmlFor= "QueuedAt">QueuedAt</label>
        <input type="datetime-local" id="QueuedAt" 
        name="QueuedAt" 
        placeholder="Enter Time" 
        onChange={handleInputChange} 
        />

        <label htmlFor= "ScanningAt">Scanning At</label>
        <input type="datetime-local" id="ScanningAt" 
        name="ScanningAt" 
        placeholder="Enter DateTime" 
         onChange={handleInputChange} 
       />

        <label htmlFor= "FinishedAt">Finished At</label>
        <input type="datetime-local" id="FinishedAt" 
        name="FinishedAt" 
        placeholder="Enter Date" 
        onChange={handleInputChange} 
        />

 <input type="submit" value="Add"></input>      
      </form>
        </div>
  )
}

export default AddEdit