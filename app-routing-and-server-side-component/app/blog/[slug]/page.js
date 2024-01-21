import React from "react";

const BlogPosts = ({ params }) => {
  return (
    <div>
      Nested BlogPosts
      <p>{params.slug}</p>
    </div>
  );
};

export default BlogPosts;
