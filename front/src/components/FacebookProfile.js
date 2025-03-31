import React, { useEffect, useState } from "react";
import "./FacebookProfile.css";
import axios from 'axios';

export default function FacebookProfile() {
  const [postContent, setPostContent] = useState('');
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = "user1";
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/user/${userId}`);
      setPostList(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmitPost = async () => {
    if (!postContent.trim()) return;

    try {
      const newPost = {
        userId,
        content: postContent,
      };

      const response = await axios.post('http://localhost:5000/api/posts', newPost);
      
      // Atualiza a lista de posts com o novo post
      setPostList([response.data, ...postList]);
      setPostContent('');
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  };

  return (
    <div className="facebook-profile">
      {/* Cover Photo */}
      <div className="cover-photo">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80"
          alt="Cover"
        />
        <div className="profile-info">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-name">John Doe</div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <div>Posts</div>
        <div>About</div>
        <div>Friends</div>
        <div>Photos</div>
        <div>More</div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Left Column */}
        <div className="left-column">
          <div className="intro-box">
            <h2>Intro</h2>
            <p>Web Developer at XYZ Company</p>
            <p>Lives in San Francisco, CA</p>
            <p>From New York, NY</p>
          </div>
          <div className="photos-box">
            <h2>Photos</h2>
            <div className="photo-grid">
              <img src="https://source.unsplash.com/random/100x100?sig=1" alt="Photo1" />
              <img src="https://source.unsplash.com/random/100x100?sig=2" alt="Photo2" />
              <img src="https://source.unsplash.com/random/100x100?sig=3" alt="Photo3" />
              <img src="https://source.unsplash.com/random/100x100?sig=4" alt="Photo4" />
              <img src="https://source.unsplash.com/random/100x100?sig=5" alt="Photo5" />
              <img src="https://source.unsplash.com/random/100x100?sig=6" alt="Photo6" />
            </div>
          </div>
        </div>

        {/* Right Column - Posts */}
        <div className="right-column">
          <div className="post-box">
            <textarea 
              placeholder="What's on your mind, John?" 
              onChange={handlePostChange} 
              value={postContent}
            />
            <button onClick={handleSubmitPost}>Post</button>
          </div>

          <div className="posts">
            {isLoading ? (
              <div>Loading posts...</div>
            ) : (
              postList.map((post) => (
                <div className="post" key={post.id}>
                  <div className="post-header">
                    <div>
                      <div className="user-name">John Doe</div>
                      <div className="post-time">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p>{post.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}