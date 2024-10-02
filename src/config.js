const url = new URL(window.location.href);
let domain,
  subDomain = '';

if (
  url.hostname.split('.').length === 3 &&
  !url.hostname.includes('.onrender.com')
) {
  domain = url.hostname.substring(
    url.hostname.indexOf('.') + 1,
    url.hostname.length
  );
  if (
    url.hostname.split('.').length > 1 &&
    url.hostname.split('.')[0].length > 3
  ) {
    subDomain = url.hostname.substring(0, url.hostname.indexOf('.'));
  }
} else {
  domain = url.hostname;
}

const devVersion = '1.1.1';
const stagingVersion = '1.1.1';
const prodVersion = '1.1.1';
let version = '';

if (import.meta.env.VITE_ENV === 'development') {
  version = devVersion;
} else if (import.meta.env.VITE_ENV === 'staging') {
  version = stagingVersion;
} else if (import.meta.env.VITE_ENV === 'production') {
  version = prodVersion;
} else {
  version = devVersion;
}

const config = {
  version: version,
  baseUrl: import.meta.env.VITE_BASE_URL || '/',
  domain: domain,
  subDomain: subDomain,
  clientId: import.meta.env.VITE_CLIENT_ID,
};

export default config;
