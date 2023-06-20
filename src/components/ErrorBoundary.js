import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  // eslint-disable-next-line
  const handleCatch = (error, errorInfo) => {
    // You can log the error to an error reporting service
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    setHasError(true);
  };

  if (hasError) {
    // Render custom error UI
    return <div>Oops! Something went wrong.</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;