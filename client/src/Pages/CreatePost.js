import { Input, Upload, Button } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js'; // Import Froala Editor JavaScript
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Import Froala Editor CSS
import 'froala-editor/css/froala_style.min.css'; // Import Froala Editor Styles
import FroalaEditor from 'react-froala-wysiwyg';
import "./Pages.css"

const CreatePost = () => {

  const Navigate = useNavigate()
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [postDetails, setPostDetails] = useState({
    title: "",
    summary: "",
    content: "",
    author: username,
    imageURL: ""
  })

  const handleDetails = (e) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
  }
  const handleModelChange = (model) => {
    setPostDetails({ ...postDetails, content: model });

  };
  const handleSubmit = async () => {
    //     setImageUrl(response.data.url);

    if (postDetails.title && postDetails.summary && postDetails.content && postDetails.imageURL) {
      console.log(postDetails)
      try {
        console.log(postDetails)
        const res = await axios.post('http://localhost:9000/api/v1/post', postDetails)
        // console.log(res.data.message)
        alert(res.data.message)
        Navigate("/")


      } catch (error) {
        console.error('Error: ', error);
      }
    } else {
      console.log("ERROR")
    }
  };

  const [image, setImage] = useState(null);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:9000/api/v1/upload', formData);
      console.log('Image URL:', response.data.url);
      setPostDetails({ ...postDetails, imageURL: response.data.url })
      // console.log(postDetails)
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  }
  var config = {
    pluginsEnabled: ['charCounter'],
    charCounterCount: true,
    charCounterMax: 140,
  };
  return (
    <>

      <div>
        <h1>Create a New Post</h1>
        <main>
          <div className='edit-area'>
            <form onSubmit={(e) => { e.preventDefault() }}>

              <Input onChange={handleDetails} name="title" value={postDetails.title} className='title' placeholder="Title Here" showCount maxLength={80} /><br /><br />
              <Input onChange={handleDetails} name="summary" value={postDetails.summary} className='title' placeholder="Summary Here" showCount maxLength={250} /><br /><br />

              <label for="images" class="drop-container" id="dropcontainer">
                <span class="drop-title">Drop files here</span>
                or
                <input type="file" onChange={handleImage} id="images" accept="image/*" required />
              </label>
              <br /><br />
              <FroalaEditor
                config={{
                  pluginsEnabled: ['charCounter'],
                  charCounterCount: true,
                  charCounterMax: 15
                }}
                model={postDetails.content}
                onModelChange={handleModelChange}
              />

              <br />

              <Button type="primary"><input type="submit" onClick={handleSubmit} /></Button>


            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export default CreatePost