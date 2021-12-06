import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import Container from './ContainerFixed';
import Logo from './Logo';
import { TeamContext } from './TeamContext';

const FooterContainer = styled.div`
  padding-top: 32px;
  padding: 32px 0;
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.fontColor};

  a {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    text-decoration: none;
  }

  a:hover {
    color: ${props => props.theme.fontColor};
    text-decoration: none;
    opacity: 1;
  }

  img {
    max-width: 150px;
  }
`;

export function Footer() {
  const theme = useContext(ThemeContext);
  const team = useContext(TeamContext);
  return (
    <FooterContainer className="dark:!bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="w-full max-w-8xl mx-auto px-2 sm:px-3 xl:px-5">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-3">
          <div>
            {theme && theme.image ? (
              <img
                alt={`${team.name} footer logo`}
                src={`${process.env.CDN}/${team.teamId}/public/templates/${theme.image}`}
              />
            ) : (
              <h5 className="text-xl">{theme.title || team.name}</h5>
            )}
          </div>
          {theme.items &&
            theme.items.map((item, i) => (
              <div className="flex flex-col" key={item.title + i}>
                <h6 className="font-medium">{item.title}</h6>
                <ul className="list-none p-0">
                  {item.items &&
                    item.items.map(link => (
                      <li key={link.name} className="list-none py-2 m-0">
                        <a
                          href={link.href}
                          className="dark:!text-gray-300 dark:hover:!text-gray-100"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
        <div className="flex justify-center text-xs border-t border-gray-500 mt-8 pt-2 opacity-75">
          <p>
            Powered by{' '}
            <a
              href="https://gitread.me"
              target="_blank"
              className="dark:!text-gray-300 dark:hover:!text-gray-100 underline"
            >
              GitREAD
            </a>
          </p>
        </div>
      </div>
    </FooterContainer>
  );
}

export default Footer;
