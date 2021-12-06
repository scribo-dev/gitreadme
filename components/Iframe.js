import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Container from './ContainerFixed';
import { TeamContext } from './TeamContext';

const IframeBannerContainer = styled.div`
  display: ${props => (props.theme ? 'inherit' : 'none')};
  padding: 32px 0 16px 0;
  background-color: ${props => props.theme?.backgroundColor};
`;

const IframeBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;

  iframe {
    border-radius: 5px;
    overflow: hidden;
  }
`;

export function Iframe() {
  const team = useContext(TeamContext);
  const theme = useContext(ThemeContext);

  return (
    <IframeBannerContainer id="embed" className="dark:!bg-gray-900">
      <Container>
        {theme?.title && (
          <h3 className="text-3xl text-center text-gray-700">{theme?.title}</h3>
        )}
        {theme?.subTitle && (
          <span className="text-lg block text-center text-gray-500">
            {theme?.subTitle}
          </span>
        )}
        {theme?.iframe && (
          <IframeBg
            dangerouslySetInnerHTML={{
              __html: theme.iframe
            }}
          />
        )}
      </Container>
    </IframeBannerContainer>
  );
}

export default Iframe;
