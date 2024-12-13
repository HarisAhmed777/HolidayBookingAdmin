import React, { useContext, useEffect, useState } from "react";
import Header from "../header/header";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarContext } from "../../context/SidebarContext";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import DOMPurify from "dompurify"; // Import DOMPurify
import styles from './blogpage.module.css';

function AllBlogs() {
  const { isSidebarVisible } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To navigate to the Edit page

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/allblogs`);
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.put(`${baseUrl}/deleteblog/${id}`);
        alert("Blog deleted successfully");
        fetchBlogs(); // Refresh the blog list
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleEdit = (blog) => {
    navigate(`/starholadmin/editblog/${blog._id}`, { state: { blog } }); // Navigate to edit page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarVisible ? '0px' : '-165px',
          transition: 'margin-left 0.3s ease',
          width: '100%',
        }}
      >
        <Header />
        <div className="ms-4">
          <h2>All Blogs</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Published on</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((blog, index) => (
                <tr key={blog._id}>
                  <td>{index + 1}</td>
                  <td>{blog.title}</td>
                  <td>{new Date(blog.uploadedAt).toLocaleDateString()}</td> {/* Assuming createdAt is the date */}
                  <td>Admin</td>
                  <td>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="btn btn-primary me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
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

export default AllBlogs;
