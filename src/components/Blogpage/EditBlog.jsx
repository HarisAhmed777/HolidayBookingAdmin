import React, { useContext, useState } from "react";
import axios from "axios";
import Header from "../header/header";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarContext } from "../../context/SidebarContext";
import styles from './blogpage.module.css';
import { baseUrl } from '../../baseUrl';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import HardBreak from '@tiptap/extension-hard-break'; 
import { ListOrdered, ListCollapse } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditPage() {
  const { isSidebarVisible } = useContext(SidebarContext);
  const { state } = useLocation(); // Get blog data from state
  const { blog } = state;
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [blogImage, setBlogImage] = useState(blog.image);  
  const [blogTitle, setBlogTitle] = useState(blog.title);
  const [uploadedAt, setUploadedAt] = useState(blog.uploadedAt);
  console.log(blogImage);
  // Initialize TipTap editor with the pre-filled content
  const editorConfig = {
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }), 
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      HardBreak,
    ],
    content: '', // We'll set the content dynamically for each paragraph
  };

  const firstParaEditor = useEditor({
    ...editorConfig,
    content: blog.firstpara, // Set the initial content for first paragraph
  });

  // const secondParaEditor = useEditor({
  //   ...editorConfig,
  //   content: blog.secondpara, // Set the initial content for second paragraph
  // });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setBlogImage(URL.createObjectURL(file)); // Update the image preview when a new image is selected
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", blogTitle);
    formData.append("firstpara", firstParaEditor.getHTML());
    // formData.append("secondpara", secondParaEditor.getHTML());

    try {
      await axios.put(`${baseUrl}/updateblog/${blog._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Blog updated successfully");
      navigate("/starholadmin/allblogs");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const renderMenuBar = (editor) => {
    if (!editor) return null;

    return (
      <div className={`${styles.toolbar} ms-3`}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? styles.active : ''}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? styles.active : ''}
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? styles.active : ''}
        >
          <ListCollapse />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? styles.active : ''}
        >
          <ListOrdered />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}
        >
          H1
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Break
        </button>
      </div>
    );
  };

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
        <div className={styles.overflow}>
          <h2 className="mb-2 ms-3">Edit Blog</h2>
          <input
            type="text"
            className={styles.newinput}
            placeholder="Edit Title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />

          <div className="form-group">
            <label className={`${styles.label} ms-3 mb-2 fw-bold`}>First Paragraph</label>
            {renderMenuBar(firstParaEditor)}
            <EditorContent editor={firstParaEditor} className={`form-control ms-3 ${styles.inputte}`} />
          </div>

       

          {/* <div className="form-group">
            <label className={`${styles.label} d-block fw-bold ms-3 mb-2`}>Upload Image</label>
            <input
              type="file"
              className="form-control-file ms-3 mb-2"
              onChange={(event) => setSelectedImage(event.target.files[0])}
            />
            {selectedImage && (
              <div className="mt-3">
                <img
                  alt="not found"
                  className="ms-3 mb-2"
                  src={URL.createObjectURL(selectedImage)}
                  height="300px"
                  width="500px"
                />
                <br />
                <button className="btn btn-danger ms-3" onClick={() => setSelectedImage(null)}>
                  Remove
                </button>
              </div>
            )}
          </div> */}
   <div className="form-group">
  <label className={`${styles.label} d-block fw-bold ms-3 mb-2`}>Upload Image</label>
  <input
    type="file"
    className="form-control-file ms-3 mb-2"
    onChange={handleImageChange} // Handle image change
  />
  
  {/* Display either the selected image or the initial blog image */}
  {(selectedImage || blogImage) && (
    <div className="mt-3">
      <img
        alt="Preview not available"
        className="ms-3 mb-2"
        src={selectedImage ? URL.createObjectURL(selectedImage) : `${baseUrl}/${blogImage}`} // Display selected or initial image
        style={{
          height: 'auto',
          maxHeight: '300px',
          maxWidth: '100%',
          display: 'block',
          objectFit: 'contain'
        }}
      />
      <br />
      <button
        className="btn btn-danger ms-3"
        onClick={() => {
          setSelectedImage(null);
          setBlogImage(null); // Clear both selectedImage and blogImage
        }}
      >
        Remove
      </button>
    </div>
  )}
</div>

          <button className="btn btn-primary ms-3 mt-2 mb-2" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
