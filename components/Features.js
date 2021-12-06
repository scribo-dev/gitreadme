import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { device } from '../utils/devices';
import ImageFallback from './ImageFallback';
import { TeamContext } from './TeamContext';

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-row-gap: ${props => props.theme.gridGap || '32px'};
  row-gap: ${props => props.theme.gridGap || '32px'};
  grid-column-gap: ${props => props.theme.gridGap || '32px'};
  column-gap: ${props => props.theme.gridGap || '32px'};
  padding-top: 64px;
  padding-bottom: 64px;
  text-align: center;

  @media screen and ${device.medium} {
    grid-template-columns: repeat(
      ${props => props.theme.gridColumns || 3},
      minmax(0, 1fr)
    );
  }
`;

const FeatureItem = styled.div`
  text-align: ${props => props?.textAlign};
`;

export function Features() {
  const team = useContext(TeamContext);
  const theme = useContext(ThemeContext);

  return (
    <div id="features" className="dark:!bg-gray-900">
      <div className="w-full max-w-8xl mx-auto px-2 sm:px-3 xl:px-5 pt-12 dark:!bg-gray-900 text-gray-700 dark:text-gray-300">
        {theme?.title && (
          <h3 className="text-3xl text-center ">{theme?.title}</h3>
        )}
        {theme?.subTitle && (
          <span className="block text-lg text-center ">{theme?.subTitle}</span>
        )}
        <FeatureGrid>
          {theme?.items &&
            theme?.items.map(feature => (
              <FeatureItem key={feature.title} {...feature}>
                {feature.image && (
                  <div
                    className="flex items-center justify-center mb-8 overflow-hidden cursor-pointer relative"
                    style={{ height: '300px' }}
                  >
                    <ImageFallback teamId={team.teamId} src={feature.image} />
                  </div>
                )}
                {feature.title && (
                  <h2 className="font-medium text-xl">{feature.title}</h2>
                )}
                {feature.subTitle && (
                  <span className="text-lg">{feature.subTitle}</span>
                )}
                {feature.description && (
                  <p className="text-base ">{feature.description}</p>
                )}
              </FeatureItem>
            ))}
        </FeatureGrid>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Features;
