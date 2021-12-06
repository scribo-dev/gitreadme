/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback, Fragment } from 'react';
import Link from 'next/link';

import { device } from '../utils/devices';
import { Transition } from '@headlessui/react';

function DocSidebarItem({
  teamId,
  slug,
  version,
  repoPublic,
  item,
  index,
  subLink,
  onItemClick,
  collapsible,
  onNavigate
}) {
  const { items, href, label, type, active } = item;
  const [collapsed, setCollapsed] = useState(item.collapsed);
  const [prevCollapsedProp, setPreviousCollapsedProp] = useState(null);

  // If the collapsing state from props changed, probably a navigation event
  // occurred. Overwrite the component's collapsed state with the props'
  // collapsed value.
  if (item.collapsed !== prevCollapsedProp) {
    setPreviousCollapsedProp(item.collapsed);
    setCollapsed(item.collapsed);
  }

  const handleItemClick = useCallback(e => {
    e.preventDefault();
    setCollapsed(state => !state);
  });

  const constructLink = (teamId, slug, version, href, repoPublic = true) => {
    let params = [teamId];
    let newHref = '/[team]/[...args]';
    if (!repoPublic) {
      params.push('private');
      newHref = '/[team]/private/[...args]';
    }
    params.push(slug);
    if (version && version !== 'latest') params.push(version);
    if (href) params.push(href);

    return { href: newHref, as: `/${params.join('/')}` };
  };

  switch (type) {
    case 'category':
      return (
        items.length > 0 && (
          <li key={href} className={index !== 0 ? `mt-6` : ''}>
            <h5
              onClick={collapsible ? handleItemClick : undefined}
              className="prose px-3 uppercase tracking-wide font-semibold text-sm text-gray-900 dark:text-gray-200"
            >
              {label}
              {collapsible && (
                <SidebarArrow
                  collapsed={collapsed}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#565656"
                    d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
                  ></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </SidebarArrow>
              )}
            </h5>
            {!collapsed && (
              <ul>
                {items.map(childItem => (
                  <DocSidebarItem
                    key={childItem.href}
                    teamId={teamId}
                    slug={slug}
                    version={version}
                    repoPublic={repoPublic}
                    item={childItem}
                    onItemClick={onItemClick}
                    collapsible={collapsible}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            )}
          </li>
        )
      );

    case 'specifications':
      return (
        <li
          key={href}
          onClick={onNavigate}
          className="flex items-center px-3 text-gray-500 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path
              className="heroicon-ui"
              d="M20.59 12l-3.3-3.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l3.3-3.3zM3.4 12l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L3.4 12zm7.56 8.24a1 1 0 0 1-1.94-.48l4-16a1 1 0 1 1 1.94.48l-4 16z"
            />
          </svg>
          <Link href={`/${teamId}/api-doc/${slug}`}>
            <a className=" ml-2 block text-sm ">{label}</a>
          </Link>
        </li>
      );

    case 'index':
      let linkIndexProps = constructLink(
        teamId,
        slug,
        version,
        href,
        repoPublic
      );
      return (
        <li
          className="menu__list-item"
          key="index"
          onClick={onNavigate}
          className="flex items-center px-3 text-gray-500 dark:text-gray-200 dark:hover:text-gray-100 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path
              className="heroicon-ui"
              d="M6 2h9a1 1 0 0 1 .7.3l4 4a1 1 0 0 1 .3.7v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm9 2.41V7h2.59L15 4.41zM18 9h-3a2 2 0 0 1-2-2V4H6v16h12V9z"
            />
          </svg>
          <Link {...linkIndexProps}>
            <a className="ml-2 block text-sm">{label}</a>
          </Link>
        </li>
      );

    case 'link':
    default:
      let params = [teamId, slug];
      if (version && version !== 'latest') params.push(version);
      if (href) params.push(href);
      let linkProps = constructLink(teamId, slug, version, href, repoPublic);
      return (
        <li key={linkProps.href} onClick={onNavigate}>
          <Link {...linkProps}>
            <a
              className={`px-3 leading-8 transition-colors duration-200 relative block text-sm font-normal hover:text-gray-900 dark:hover:text-gray-100 no-underline rounded ${
                active
                  ? 'bg-indigo-50 text-gray-900 dark:bg-indigo-600 dark:text-gray-50'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {label}
            </a>
          </Link>
        </li>
      );
  }
}

function mutateSidebarCollapsingState(item, path, sidebarCollapsible) {
  const { items, label, href, type } = item;
  switch (type) {
    case 'category': {
      items
        .map(childItem => mutateSidebarCollapsingState(childItem, path))
        .filter(val => val).length > 0;
      item.collapsed = sidebarCollapsible && !anyChildItemsActive;
      return sidebarCollapsible && anyChildItemsActive;
    }

    case 'link':
    default:
      let equal = href === path || (label === 'Index' && !path);
      if (equal) item.active = true;
      return equal;
  }
}

function CustomDocSidebar(props) {
  const {
    teamId,
    slug,
    version,
    specificationUrl,
    path,
    repoPublic,
    sidebar: currentSidebar,
    sidebarCollapsible,
    sidebarData,
    drawerOpen,
    closeDrawer,
    onNavigate
  } = props;

  if (!sidebarData) {
    throw new Error(
      `Cannot find the sidebar "${currentSidebar}" in the sidebar config!`
    );
  }

  let items = [{ type: 'index', label: 'Index' }];

  if (specificationUrl)
    items.push({ type: 'specifications', label: 'API Specs', href: '' });

  items = items.concat(sidebarData);
  items.forEach(sidebarItem =>
    mutateSidebarCollapsingState(sidebarItem, path, sidebarCollapsible)
  );

  return (
    <Transition
      show={drawerOpen}
      enter="transition ease-out duration-100"
      enterFrom="opacity-0" // scale-95"
      enterTo="opacity-100" // scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="opacity-100" // scale-100"
      leaveTo="opacity-0" // scale-95"
      as="div"
      className="absolute md:h-auto md:bg-transparent md:z-0 md:relative md:block md:w-60 xl:w-72 lg:static lg:block px-1 pt-6  font-medium text-sm sm:px-3 xl:px-5 pb-10 lg:pt-10 lg:pb-14"
    >
      <button
        className="md:hidden fixed top-0 left-0 w-screen h-screen bg-gray-700 opacity-80 z-10 text-transparent outline-none focus:outline-none ring-0"
        onClick={() => closeDrawer()}
      >
        Close Drawer
      </button>
      <ul
        open={drawerOpen}
        className="fixed top-0 left-0 z-20 dark:bg-gray-900 w-[70%] h-screen p-2 py-6 md:p-0  md:sticky md:top-[80px] md:w-full max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800"
      >
        {items.map((item, index) => (
          <DocSidebarItem
            key={item.href}
            teamId={teamId}
            slug={slug}
            version={version}
            repoPublic={repoPublic}
            item={item}
            index={index}
            collapsible={sidebarCollapsible}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </Transition>
  );
}

export default CustomDocSidebar;
