import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  display: block;
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;

  td,
  th {
    padding: 6px 13px;
    border: 1px solid #e9e9e9;
  }

  tr {
    background-color: #fff;
    border-top: 1px solid #e9e9e9;
  }

  tr:nth-child(2n) {
    background-color: #f3f7ff;
  }
`;

export default Table;
