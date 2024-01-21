import Link from "next/link";
import React from "react";

const Blogs = () => {
  return (
    <div>
      <Link href="blog/post-1">Post -1</Link>
      <div>
        <Link href="blog/post-2">Post -2</Link>
      </div>
    </div>
  );
};

export default Blogs;
