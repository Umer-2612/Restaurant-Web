export const jwtDecode = (t) => {
  if (t.includes('.')) {
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return token;
  }
  return t;
};

export const setCookie = (cname, cvalue) => {
  if (cvalue) {
    const jwtData = jwtDecode(cvalue);
    const d = jwtData.payload.exp
      ? new Date(jwtData?.payload?.exp * 1000).toUTCString()
      : new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString();
    const expires = 'expires=' + d;
    document.cookie =
      cname + '=' + btoa(JSON.stringify(cvalue)) + ';' + expires + ';path=/';
  }
};

export const getCookie = (cname) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0 && name.length !== c.length) {
      return atob(c.substring(name.length, c.length));
    }
  }
  return '';
};

export const deleteCookie = (cname) => {
  document.cookie = cname + '=; Path=/;max-age=0';
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    deleteCookie(name);
  }
};

export const updateDocumentTitle = (location) => {
  if (location?.pathname) {
    const pathname = location.pathname.replace(/^\/|\/$/g, '');
    const parts = pathname.split('/');
    const formattedParts = parts.map((part) => {
      const newPart = part.replace(/-/g, ' ');
      return newPart.charAt(0).toUpperCase() + newPart.slice(1);
    });
    document.title = formattedParts.join(' | ');
  } else {
    document.title = 'Punjabi Touch';
  }
};

export const queryParamsBuilder = (query) => {
  if (typeof query !== 'object') {
    return '';
  }
  const keys = Object.keys(query).filter(
    (b) => query[b] !== null && query[b] !== ''
  );
  if (keys.length) {
    return (
      '?' +
      new URLSearchParams(
        keys.reduce((a, b) => {
          a[b] = query[b];
          return a;
        }, {})
      ).toString()
    );
  }
  return '';
};

export const extraBodyFields = [
  'createdAt',
  'updatedAt',
  'updatedBy',
  '_id',
  'numberOfEmployees',
  'recordDeleted',
  'lastUpdatedBy',
  'createdBy',
];

export const removeExtraFields = (obj = {}, removeFields = []) => {
  const data = JSON.parse(JSON.stringify(obj));
  const extraFields = [...extraBodyFields, ...removeFields];
  for (const key of extraFields) {
    if (key in obj) {
      delete data[key];
    }
  }
  return data;
};

export const convertPathNameToKey = (location) => {
  const { pathname } = location;
  if (!pathname || pathname === '/') {
    return false;
  }
  const pathNameArr = pathname.split('/');
  const transformedPath = pathNameArr
    .filter((segment) => segment !== '')
    .map((segment) =>
      segment.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
    )
    .join('');
  return transformedPath;
};
