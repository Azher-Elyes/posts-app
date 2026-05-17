import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Stats = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  const totalPosts = posts.length;
  const avgTitleLength = Math.round(posts.reduce((acc, post) => acc + post.title.length, 0) / totalPosts);
  const longestPost = posts.reduce((max, post) => post.body.length > max.body.length ? post : max, posts[0]);
  const wordCount = posts.reduce((acc, post) => acc + post.body.split(' ').length, 0);
  const totalCharacters = posts.reduce((acc, post) => acc + post.body.length, 0);

  return (
    <Row className="mb-4 g-3">
      <Col md={3} sm={6}>
        <Card className="text-center border-0 shadow-sm">
          <Card.Body>
            <h2 className="display-4 text-primary mb-0">{totalPosts}</h2>
            <p className="text-muted mb-0">Total Posts</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6}>
        <Card className="text-center border-0 shadow-sm">
          <Card.Body>
            <h2 className="display-4 text-success mb-0">{avgTitleLength}</h2>
            <p className="text-muted mb-0">Avg Title Length</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6}>
        <Card className="text-center border-0 shadow-sm">
          <Card.Body>
            <h2 className="display-4 text-info mb-0">{wordCount.toLocaleString()}</h2>
            <p className="text-muted mb-0">Total Words</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6}>
        <Card className="text-center border-0 shadow-sm">
          <Card.Body>
            <h2 className="display-4 text-warning mb-0">{totalCharacters.toLocaleString()}</h2>
            <p className="text-muted mb-0">Total Characters</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;