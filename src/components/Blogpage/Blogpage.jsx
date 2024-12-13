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

function BlogPage() {
  const { isSidebarVisible } = useContext(SidebarContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [uploadedAt, setUploadedAt] = useState(null);

  // Initialize TipTap editor with needed extensions only
  const editorConfig = {
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }), // Disable redundant list extensions
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),  
      HardBreak,
    ],
    content: '',
  };

  const firstParaEditor = useEditor(editorConfig);
  // const secondParaEditor = useEditor(editorConfig);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", blogTitle);
    formData.append("firstpara", firstParaEditor.getHTML());
    // formData.append("secondpara", secondParaEditor.getHTML());

    try {
      const response = await axios.post(`${baseUrl}/blogpage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedAt(response.data.uploadedAt);
      alert("Blog uploaded Successfully");
      // Reset form fields
      resetForm();
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  const resetForm = () => {
    setBlogTitle("");
    firstParaEditor.commands.clearContent();
    secondParaEditor.commands.clearContent();
    setSelectedImage(null);
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
          <h2 className="mb-2 ms-3">Add Blogs</h2>
          <input
            type="text"
            className={styles.newinput}
            placeholder="Add Title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />

          <div className="form-group">
            <label className={`${styles.label} ms-3 mb-2 fw-bold`}>First Paragraph</label>
            {renderMenuBar(firstParaEditor)}
            <EditorContent editor={firstParaEditor} className={`form-control ms-3 ${styles.inputte}`} />
          </div>

          {/* <div className="form-group">
            <label className={`${styles.label} ms-3 mb-2 fw-bold`}>Second Paragraph</label>
            {renderMenuBar(secondParaEditor)}
            <EditorContent editor={secondParaEditor} className={`form-control ms-3 ${styles.input}`} />
          </div> */}

          <div className="form-group">
            <label className={`${styles.label} d-block fw-bold ms-3 mt-3 mb-3 mb-2`}>Upload Image</label>
            <input
              type="file"
              className="form-control-file ms-3 mb-4"
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
          </div>

          <button className="btn btn-primary ms-3 mt-2 mb-2" onClick={handleSubmit}>Publish</button>
          {uploadedAt && (
            <div className="mt-3 ms-3">
              <p>Uploaded on: {new Date(uploadedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
