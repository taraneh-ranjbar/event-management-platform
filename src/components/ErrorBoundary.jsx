import React from "react";

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "Error Boundary caught:",
      error,
      errorInfo
    );
  }

  render() {

    if (this.state.hasError) {

      return (
        <div className="error-fallback">
          <div className="error-fallback__icon" aria-hidden="true">
            ⚠️
          </div>
          <h1 className="error-fallback__title">
            Something went wrong.
          </h1>
          <p className="error-fallback__text">
            Please refresh the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
