import React from 'react';

import { useMediaQuery } from '@mui/material';
import { useSpring, animated, useInView } from '@react-spring/web';
import { PropTypes } from 'prop-types';

const Reveal = ({
  children,
  output = [0, 10, 20, 30, 40],
  parentDivStyles,
  delay = 200,
  isHorizontal = false,
  // isFadeInOnly = false,
}) => {
  const [ref, inView] = useInView({ threshold: 0.4, once: true });
  const isWideScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: inView ? 1 : 0 },
    config: {
      duration: 200,
    },
    delay: isWideScreen ? delay : 200,
  });
  const { x } = useSpring({
    from: {
      x: inView ? 1 : 0,
    },
    to: {
      x: inView ? 0 : 1,
    },
    delay: isWideScreen ? delay : 200,
  });

  return (
    <animated.div
      ref={ref}
      style={{
        ...animation,
        ...parentDivStyles,
        transform: x
          .to({
            range: [0, 0.25, 0.5, 0.75, 1],
            output: output,
          })
          .to((x) =>
            isHorizontal ? `translate(${x}px, 0)` : `translate(0, ${x}px)`
          ),
      }}
    >
      {children}
    </animated.div>
  );
};

export default Reveal;

Reveal.propTypes = {
  menuProps: PropTypes.object,
  handleMenuModalClose: PropTypes.func,
  children: PropTypes.any,
  output: PropTypes.array,
  parentDivStyles: PropTypes.object,
  delay: PropTypes.number,
  isHorizontal: PropTypes.bool,
};
