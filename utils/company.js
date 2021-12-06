import fetch from 'isomorphic-unfetch';

export function getImageUrl(team, repoInfo, url) {
  if (url.match(/^http|^https/)) return url;

  return `https://raw.githubusercontent.com/${team.teamId}/${repoInfo.slug}/master/docs/${url}`;
}

export async function githubFallback(selectedTeam, args) {
  let [repo, ...params] = args;
  let path = params.join('/');
  let file = `${path || 'README'}.md`;

  let logo = '';
  try {
    let logoRequest = await fetch(
      `https://api.github.com/orgs/${selectedTeam}`
    );
    if (logoRequest.ok) {
      let logoInfo = await logoRequest.json();

      logo = logoInfo.avatar_url;
    }
  } catch (e) {}

  let info = {
    team: {
      paid: false,
      admins: ['5f5b5c28b99df405f916590f'],
      theme: `[{"component":"Global","props":{"name":"","title":"${selectedTeam} Docs","metadataDescription":"","styles":"","fontBoldColor":"#65b5f6","buttonFontColor":"#000000","buttonBackgroundColor":"#ffffff","fontColor":"#000"}},{"component":"Header","props":{"name":"","logoImg":"${logo}","title":"${selectedTeam}","fontColor":"#f9fafb","borderColor":"#002563","backgroundColor":"#002563","menus":[{"label":"Features","href":"#features"},{"label":"Price","href":"#price"}],"showSearch":"true","styles":""}},{"component":"Banner","props":{"name":"","title":"Website in 4 easy steps","description":"Create your site in one click 🚀","image":"Screen Shot 2021-08-13 at 11.19.08 AM.png","backgroundColor":"#002563","fontColor":"#fafafa","mainButtonLabel":"Create Now Free","mainButtonHref":"https://scribo.dev/home","mainButtonBackground":"#115be4","mainButtonFontColor":"#ffffff","secondButtonLabel":"Tutorial","secondButtonHref":"/scribo/public-docs","secondButtonFontColor":"#000000","secondButtonBackground":"#ffffff"}},{"component":"Features","props":{"name":"","title":"The easiest website builder","subTitle":"","backgroundColor":"#ffffff","gridColumns":"2","gridGap":"120px","items":[{"title":"1. Builder","subTitle":"Create your landing page without any code","description":"","image":"undraw_building_websites_i78t (1).svg"},{"title":"2. Create a Free account","subTitle":"No credit card required","description":"","image":"undraw_secure_login_pdn4 (1).svg"},{"title":"3. Register your company","subTitle":"Create your team in our platform","description":"","image":"undraw_fill_forms_yltj (1).svg"},{"title":"4. Customize and publish","subTitle":"Your Team website is ready","description":"","image":"undraw_about_me_wa29-5.svg"}]}},{"component":"Docs","props":{"name":"","title":"Documentation","backgroundColor":"","buttonBackgroundColor":"","buttonFontColor":""}},{"component":"Footer","props":{"name":"","title":"","image":"","backgroundColor":"#111a2b","fontColor":"#ffffff","items":[{}]}}]`,
      name: selectedTeam,
      teamId: selectedTeam
    },
    params: [],
    repoInfo: {
      repo: `https://github.com/${selectedTeam}/${repo}`,
      slug: repo,
      public: true,
      ref: 'master',
      file: 'docs',
      branch: 'master',
      version: 'latest',
      github: true
    }
  };

  let { team, repoInfo, params: newParams } = info;
  let fileContentInfo = await fetch(
    `https://raw.githubusercontent.com/${selectedTeam}/${repo}/master/${file}`
  );

  let fileContent = await fileContentInfo.text();

  let sidebarInfoRequest = await fetch(
    `https://api.github.com/repos/${selectedTeam}/${repo}/git/trees/master?recursive=1`
  );

  if (!sidebarInfoRequest.ok)
    sidebarInfoRequest = await fetch(
      `https://api.github.com/repos/${selectedTeam}/${repo}/git/trees/main?recursive=1`
    );

  let sidebarInfo = await sidebarInfoRequest.json();
  let groups = [];

  if (sidebarInfo && sidebarInfo.tree) {
    const fixName = file => {
      if (!file) return file;

      let [name] = file.split('.');
      let [firstChar, ...rest] = name.replace(/\s|-|_/g, ' ').split('');
      return firstChar.toUpperCase() + rest.join('').toLowerCase();
    };

    groups = sidebarInfo.tree
      .filter(info => info.path.includes('.md') && info.path !== 'README.md')
      .reduce((acc, info) => {
        let [path] = info.path.split('/');
        let [name, parentName] = info.path.split('/').reverse();
        if (path === name) path = '';

        path = fixName(path.replace(/^\./, ''));
        if (!acc[path]) acc[path] = [];

        acc[path].push({
          label: name !== 'README.md' ? fixName(name) : fixName(parentName),
          href: info.path.replace('.md', '')
        });
        return acc;
      }, {});
  } else {
    console.error(sidebarInfo);
  }
  return {
    team,
    fileContent,
    pageConfig: {
      sidebar: Object.keys(groups)
        .sort()
        .flatMap(group => {
          if (!group) return groups[group];

          return {
            type: 'category',
            label: group,
            items: groups[group]
          };
        })
    },
    file: 'README.md',
    path: path,
    repoInfo
  };
}