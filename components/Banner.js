import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { device } from '../utils/devices';
import Container from './ContainerFixed';
import ImageFallback from './ImageFallback';
import { TeamContext } from './TeamContext';

const BannerBg = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 64px 0;
  min-height: 400px;
  background: ${props => props.theme.backgroundColor};
  border-bottom: 1px solid rgba(229, 231, 235, 0.4);
  overflow: hidden;
  text-align: center;
  @media screen and ${device.medium} {
    text-align: left;
  }
`;

const BannerImage = styled.div`
  display: none;
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;

  @media screen and ${device.medium} {
    display: inherit;
  }
`;

const BannerContainer = styled.div`
  flex: 1;
  color: ${props => props.theme.fontColor};

  h1 {
    font-size: 32px;
  }
`;

const BannerButton = styled.a`
  display: inline-block;
  padding: 8px 32px;
  margin-top: 16px;
  margin-right: 16px;
  // background: ${props => props.theme.header.fontColor};
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  font-weight: 500;
  text-decoration: none;
`;

const MainBannerButton = styled(BannerButton)`
  background: ${props => props.theme.mainButtonBackground};
  color: ${props => props.theme.mainButtonFontColor};
`;

const SecondBannerButton = styled(BannerButton)`
  background: ${props => props.theme.secondButtonBackground};
  color: ${props => props.theme.secondButtonFontColor};
`;

export function Banner() {
  const team = useContext(TeamContext);
  const theme = useContext(ThemeContext);

  return (
    <BannerBg id="banner" className="dark:!bg-gray-900 ">
      <BannerContainer>
        <div className="w-full max-w-8xl mx-auto px-1 sm:px-3 xl:px-5 dark:!text-gray-300">
          <h1>{theme.title}</h1>
          <p>{theme.description}</p>
          <div>
            {theme.mainButtonLabel && (
              <MainBannerButton href={theme.mainButtonHref}>
                {theme.mainButtonLabel}
              </MainBannerButton>
            )}
            {theme.secondButtonLabel && (
              <SecondBannerButton href={theme.secondButtonHref}>
                {theme.secondButtonLabel}
              </SecondBannerButton>
            )}
          </div>
        </div>
      </BannerContainer>
      {theme.image && (
        <BannerImage>
          <ImageFallback
            objectFit="cover"
            className="rounded-full w-[100px] h-[100px]"
            teamId={team.teamId}
            src={theme.image}
          />
        </BannerImage>
      )}
      {/* <BannerImage /> */}
    </BannerBg>
  );
}

export default Banner;
