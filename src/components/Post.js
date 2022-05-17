import React from 'react'
import { useParams } from 'react-router-dom';
const Post = (props) => {
  let params = useParams();  //获取路径参数
  console.log('params', params);
  return <div>Post</div>
}

export default Post;