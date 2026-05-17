import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addPost } from '../services/api';

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('postDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      const shouldLoad = window.confirm('You have a saved draft from earlier. Would you like to load it?');
      if (shouldLoad) {
        setFormData(draft);
        toast.info('📝 Draft loaded', { autoClose: 2000 });
      } else {
        localStorage.removeItem('postDraft');
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.title || formData.body) {
        localStorage.setItem('postDraft', JSON.stringify(formData));
        toast.info('💾 Draft saved automatically', { autoClose: 2000 });
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Content is required';
    } else if (formData.body.length < 10) {
      newErrors.body = 'Content must be at least 10 characters';
    } else if (formData.body.length > 5000) {
      newErrors.body = 'Content must be less than 5000 characters';
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
      const newPost = {
        title: formData.title,
        body: formData.body,
        userId: Math.floor(Math.random() * 10) + 1
      };
      
      await addPost(newPost);
      localStorage.removeItem('postDraft');
      toast.success('✨ Post created successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to create post: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('postDraft');
    setFormData({ title: '', body: '' });
    toast.info('Draft cleared');
  };

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
        <Card.Header className="bg-success text-white">
          <h3 className="mb-0">✏️ Create New Post</h3>
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
                placeholder="Enter an engaging title..."
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                {formData.title.length}/200 characters
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Write your post content here..."
                rows={6}
                isInvalid={!!errors.body}
              />
              <Form.Control.Feedback type="invalid">
                {errors.body}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                {formData.body.length}/5000 characters
              </Form.Text>
            </Form.Group>

            <Alert variant="info" className="small">
              <strong>💡 Pro tips:</strong>
              <ul className="mb-0 mt-2">
                <li>Use descriptive titles to attract readers</li>
                <li>Break long content into paragraphs</li>
                <li>Your draft is auto-saved every 30 seconds</li>
              </ul>
            </Alert>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={clearDraft}
                type="button"
              >
                Clear Draft
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="success"
                disabled={submitting}
              >
                {submitting ? 'Creating...' : '✨ Publish Post'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPost;