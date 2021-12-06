import React, { useContext } from 'react';
import Head from 'next/head';
import { css, createGlobalStyle, ThemeContext } from 'styled-components';
import { TeamContext } from './TeamContext';

const GlobalStyle = createGlobalStyle`
${props =>
  css`
    ${props.theme.styles}
  `}
`;

export function Global() {
  const team = useContext(TeamContext);
  const theme = useContext(ThemeContext);
  return (
    <>
      <Head>
        <title>{theme.title ? theme.title : team.name}</title>
        {theme.metadataDescription && (
          <meta name="description" content={theme.metadataDescription}></meta>
        )}
      </Head>
      <GlobalStyle />
    </>
  );
}

export default Global;
