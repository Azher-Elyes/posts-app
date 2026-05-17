import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const Post = ({ post, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title className="text-primary mb-3">
          {post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title}
        </Card.Title>
        <Card.Text className="text-muted">
          {post.body.length > 100 ? post.body.substring(0, 100) + '...' : post.body}
        </Card.Text>
        <div className="d-flex justify-content-between mt-3">
          <Button 
            variant="info" 
            size="sm" 
            onClick={() => navigate(`/posts/${post.id}`)}
            className="me-2"
          >
            📖 Details
          </Button>
          <Button 
            variant="warning" 
            size="sm" 
            onClick={() => navigate(`/edit/${post.id}`)}
            className="me-2"
          >
            ✏️ Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(post.id)}
          >
            🗑️ Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;