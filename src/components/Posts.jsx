import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Post from './Post';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Stats from './Stats';
import SkeletonCard from './SkeletonCard';
import { getAllPosts, deletePost } from '../services/api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
      setFilteredPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    
    if (!term.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.body.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPosts(filtered);
      toast.info(`Found ${filtered.length} posts matching "${term}"`, { autoClose: 2000 });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        toast.success('🗑️ Post deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete post: ' + err.message);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Body', 'User ID'];
    const csvData = filteredPosts.map(post => [
      post.id,
      `"${post.title.replace(/"/g, '""')}"`,
      `"${post.body.replace(/"/g, '""')}"`,
      post.userId
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `posts_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('📊 Data exported successfully!');
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (loading) {
    return (
      <Container className="py-5">
        <Row className="g-4">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Posts</Alert.Heading>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} variant="primary">
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h1 className="text-white mb-0">📝 All Posts</h1>
        <div className="d-flex gap-2">
          <Button variant="info" onClick={exportToCSV} className="shadow-sm">
            📥 Export CSV
          </Button>
          <Button variant="success" onClick={() => navigate('/add')} className="shadow-sm">
            + Add New Post
          </Button>
        </div>
      </div>

      <Stats posts={filteredPosts} />
      
      <SearchBar onSearch={handleSearch} />
      
      {searchTerm && (
        <Alert variant="info" className="mb-3">
          Showing results for: <strong>"{searchTerm}"</strong> ({filteredPosts.length} posts found)
          <Button 
            variant="link" 
            className="float-end" 
            onClick={() => handleSearch('')}
          >
            Clear
          </Button>
        </Alert>
      )}
      
      {filteredPosts.length === 0 ? (
        <Alert variant="warning" className="text-center">
          <Alert.Heading>No posts found</Alert.Heading>
          <p>Try a different search term or create a new post!</p>
          <Button variant="primary" onClick={() => navigate('/add')}>
            Create New Post
          </Button>
        </Alert>
      ) : (
        <>
          <Row className="g-4">
            {currentPosts.map((post) => (
              <Col key={post.id} md={6} lg={4}>
                <Post post={post} onDelete={handleDelete} />
              </Col>
            ))}
          </Row>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          
          <div className="text-center text-white mt-3">
            <small>Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} posts</small>
          </div>
        </>
      )}
    </Container>
  );
};

export default Posts;