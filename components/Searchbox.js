import React, { useContext, useState, useEffect, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useDebounce } from 'use-debounce';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText
} from '@reach/combobox';
// import Hotkeys from 'react-hot-keys';

import { device } from '../utils/devices';
import { authFetch } from '../utils/http';
import Router from 'next/router';
import { TeamContext } from './TeamContext';

const CustomCombobox = styled(Combobox)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-radius: 5px;
  background: rgba(230, 230, 230, 0.2);

  input {
    width: 100%;
    height: 40px;
    padding: 6px 0px 6px 42px;
    border: none;
    background: transparent;
    outline: none;
    // color: ${props => props.theme.header.fontColor};
    font-size: 16px;

    ::placeholder {
      // color: ${props => props.theme.header.fontColor};
      opacity: 0.8;
    }
  }

  svg {
    position: absolute;
    left: 7px;
    fill: ${props => props.theme.fontColor};
    opacity: 0.8;
  }

  @media screen and ${device.large} {
    width: 90%;
  }
`;

const CustomComboboxPopover = styled(ComboboxPopover)`
  margin-top: 8px;
  border: none;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
  z-index: 2;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  @media screen and ${device.maxSmall} {
    width: 98% !important;
    left: 1% !important;
  }

  ul {
    padding: 0 0;
    list-style: none;
  }
`;

const CustomComboboxOption = styled(ComboboxOption)`
  padding: 8px 16px;
`;

const CustomComboboxOptionHits = styled.p`
  margin: 8px 0;
  opacity: 0.5;
`;

const Shotcut = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  // border: 1px solid ${props => props.theme.header.fontColor};
  // color: ${props => props.theme.header.fontColor};
  text-align: center;
  border-radius: 3px;
  opacity: 0.3;
`;

function SearchBox({ repos, repo, fileContent, pageConfig }) {
  const team = useContext(TeamContext);
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [value] = useDebounce(searchTerm, 300);

  let searchInput = { teamId: team.teamId, search: value };
  if (repo && repo.refs) {
    searchInput['repo'] = repo.repo;
    searchInput['refs'] = repo.refs.map(refInfo => refInfo.ref);
  } else if (repos) {
    searchInput['refs'] = repos
      .filter(repo => repo.refs)
      .flatMap(repo => repo.refs)
      .map(refInfo => refInfo.ref);
  }

  let searchItems = [];

  if (
    searchTerm &&
    pageConfig &&
    pageConfig.sidebar &&
    (!searchItems || searchItems.length === 0)
  ) {
    searchItems = pageConfig.sidebar
      .filter(info => info.items)
      .flatMap(info => info.items)
      .filter(info =>
        info.label.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .map(info => ({
        label: info.label,
        repo: `${repo.repo}/${info.href}`,
        path: info.href,
        highlights: [{ path: 'content', texts: [{ value: ' ' }] }]
      }));
  }

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleShortcut = () => {
    inputRef.current.focus();
  };

  const handleSelection = value => {
    let [, ...params] = value.split('/');

    let item = searchItems.find(
      searchItem => searchItem.path === `${params.join('/')}.md`
    );

    let doc = repo || repos.find(repo => repo.url === item.repo);
    params = params.filter(p => p !== 'README.md');

    let finalParams = doc.slug;
    if (params.length > 0) {
      finalParams = `${finalParams}/${params.join('/').replace(/\.md/g, '')}`;
      if (!doc.public) finalParams = `private/${finalParams}`;
    }

    Router.push('/[team]/[...args]', `/${team.teamId}/${finalParams}`);
  };

  return (
    // <Hotkeys keyName="/" onKeyUp={handleShortcut}>
    <CustomCombobox aria-label="Documents" onSelect={handleSelection}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          // stroke="#fff"
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
      <ComboboxInput
        placeholder="Search the docs"
        className="search-input"
        ref={inputRef}
        onChange={handleSearchTermChange}
      />
      <Shotcut>/</Shotcut>
      {searchItems && searchItems.length > 0 && (
        <CustomComboboxPopover className="shadow-popup dark:!bg-gray-700 dark:!text-gray-300">
          {/* {searchItems.length > 0 ? ( */}
          <ComboboxList>
            {searchItems &&
              searchItems.length > 0 &&
              searchItems.map(item => {
                let highlight = item.highlights.find(
                  h => h.path === 'content'
                ) || { texts: [{ type: 'text', value: '' }] };

                let hits = highlight.texts
                  .map((text, i) =>
                    text.type === 'hit'
                      ? `<strong key=${i}>${text.value}</strong>`
                      : text.value
                  )
                  .join(' ');

                if (hits.length === 0) hits = item.content;

                let length = 250;

                hits =
                  hits.length > length
                    ? `${hits.substring(0, length)}...`
                    : hits;
                const [, , , , project, ...others] = item.repo.split('/');

                return (
                  <CustomComboboxOption
                    key={`${project}/${item.path}`}
                    value={`${project}/${item.path.replace('.md', '')}`}
                    className="dark:hover:!bg-gray-600"
                  >
                    {/* <ComboboxOptionText /> */}
                    <span className="text-lg font-medium">
                      {item.path.replace('.md', '')}
                    </span>
                    <br />
                    <CustomComboboxOptionHits
                      dangerouslySetInnerHTML={{ __html: hits }}
                    />
                  </CustomComboboxOption>
                );
              })}
          </ComboboxList>
          {/* // ) : ( //{' '}
          <span style={{ display: 'block', margin: 8 }}>
            // No results found //{' '}
          </span>
          // )} */}
        </CustomComboboxPopover>
      )}
    </CustomCombobox>
    // </Hotkeys>
  );
}

export default SearchBox;
