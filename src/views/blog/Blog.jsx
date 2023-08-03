// import React, { useEffect, useState } from "react";
// import { Container, Image } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
// import BlogLike from "../../components/likes/BlogLike";
// import posts from "../../data/posts.json";
// import "./styles.css";


// const Blog = props => {
//   const [blog, setBlog] = useState({});
//   const [loading, setLoading] = useState(true);
//   const params = useParams();
//   const navigate = useNavigate();
//   useEffect(() => {
//     const { id } = params;
//     const blog = posts.find(post => post._id.toString() === id);

//     if (blog) {
//       setBlog(blog);
//       setLoading(false);
//     } else {
//       navigate("/404");
//     }
//   }, [ params, navigate]);

//   if (loading) {
//     return <div>loading</div>;
//   } else {
//     return (
//       <div className="blog-details-root">
//         <Container>
//           <Image className="blog-details-cover" src={blog.cover} fluid />
//           <h1 className="blog-details-title">{blog.title}</h1>

//           <div className="blog-details-container">
//             <div className="blog-details-author">
//               <BlogAuthor {...blog.author} />
//             </div>
//             <div className="blog-details-info">
//               <div>{blog.createdAt}</div>
//               <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
//               <div
//                 style={{
//                   marginTop: 20,
//                 }}
//               >
//                 <BlogLike defaultLikes={["123"]} onChange={console.log} />
//               </div>
//             </div>
//           </div>

//           <div
//             dangerouslySetInnerHTML={{
//               __html: blog.content,
//             }}
//           ></div>
//         </Container>
//       </div>
//     );
//   }
// };

// export default Blog;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { BlogDetail } from '../../reducers/apiSlice';



const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);

  const blogDetailData = useSelector((state) => state.blog.Detail);
  useEffect(() => {
    // Chiamata all'azione Blog con l'ID del blog
    dispatch(BlogDetail(id));
  }, [dispatch, id]);




  return (
    <div>
      {blogDetailData && (
        <div key={blogDetailData._id}>
          <img src={blogDetailData.cover} alt="" />
          <h1>{blogDetailData.title}</h1>
          <h6>{blogDetailData.content}</h6>
          <p>{blogDetailData.email}</p>


        </div>


      )}

    </div>
  )


}

export default Blog



