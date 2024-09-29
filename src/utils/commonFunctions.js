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
