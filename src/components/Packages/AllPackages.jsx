import React, { useState, useEffect, useContext } from "react";
import Header from "../header/header";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarContext } from "../../context/SidebarContext";
import { baseUrl } from "../../baseUrl";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Allpackages() {
  const { isSidebarVisible } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/allpackages`)
      .then(res => res.json())
      .then(view => {
        console.log(view);
        setData(view);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error occurred", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.post(`${baseUrl}/packages/${id}`)
      .then(response => {
        console.log(response.data);
        setData(data.filter(packages => packages._id !== id));
      })
      .catch(error => console.error('Error deleting package:', error));
  };

  const handleEdit = (packageItem) => {
    navigate('/starholadmin/editpackage', { state: { packageData: packageItem } });
  };

  const handleUpdate = (updatedPackage) => {
    setData(data.map(pkg => (pkg._id === updatedPackage._id ? updatedPackage : pkg)));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='d-flex'>
      <Sidebar />
      <div
        className='flex-grow-1'
        style={{
          marginLeft: isSidebarVisible ? '0px' : '-165px',
          transition: 'margin-left 0.3s ease',
          width: '100%',
        }}
      >
        <Header />
        <div className="ms-3">
          <h1>All Packages</h1>
          <table className="table table-striped" style={{ width: '90%' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody style={{ width: '90%' }}>
              {data.map((packages, index) => (
                <tr key={index}>
                  <td>{packages.packageName}</td>

                  <td>{packages.duration}</td>
                  <td>{packages.city}</td>
                  <td>{packages.cost}</td>
                  <td>{packages.packageCategory}</td>
                  <td>
                    <button  className = 'bg-primary text-white  me-2 px-2' onClick={() => handleEdit(packages)}>Edit</button>
                    <button  className = 'bg-danger  text-white me-2 px-2' onClick={() => handleDelete(packages._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Allpackages;
