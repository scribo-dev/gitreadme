import React, { useState, useEffect, createContext, useContext } from 'react';

const defaultValue = {};

const BreakpointContext = createContext(defaultValue);

const queries = {
  sm: '(min-width: 640px)',
  // => @media (min-width: 640px) { ... }

  md: '(min-width: 768px)',
  // => @media (min-width: 768px) { ... }

  lg: '(min-width: 1024px)',
  // => @media (min-width: 1024px) { ... }

  xl: '(min-width: 1280px)',
  // => @media (min-width: 1280px) { ... }

  '2xl': '(min-width: 1536px)'
  // => @media (min-width: 1536px) { ... }
};

const BreakpointProvider = ({ children, w }) => {
  const [queryMatch, setQueryMatch] = useState({});

  useEffect(() => {
    const mediaQueryLists = {};
    const keys = Object.keys(queries);
    let isAttached = false;

    const handleQueryListener = () => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = !!(
          mediaQueryLists[media] && mediaQueryLists[media].matches
        );
        return acc;
      }, {});
      setQueryMatch(updatedMatches);
    };

    if (!w && typeof window !== undefined) w = window;

    if (w && w.matchMedia) {
      const matches = {};
      keys.forEach(media => {
        if (typeof queries[media] === 'string') {
          mediaQueryLists[media] = w.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches;
        } else {
          matches[media] = false;
        }
      });
      setQueryMatch(matches);
      isAttached = true;
      keys.forEach(media => {
        if (typeof queries[media] === 'string') {
          mediaQueryLists[media].addListener(handleQueryListener);
        }
      });
    }

    return () => {
      if (isAttached) {
        keys.forEach(media => {
          if (typeof queries[media] === 'string') {
            mediaQueryLists[media].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, [queries]);

  return (
    <BreakpointContext.Provider value={queryMatch}>
      {children}
    </BreakpointContext.Provider>
  );
};

function useBreakpoint() {
  const context = useContext(BreakpointContext);
  if (context === defaultValue) {
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  }
  return context;
}
export { useBreakpoint, BreakpointProvider };
