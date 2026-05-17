import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getPostById, updatePost } from '../services/api';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await getPostById(id);
      setFormData({
        title: data.title,
        body: data.body
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load post for editing');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Content is required';
    } else if (formData.body.length < 10) {
      newErrors.body = 'Content must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const updatedPost = {
        id: parseInt(id),
        title: formData.title,
        body: formData.body,
        userId: 1
      };
      
      await updatePost(id, updatedPost);
      toast.success('✏️ Post updated successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to update post: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Post</Alert.Heading>
          <p>{error}</p>
          <Button onClick={() => navigate('/')} variant="primary">
            Back to Posts
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
      
      <Card className="shadow-lg mx-auto border-0" style={{ maxWidth: '700px' }}>
        <Card.Header className="bg-warning text-dark">
          <h3 className="mb-0">✏️ Edit Post #{id}</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Enter post content"
                rows={6}
                isInvalid={!!errors.body}
              />
              <Form.Control.Feedback type="invalid">
                {errors.body}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="warning"
                disabled={submitting}
              >
                {submitting ? 'Updating...' : '💾 Update Post'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdatePost;