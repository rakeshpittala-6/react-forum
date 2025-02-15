import React, { useState } from "react";
import "./App.css";

const DiscussionForum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addPost = () => {
    if (title.trim() && description.trim()) {
      const newPost = {
        id: Date.now(),
        title,
        description,
        comments: [],
        expanded: false,
        likes: 0,
        liked: false,
        timestamp: new Date()
      };
      setPosts([newPost, ...posts]);
      setTitle("");
      setDescription("");
      setShowForm(false);
    }
  };

  const toggleExpand = (id) => {
    setPosts(posts.map((post) =>
      post.id === id ? { ...post, expanded: !post.expanded } : post
    ));
  };

  const addComment = (postId, comment) => {
    if (comment.trim()) {
      setPosts(posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [{ id: Date.now(), text: comment }, ...post.comments] }
          : post
      ));
    }
  };

  const toggleLike = (id) => {
    setPosts(posts.map((post) =>
      post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  const timeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} sec ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hr ago`;
  };

  return (
    <div className="container">
      <button className="add-post-btn" onClick={() => setShowForm(!showForm)}>+Add Post</button>
      {showForm && (
        <div className="post-form">
          <input
            className="input-field"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br />
          <textarea
            className="textarea-field"
            placeholder="Post Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /><br />
          <button className="create-btn" onClick={addPost}>create post</button>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="post">
          <div onClick={() => toggleExpand(post.id)} className="post-header">
            <h2>{post.title}</h2>
            <span className="timestamp">{timeAgo(post.timestamp)}</span>
          </div>
          {post.expanded && (
            <>
            <hr></hr>
              <p className="post-description">{post.description}</p>
              <div className="post-actions">
                <button className="like-btn" onClick={() => toggleLike(post.id)}>
                {post.liked ?<i class="fa-solid fa-heart" style={{color:"red"}}></i> : <i class="fa-regular fa-heart"></i>} {post.likes}
                </button>
                <span className="comment-count">{post.comments.length} Comments</span>
              </div>
              <div className="comment-section">
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addComment(post.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
              <div className="comments-section">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="comment">{comment.text}</div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DiscussionForum;
