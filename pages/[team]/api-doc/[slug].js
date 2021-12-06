import React, { useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { RedocStandalone } from 'redoc';
import { ThemeProvider } from 'styled-components';

import HeaderComponent from '../../../components/Header';
import { getFileContent, getRepoInfoApi } from '../../../utils/company';
import { TeamProvider } from '../../../components/TeamContext';

function ApiDoc({ team, json }) {
  if (!json) return null;

  const theme = JSON.parse(team.theme);

  let [globalTheme, headerTheme] = theme;

  return (
    <TeamProvider value={team}>
      <ThemeProvider theme={headerTheme.props}>
        <HeaderComponent full={true} />
        {json && <RedocStandalone spec={json} />}
      </ThemeProvider>
    </TeamProvider>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          team: 'scribo',
          slug: 'public-docs'
        }
      }
    ],
    fallback: 'blocking'
  };
}

export async function getStaticProps(context) {
  const {
    params: { team: selectedTeam, slug }
  } = context;
  try {
    let {
      team,
      repoInfo,
      params: newParams
    } = await getRepoInfoApi(selectedTeam, [slug]);
    // if (!repoInfo.public) throw new Error('Repository is private!');

    let { fileContent, pageConfig, file, path } = await getFileContent(
      team,
      repoInfo,
      newParams
    );

    if (!pageConfig.specificationUrl) throw 'Specification doc not found';

    let specificationResponse = await fetch(pageConfig.specificationUrl);
    let json = await specificationResponse.json();
    return {
      props: { team, fileContent, pageConfig, file, path, repoInfo, json },
      revalidate: 60 * 1
    };
  } catch (e) {
    console.error(e);
    return { props: { error: 'Error' } };
  }
}

export default ApiDoc;
