import React, { useState, useEffect } from 'react';

import '../styles/index.css';

import '@reach/combobox/styles.css';
import { useRouter } from 'next/router';
import ProgressBar from '../components/ProgressBar';
import { BreakpointProvider } from '../utils/breakpoint';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = url => {
      setLoading(true);
    };

    const handleRouteChangeComplete = url => {
      setLoading(false);
    };

    const handleRouteChangeError = url => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <BreakpointProvider>
      <ProgressBar loading={loading} />
      <Component {...pageProps} />
    </BreakpointProvider>
  );
}

export default MyApp;
