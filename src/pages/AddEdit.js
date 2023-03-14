import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import axios from 'axios';
import "./AddEdit.css";

const initialState = {
  status: "",
  repoName: "",
  QueuedAt: "",
  ScanningAt: "",
  FinishedAt: "",
};
const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { status, repoName, QueuedAt, ScanningAt, FinishedAt } = state;

  const navigate = useNavigate();

  const {id} = useParams();
  useEffect(()=>{
    if(id){
      getSingleUser(id);
    }
  },[id])
  const getSingleUser=async(id)=>{
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
    setState({...response.data[0]});
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value })

  };
  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };
  const updateUser = async (data,id) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };
  function handleSubmit(e) {

    e.preventDefault();
    const { status, repoName, QueuedAt, ScanningAt, FinishedAt } = state;
    if (!status || !repoName || !QueuedAt || !ScanningAt || !FinishedAt) {
      toast.error("Please provide value into each input field");
    } else {
     if(!id){
      addUser(state);}
      else{
        updateUser(state,id);

      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  
  return (
    <div style={{ marginTop: "33px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="status">Status</label>
        <input type="text" id="status"
          name="status"
          placeholder="Enter Status"
          onChange={handleInputChange}
        />

        <label htmlFor="repoName">Repository Name</label>
        <input type="text" id="repoName"
          name="repoName"
          placeholder="Enter Repository"
          onChange={handleInputChange}
        />

        <label htmlFor="QueuedAt">QueuedAt</label>
        <input type="datetime-local" id="QueuedAt"
          name="QueuedAt"
          placeholder="Enter Time"
          onChange={handleInputChange}
        />

        <label htmlFor="ScanningAt">Scanning At</label>
        <input type="datetime-local" id="ScanningAt"
          name="ScanningAt"
          placeholder="Enter DateTime"
          onChange={handleInputChange}
        />

        <label htmlFor="FinishedAt">Finished At</label>
        <input type="datetime-local" id="FinishedAt"
          name="FinishedAt"
          placeholder="Enter Date"
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update": "Add"}></input>
      </form>
    </div>
  )
}

export default AddEdit