import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

function ScrollToTop() {
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [navigate]);

  return null;
}

export default ScrollToTop;
