export async function authFetch(url, opt, req, redirect = true) {
  opt = opt || {};
  let headers = {
    Accept: 'application/json',
    cookie: req ? req.headers.cookie : null
  };

  if (opt.method && opt.method === 'POST')
    headers = { ...headers, 'Content-Type': 'application/json' };

  let res = await fetch(`${url}`, {
    credentials: 'include',
    headers,
    ...opt
  });
  // if (res.status === 401 || res.status === 403) {
  //   // if (typeof window !== 'undefined' && redirect) {
  //   //   window.location.replace('/');
  //   // }
  // } else
  if (!res.ok) {
    let data = await res.json();
    return Promise.reject(data);
  }

  return res;
}
