// 1. 实现 useComponentDidupdate

function useComponentDidupdate(cb, deps) {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      cb();
    }
  }, deps);
}
