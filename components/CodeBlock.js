import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const CodeBlock = ({ language = 'json', value }) => (
  <SyntaxHighlighter
    language={language}
    useInlineStyles={false}
    style={{ color: '#f8f8f2' }}
  >
    {value}
  </SyntaxHighlighter>
);

export default CodeBlock;
