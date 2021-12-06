import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { device } from '../utils/devices';
import Container from './ContainerFixed';

const PriceContainer = styled.div`
  padding: 32px 0;
  background: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.fontColor};
`;

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-row-gap: ${props => props.theme.gridGap || '32px'};
  row-gap: ${props => props.theme.gridGap || '32px'};
  grid-column-gap: ${props => props.theme.gridGap || '32px'};
  column-gap: ${props => props.theme.gridGap || '32px'};
  grid-auto-rows: 1fr;
  margin-top: 64px;
  margin-bottom: 64px;
  text-align: center;

  @media screen and ${device.medium} {
    grid-template-columns: repeat(
      ${props => props.theme.gridColumns || 2},
      minmax(0, 1fr)
    );
  }
`;

const PriceItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  // border-radius: 5px;

  ul {
    flex: 1;
    margin-top: 16px;
  }
  svg {
    display: inline;
    margin-right: 8px;
    fill: ${props => props.theme.checkColor};
  }
`;

const PriceButton = styled.a`
  display: inline-block;
  align-self: center;
  padding: 8px 32px;
  margin-top: 16px;
  margin-right: 16px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  font-weight: 500;
  text-decoration: none;
  background: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonFontColor};
  cursor: pointer;

  svg {
    display: inline;
    fill: ${props => props.theme.buttonFontColor};
  }
`;

export function Prices() {
  const theme = useContext(ThemeContext);

  return (
    <PriceContainer>
      <Container>
        {theme?.title && (
          <h3 className="text-3xl text-center text-gray-700">{theme?.title}</h3>
        )}
        {theme?.subTitle && (
          <span className="block text-lg text-center text-gray-500">
            {theme?.subTitle}
          </span>
        )}
        <PriceGrid>
          {theme?.items &&
            theme?.items.map((price, i) => (
              <PriceItem key={price.title + i}>
                <p className="m-0 text-lg text-left">{price.title}</p>
                <p className="m-0 text-left">
                  <b className="text-3xl font-bold">{price.price}</b>{' '}
                  <span>{price.increment}</span>
                </p>
                <ul className="list-none p-0">
                  {price.items &&
                    price.items.map(item => (
                      <li className="py-2 text-left" key={item.name}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                        </svg>
                        {item.name}
                      </li>
                    ))}
                </ul>
                <PriceButton className="no-underline" href={price.linkHref}>
                  <span>{price.linkLabel}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="icon fill-current w-4 h-4 ml-2"
                  >
                    <path
                      d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"
                      className="heroicon-ui"
                    ></path>
                  </svg>
                </PriceButton>
              </PriceItem>
            ))}
        </PriceGrid>
      </Container>
    </PriceContainer>
  );
}

export default Prices;
