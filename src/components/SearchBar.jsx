import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="mb-4">
      <InputGroup className="shadow-sm">
        <InputGroup.Text className="bg-white border-end-0">
          🔍
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search posts by title or content..."
          value={searchTerm}
          onChange={handleSearch}
          className="border-start-0"
        />
        {searchTerm && (
          <Button 
            variant="outline-secondary" 
            onClick={clearSearch}
            className="border-start-0"
          >
            ✕
          </Button>
        )}
      </InputGroup>
    </div>
  );
};

export default SearchBar;