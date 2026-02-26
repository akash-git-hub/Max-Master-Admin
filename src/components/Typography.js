import React from 'react';
import PropTypes from 'prop-types';

export const Typography = ({ variant, children, color, size, className }) => {
  const Tag = variant || 'p'; // Default to <p> if no variant is provided

  const styles = {
    color: color || 'inherit',  // Set color from props or inherit
    ...(size && { fontSize: size }) // Set font size from props or inherit
  };

  return (
    <Tag className={className} style={styles}>
      {children}
    </Tag>
  );
};

// Prop Types
Typography.propTypes = {
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  // children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
}; 