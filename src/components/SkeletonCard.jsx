import React from 'react';
import { Card, Col } from 'react-bootstrap';

const SkeletonCard = () => {
  return (
    <Col md={6} lg={4}>
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <div className="skeleton-title mb-3"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text w-75"></div>
          <div className="d-flex justify-content-between mt-4">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SkeletonCard;