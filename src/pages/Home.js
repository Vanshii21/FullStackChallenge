import React ,{useState,useEffect }from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import "./Home.css";
import axios from "axios";

const Home= () => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    getUsers();
  }, [])
  const getUsers = async () =>{
const response = await axios.get("http://localhost:5000/users")
if(response.status===200){
  setData(response.data);
}
  };
  const onDeleteUser = async (id) => {
    if (
    window.confirm("Are you sure that you wanted to delete that user record")
    ) {
    const response = await axios.delete(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
    toast.success (response.data);
    getUsers();
    }
    }
    };
  console.log("data=> ",data);
  return (
    <div style={{marginTop: "150px"}}>
    {data.length!==0 ?   <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>No.</th>
            <th style={{textAlign: "center"}}>Status</th>
            <th style={{textAlign: "center"}}>Repository Name</th>
            <th style={{textAlign: "center"}}>QueuedAt</th>
            <th style={{textAlign: "center"}}>ScanningAt</th>
            <th style={{textAlign: "center"}}>FinishedAt</th>
            <th style={{textAlign: "center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index)=>{
            return(
              <tr key={index}>
                <th scope="row">{index +1}</th>
                <td>{item.status}</td>
                <td>{item.repoName}</td>
                <td>{item.QueuedAt}</td>
                <td>{item.ScanningAt}</td>
                <td>{item.FinishedAt}</td>
                <td>
<Link to={`/update/${item.id}`}>
<button className="btn btn-edit">Edit</button>
</Link>
<button className="btn btn-delete" onClick={()=> onDeleteUser(item.id)}>Delete</button>
<Link to={`/view/${item.id}`}>
<button className="btn btn-view">View</button>
</Link>
</td>
              </tr>
            );
          })
          }
        </tbody>
      </table> : <h3>No Report Found</h3>}
    </div>
  );
};

export default Home