import { useEffect, useState } from 'react';
import { compareAsc, format } from "date-fns";
import { Link } from 'react-router-dom';

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/post')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {posts.map((post, index) => (
          <>
          
          <div className="col-md-4 mb-4" key={index}>
          <Link className='text-decoration-none shadow-md' to={`/inner-post/${post._id}`}>
          <div className="card bg-white shadow-md rounded-lg  h-64">
              <img 
                src={'http://localhost:3000/'+ post.file} // Adjust this according to your file URL
                className="card-img-top" 
                alt={post.title} 
                style={{ height: '300px', objectFit: 'cover' }} // Fixed image size with responsive behavior
              />
              <div className="card-body">
                <h5 className="card-title  font-bold ">{post.title}</h5>
                <p className="card-text "><small className=" ">{format(new Date(2021, 1, 11), "yyyy-MM-dd")
                }</small></p>
                <p className="card-subtitle mb-2 text-muted">{post.summary}</p>
                
              </div>
            </div>
            </Link>
          </div>
         
         
          </>
         
        ))}
      </div>
    </div>
  );
};

export default Post;