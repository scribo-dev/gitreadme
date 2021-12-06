export function getGithubUrl(repo) {
  let match = repo.match(/github.com\/(.+)/);
  if (match) {
    return `https://raw.githubusercontent.com/${match[1]}/master`;
  }
  return null;
}
