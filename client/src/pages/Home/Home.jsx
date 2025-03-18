import React  from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Home() {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const posts = [
    {
      id:1,
      title:"Testing text Dummy data",
      desc:"More testing",
      img:"https://images.pexels.com/photos/31189918/pexels-photo-31189918/free-photo-of-elderly-man-walking-by-elegant-wooden-door.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id:2,
      title:"Testing text Dummy data2",
      desc:"More testing2",
      img:"https://images.pexels.com/photos/31189918/pexels-photo-31189918/free-photo-of-elderly-man-walking-by-elegant-wooden-door.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ]
  

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map(post=>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.desc}</p>
                <button>Read More</button>
            </div>
          </div>
        ))}

      </div>
        
    </div>
  );
}