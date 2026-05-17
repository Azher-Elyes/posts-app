import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getPostById } from '../services/api';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await getPostById(id);
      setPost(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPost(null);
      toast.error('Failed to load post details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>📄 Post Does Not Exist</Alert.Heading>
          <p>The post you're looking for could not be found.</p>
          <Button onClick={() => navigate('/')} variant="primary">
            ← Back to Posts
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button 
        variant="secondary" 
        onClick={() => navigate('/')}
        className="mb-4 shadow-sm"
      >
        ← Back to Posts
      </Button>
      
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white">
          <h2 className="mb-0">📖 Post Details</h2>
        </Card.Header>
        <Card.Body>
          <h3 className="text-primary mb-4">{post.title}</h3>
          <p className="lead" style={{ lineHeight: '1.8' }}>{post.body}</p>
          <hr />
          <div className="text-muted">
            <small>Post ID: {post.id} | User ID: {post.userId}</small>
          </div>
        </Card.Body>
        <Card.Footer className="bg-light">
          <div className="d-flex justify-content-end gap-2">
            <Button 
              variant="warning" 
              onClick={() => navigate(`/edit/${post.id}`)}
            >
              ✏️ Edit Post
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/')}
            >
              View All Posts
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default PostDetails;