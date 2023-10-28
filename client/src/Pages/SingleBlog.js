import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Upload, Button } from "antd";
import axios from 'axios';
import './SinglePage.css';
import 'remixicon/fonts/remixicon.css'
import 'froala-editor/js/froala_editor.pkgd.min.js'; // Import Froala Editor JavaScript
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Import Froala Editor CSS
import 'froala-editor/css/froala_style.min.css'; // Import Froala Editor Styles
import FroalaEditor from 'react-froala-wysiwyg';

function SingleBlog() {
  const Navigate = useNavigate()
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/v1/posts/${postId}`);
        if (response.status === 200) {
          setPostDetails(response.data);
        } else {
          console.error('Error fetching post details:', response.status);
        }

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPost();
  }, [postId]);


  if (!postDetails) {
    return <p>Loading...</p>;
  }
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (confirmed) {
      axios.delete(`http://localhost:9000/api/v1/posts/${postId}`)
        .then((response) => {
          console.log('Post deleted successfully', response);
          alert('Post deleted successfully')
          Navigate("/")
        })
        .catch((error) => {
          console.error('Error deleting post', error);
          alert('Error deleting post')

        });
    }
  };


  const handleValues = async (e) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value })
  }
  const handleSave = async () => {
    try {
      const updatedTitle = postDetails.title;
      const updatedSummary = postDetails.summary;
      const updatedContent = postDetails.content;

      const response = await axios.put(`http://localhost:9000/api/v1/posts/${postId}`, {
        title: updatedTitle,
        summary: updatedSummary,
        content: updatedContent
      });

      if (response.status === 200) {
        console.log('Article updated successfully', response);
      } else {
        console.error('Error updating article:', response.status);
      }

      setEditMode(false);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };


  const EditPost = () => {
    setEditMode(true);
  };

  return (

    <>
      <div className='fullpost'>
        <div className='innerpost'>
          {editMode ? (
            <>
              <Input onChange={handleValues} name="title" value={postDetails.newTitle} className='title' placeholder="Title Here" showCount maxLength={80} /><br /><br />
              <Input onChange={handleValues} name="summary" value={postDetails.newSummary} className='title' placeholder="Summary Here" showCount maxLength={250} />

              <br /><br />
              <br /><br />
              <FroalaEditor
                model={postDetails.content}
                onModelChange={(newContent) => {
                  setPostDetails({ ...postDetails, content: newContent });
                }}
              />
              <br /><br />
              <Button type="primary" onClick={handleSave}>Save</Button>
            </>
          ) : (
            <div className="postwrapper">
              <div className="singlepost">
                <>
                  {username === postDetails.author && (
                    <>
                      <i onClick={EditPost} className="ri-file-edit-line"></i>
                      <i onClick={handleDelete} className="ri-close-circle-line"></i>
                    </>
                  )}
                </>
                <h2>{postDetails.title}</h2>
                <p className='author'>Author: {postDetails.author}</p>
                <img src={`http://localhost:9000${postDetails.imageURL}`} alt="Image" />

                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: postDetails.content }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>

  );
}

export default SingleBlog
