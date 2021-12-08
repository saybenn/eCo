import React from "react";
import { Card } from "react-bootstrap";

const BlogPost = ({ blog }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">
          {`${blog.author} - ${blog.date}`}
        </Card.Subtitle>
        <Card.Text>{blog.body}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BlogPost;
