import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import styled, { ThemeContext } from 'styled-components';
import Router from 'next/router';

import { device } from '../utils/devices';
import Container from './ContainerFixed';
import Link from 'next/link';
import { TeamContext } from './TeamContext';
import SearchBox from './Searchbox';

const HeaderBg = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 0px;
  width: 100%;
  color: ${props => props.theme.fontColor};
  background: ${props => props.theme.backgroundColor};
  z-index: 2;

  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const HeaderLogo = styled.a`
  display: block;
  max-width: 200px;
  cursor: pointer;
  text-decoration: none;
  img {
    width: 100%;
    max-width: 100px;
  }

  h1 {
    margin: 0;
    font-weight: inherit;
    color: ${props => props.theme.fontColor};
    font-size: 20px;
  }
`;

const SearchContainer = styled.div`
  display: none;
  @media screen and ${device.medium} {
    display: flex;
    flex: 1;
    margin-left: 24px;
  }
`;

const HeaderMenu = styled.ul`
  display: none;
  @media screen and ${device.medium} {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-left: 0px;
    list-style: none;
    color: ${props => props.theme.fontColor};
    li {
      margin-left: 32px;
    }

    &.header-menus {
      color: ${props => props.theme.fontColor};
    }

    a {
      text-decoration: none;
    }

    a:hover {
      opacity: 0.6;
    }
  }
`;

const HeaderMenuItem = styled.a`
  color: ${props => props.theme.fontColor};
`;

export function Header({
  full = false,
  pageTitle = 'Scribo',
  repos,
  repo,
  fileContent,
  pageConfig,
  onDrawerClick
}) {
  const team = useContext(TeamContext);
  const theme = useContext(ThemeContext);
  const [pageTheme, setPageTheme] = useState('dark');

  const checkTheme = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setPageTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setPageTheme('light');
    }
  };

  useEffect(() => {
    checkTheme();
  }, []);

  return (
    <>
      <HeaderBg className="header h-[56px] dark:!bg-gray-800 dark:!text-white dark:!border-gray-800">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="flex items-center py-[8px] w-full max-w-8xl mx-auto px-2 sm:px-3 xl:px-5">
          <div className="flex relative md:w-60 xl:w-72 flex-1 md:flex-none pl-2">
            {/* <button className="md:hidden mr-2" onClick={() => onDrawerClick()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="currentColor"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button> */}
            <Link href="/[team]" as={`/${team.teamId}`}>
              <HeaderLogo>
                {theme && theme.logoImg ? (
                  <div
                    className={
                      theme.logoImg && theme.logoImg
                        ? 'rounded-full w-[35px] h-[35px] object-cover overflow-hidden'
                        : ''
                    }
                  >
                    <img
                      alt={`${team.name} logo`}
                      src={
                        theme.logoImg.match(/^http|^https/)
                          ? theme.logoImg
                          : `${process.env.CDN}/${team.teamId}/public/templates/${theme.logoImg}`
                      }
                    />
                  </div>
                ) : (
                  <h1>{theme.title || team.name}</h1>
                )}
              </HeaderLogo>
            </Link>
          </div>
          <SearchContainer>
            <SearchBox
              repos={repos}
              repo={repo}
              fileContent={fileContent}
              pageConfig={pageConfig}
            />
          </SearchContainer>
          <ul className="w-48 flex items-center list-none space-x-4 justify-end">
            {/* {theme.menus &&
              theme.menus.map(menu => (
                <li key={menu.label} className="header-menus">
                  <HeaderMenuItem
                    href={menu.href}
                    className="hover:underline cursor-pointer"
                  >
                    {menu.label}
                  </HeaderMenuItem>
                </li>
              ))} */}
            <li>
              <a
                onClick={event => {
                  event.preventDefault();
                  localStorage.setItem(
                    'theme',
                    pageTheme === 'dark' ? 'light' : 'dark'
                  );
                  checkTheme();
                }}
                className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left no-underline cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="currentColor"
                >
                  <rect fill="none" height="24" width="24" />
                  <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
                </svg>
              </a>
            </li>
            <li className="relative ">
              <HeaderMenuItem
                className="no-underline dark:text-gray-100"
                href="/d/dashboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </HeaderMenuItem>
            </li>
          </ul>
        </div>
      </HeaderBg>
    </>
  );
}

export default Header;
