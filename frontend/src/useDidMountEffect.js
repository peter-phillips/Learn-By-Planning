import { useEffect, useRef } from 'react';

/**
 * Runs on state changes after component mounts
 * @param {Function} func
 * @param {Array} deps
 */
const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  // eslint-disable-next-line
  }, deps);
};

export default useDidMountEffect;
