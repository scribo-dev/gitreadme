import React, { useState } from 'react';
import { TeamProvider } from '../../components/TeamContext';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';

import {
  getTeam,
  getRepos,
  getTeamInfo,
  generateTheme
} from '../../utils/company';
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

        {headerTheme && (
          <ThemeProvider theme={headerTheme.props}>
            <Header repos={repos} />
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

  let teamInfo = await getTeamInfo(selectedTeam);
  let repos = await getRepos(selectedTeam);
  let { team } = generateTheme(selectedTeam, teamInfo.avatar_url, null);
  console.log(repos);
  return {
    props: {
      team,
      repos
    }
  };
}
