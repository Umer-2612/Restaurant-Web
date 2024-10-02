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
