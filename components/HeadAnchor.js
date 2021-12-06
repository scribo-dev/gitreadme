import React, { createElement, Fragment, useState } from 'react';
import styled from 'styled-components';

const Anchor = styled.a`
  margin-left: 8px;
  text-decoration: none;
  color: #000;

  :active {
    text-decoration: none;
    color: #000;
  }
`;

const InvisibleAnchor = styled.a`
  display: absolute;
  position: relative;
  top: -100px;
  visibility: hidden;
`;

export function normalizeAnchor(value) {
  var specials = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~’]/g;
  return value.replace(specials, '').replace(/\s/g, '-').toLowerCase().trim();
}

export function getAnchorValue(props) {
  return props.children[0].props.value;
}

function HeadAnchor(props) {
  const [showAnchor, setShowAnchor] = useState(false);
  let value = getAnchorValue(props);
  if (!value) return null;

  value = normalizeAnchor(value);
  let linkDois = (
    <InvisibleAnchor key={`anchor-${value}`} id={value}>
      t
    </InvisibleAnchor>
  );
  let link = (
    <Anchor key={value} href={`#${value}`}>
      #
    </Anchor>
  );
  return createElement(
    `h${props.level}`,
    {
      id: `anchor-${value}`,
      style: { position: 'relative' },
      onMouseEnter: () => setShowAnchor(true),
      onMouseLeave: () => setShowAnchor(false)
    },
    [props.children, showAnchor ? link : null, linkDois]
  );
}

export default HeadAnchor;
