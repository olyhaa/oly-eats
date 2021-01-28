/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PAGE_ROUTES } from 'utils/pageConstants';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <Redirect to={`/${PAGE_ROUTES.ERROR_PAGE}`} />;
    }

    return children;
  }
}

export default ErrorBoundary;
