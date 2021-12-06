import React, { useState } from 'react';
import { TeamProvider } from '../../components/TeamContext';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getTeam, getRepos } from '../../utils/company';
import LoadingPage from '../../components/LoadingPage';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Docs from '../../components/Docs';
import Footer from '../../components/Footer';
import Global from '../../components/Global';

export default function Doc({ team, repos }) {
  const [previewTheme, setPreviewTheme] = useState();
  const router = useRouter();

  if (router.isFallback) return <LoadingPage />;

  let theme = JSON.parse(team.theme);

  if (previewTheme) theme = previewTheme;

  let [globalTheme, headerTheme] = theme;

  let bannerTheme = theme.find(t => t.component === 'Banner');

  let featureTheme = theme.find(t => t.component === 'Features');

  let docsTheme = theme.find(t => t.component === 'Docs');

  let footerTheme = theme.find(t => t.component === 'Footer');

  return (
    <TeamProvider value={team}>
      <ThemeProvider theme={globalTheme.props}>
        <Global />
        {team.teamId === 'scribo' && (
          <Head>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="d0405509-1a63-4b8c-8880-107b0539aca4";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
              }}
            ></script>
          </Head>
        )}
        {headerTheme && (
          <ThemeProvider theme={headerTheme.props}>
            <Header full={false} repos={repos} />
          </ThemeProvider>
        )}
        {bannerTheme && (
          <ThemeProvider theme={bannerTheme.props}>
            <Banner repos={repos} {...bannerTheme.props} />
          </ThemeProvider>
        )}
        {docsTheme && (
          <ThemeProvider theme={docsTheme.props}>
            <Docs repos={repos} {...docsTheme.props} />
          </ThemeProvider>
        )}
        {footerTheme && (
          <ThemeProvider theme={footerTheme.props}>
            <Footer repos={repos} {...footerTheme.props} />
          </ThemeProvider>
        )}
      </ThemeProvider>
    </TeamProvider>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          team: 'scribo'
        }
      }
    ],
    fallback: 'blocking'
  };
}

export async function getStaticProps(context) {
  const {
    params: { team: selectedTeam }
  } = context;

  let { team } = await getTeam(selectedTeam);
  let repos = await getRepos(selectedTeam);

  return {
    props: {
      team,
      repos
    },
    revalidate: 60 * 1
  };
}
