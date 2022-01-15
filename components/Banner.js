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
        <div
          className={`flex w-full max-w-8xl mx-auto px-1 sm:px-3 xl:px-5 dark:!text-gray-300 ${
            team.github ? 'max-w-[500px] justify-center' : ''
          }`}
        >
          <h1 className="dark:text-gray-100">{theme.title}</h1>
          <p className="mt-2">{theme.description}</p>
          <div className="mt-4">
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
      {team.github && (
        <>
          <svg
            className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200 dark:text-gray-600"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
            />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200 dark:text-gray-600"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
            />
          </svg>
        </>
      )}
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
