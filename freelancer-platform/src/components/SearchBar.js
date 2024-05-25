import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

function SearchBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!isExpanded) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded]);

  const handleClick = () => {
    if (!isExpanded) {
      setScrollPosition(window.scrollY);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsExpanded(true);
    }
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsExpanded(false);
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`search-bar ${isScrolled ? 'scrolled' : ''} ${isExpanded ? 'expanded' : ''}`}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <input
        type="text"
        placeholder="Search..."
        onClick={handleClick}
        ref={inputRef}
      />
      <button className="search-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}

export default SearchBar;

