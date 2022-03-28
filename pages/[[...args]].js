import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { TeamProvider } from '../components/TeamContext';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import gfm from 'remark-gfm';

import Header from '../components/Header';
import Container from '../components/ContainerFixed';
import Footer from '../components/Footer';
import CustomDocSidebar from '../components/CustomDocSidebar';
import CodeBlock from '../components/CodeBlock';
import HeadAnchor from '../components/HeadAnchor';
import TOC from '../components/TOC';

import { useBreakpoint } from '../utils/breakpoint';
import { getImageUrl, githubFallback } from '../utils/company';
import LoadingPage from '../components/LoadingPage';
import ErrorPage from '../components/ErrorPage';

import Global from '../components/Global';

export function Doc({
  team,
  repoInfo,
  fileContent,
  pageConfig,
  file,
  path,
  error
}) {
  const breakpoints = useBreakpoint();

  const [drawerOpen, setDrawerOpen] = useState(true);
  const router = useRouter();

  if (router.isFallback) return <LoadingPage />;

  if (error) return <ErrorPage />;

  const theme = JSON.parse(team.theme);

  let [globalTheme, headerTheme] = theme;

  let footerTheme = theme.find(t => t.component === 'Footer');

  return (
    <TeamProvider value={team}>
      <ThemeProvider theme={globalTheme}>
        <div className="dark:bg-gray-900">
          <ThemeProvider theme={globalTheme.props}>
            <Global />
          </ThemeProvider>
          <ThemeProvider theme={headerTheme.props}>
            <Header
              repo={repoInfo}
              fileContent={fileContent}
              pageConfig={pageConfig}
              onDrawerClick={() => setDrawerOpen(!drawerOpen)}
            />
          </ThemeProvider>
          {!fileContent && (
            <div className="flex flex-col justify-center items-center my-64">
              <img src="/sync.svg" width="200px" />
              <h3>Repository not synced</h3>
              <p className="text-center">
                Make sure that the scribo bot has access to the repository and
                that it checked your last commit.
                <br /> Our{' '}
                <a href="https://gitread.me/scribo/public-docs/config">
                  tutorial
                </a>{' '}
                might help you solve this issue
              </p>
            </div>
          )}
          <div className="w-full max-w-8xl mx-auto">
            <div className="flex flex-col sm:flex-row ">
              {team && repoInfo && pageConfig && (
                <CustomDocSidebar
                  teamId={team.teamId}
                  slug={repoInfo.slug}
                  version={repoInfo.version}
                  repoPublic={repoInfo.public}
                  path={path}
                  specificationUrl={pageConfig.specificationUrl}
                  sidebarCollapsible={false}
                  sidebarData={pageConfig.sidebar}
                  drawerOpen={drawerOpen}
                  closeDrawer={() => setDrawerOpen(false)}
                  onNavigate={() => {
                    if (!breakpoints.md) setDrawerOpen(!drawerOpen);
                  }}
                />
              )}
              <div
                id="doc-body"
                className="flex-1 min-h-screen w-full overflow-hidden"
              >
                <ReactMarkdown
                  plugins={[gfm]}
                  escapeHtml={false}
                  source={fileContent}
                  className="prose dark:prose-light max-w-full px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16 "
                  transformImageUri={url => getImageUrl(team, repoInfo, url)}
                  renderers={{
                    code: CodeBlock,
                    // table: Table,
                    heading: headerProps => (
                      <HeadAnchor key="header-anchor" {...headerProps} />
                    )
                  }}
                />
              </div>
              <TOC slug={repoInfo.slug + file} key={fileContent} />
            </div>
          </div>
          {footerTheme && (
            <ThemeProvider theme={footerTheme.props}>
              <Footer />
            </ThemeProvider>
          )}
        </div>
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
          args: ['public-docs']
        }
      }
    ],
    fallback: 'blocking'
  };
}

export async function getStaticProps(context) {
  const {
    params: { args }
  } = context;
  let selectedTeam = process.env.GITHUB_TEAM;
  let repo = process.env.GITHUB_REPO;
  let fallbackProps = await githubFallback(selectedTeam, repo, args);

  return { props: fallbackProps };
}

export default Doc;
