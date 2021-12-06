import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../utils/devices';

const NavLink = styled.a`
  margin-left: ${props => `${props.level * 8}px`};
  margin-top: 8px;
  font-size: 12px;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  active {
    color: #000;
  }
`;

const accumulateOffsetTop = (el, totalOffset = 0) => {
  while (el) {
    totalOffset += el.offsetTop - el.scrollTop + el.clientTop;
    el = el.offsetParent;
  }
  return totalOffset;
};

const throttle = (callback, timeout) => {
  let throttleId = null;
  return function () {
    if (throttleId) return;

    throttleId = setTimeout(() => {
      callback();
      throttleId = null;
    }, timeout);
  };
};

function TOC({ slug }) {
  const [menus, setMenus] = useState([]);
  const [active, setActive] = useState();

  useEffect(() => {
    let titles = document.querySelectorAll('#doc-body h2, #doc-body h3');

    let titleNodes = Array.from(titles);
    setMenus(
      titleNodes.map(title => ({
        title: title.innerText,
        level: +title.nodeName[1],
        id: title.id
      }))
    );
  }, [slug]);

  useEffect(() => {
    const scrollHandler = throttle(() => {
      let titles = document.querySelectorAll('#doc-body h2, #doc-body h3');
      const offsets = Array.from(titles).map(el => accumulateOffsetTop(el));
      let activeIndex = offsets.findIndex(
        offset => offset > window.scrollY + 68
      );
      setActive(activeIndex === -1 ? menus.length : activeIndex);
    }, 100);

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener(`scroll`, scrollHandler);
  }, [menus, slug]);

  return (
    <div className="flex-col w-48  pt-10 pb-6 top-18 hidden lg:flex font-medium">
      {menus && menus.length > 1 && (
        <ul className="sticky top-[80px] max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
          <h5 className="prose uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900 dark:text-gray-400">
            On this page
          </h5>
          {menus.map((menu, i) => (
            <a
              key={menu.id + i}
              href={`#${menu.id.replace('anchor-', '')}`}
              level={menu.level}
              selected={active === i}
              className={`py-2 transition-colors duration-200 relative block text-xs hover:text-gray-900 dark:hover:text-gray-100  no-underline truncate ${
                menu.level === '1' || active === i
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              style={{
                marginLeft: `${menu.level * 4}px`
              }}
            >
              {menu.title}
            </a>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TOC;
