/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';

function HTMLViewer({ html }) {
  return (
    <article
      className="markdown-body"
      css={{
        padding: 56
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

if (process.env.NODE_ENV !== 'production') {
  HTMLViewer.propTypes = {
    html: PropTypes.string.isRequired
  };
}

export default HTMLViewer;
