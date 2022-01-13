import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Link from 'next/link';

import { TeamContext } from './TeamContext';

export function Docs({ repos }) {
  const team = useContext(TeamContext);
  const theme = useContext(ThemeContext);

  return (
    <div className="dark:!bg-gray-900 text-gray-700 dark:text-gray-300 py-[32px]">
      <div id="docs" className="w-full max-w-8xl mx-auto px-2 sm:px-3 xl:px-5">
        {theme?.title && (
          <h3 className="text-3xl text-center dark:text-gray-100">
            {theme?.title}
          </h3>
        )}
        <div
          className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-3"
          style={{ marginTop: '32px' }}
        >
          {repos
            // .filter(repo => repo.public)
            .map(repo => (
              <div key={repo.name}>
                {repo.thumb && (
                  <Link href={`/${team.teamId}/${repo.name}`}>
                    <div
                      className="flex items-center transition-shadow duration-500 ease-in-out overflow-hidden rounded-t-sm rounded-b-md cursor-pointer"
                      style={{ height: '300px' }}
                    >
                      <img
                        src={`${process.env.CDN}/${team.teamId}/public/templates/${repo.thumb}`}
                        // width="639"
                        // height="348"
                      />
                    </div>
                  </Link>
                )}
                <h3 className="mt-4 text-xl font-medium dark:text-gray-200">
                  {repo.name}
                </h3>
                <p className="mt-2 text-sm">{repo.description}</p>
                <Link href={`/${team.teamId}/${repo.name}`}>
                  <a className="block mt-4 text-base hover:underline">
                    Learn More →
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Docs;
