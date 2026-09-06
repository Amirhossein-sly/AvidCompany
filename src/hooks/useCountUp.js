import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 up to `end` once the returned ref's element
 * scrolls into view. Replaces the PureCounter vendor library with a
 * small IntersectionObserver + requestAnimationFrame implementation —
 * no external dependency needed.
 *
 * @param {number} end - target value to count up to
 * @param {number} duration - animation length in ms (default 1500)
 * @returns {[number, React.RefObject]} current count and a ref to attach
 *          to the element that should trigger the animation when visible
 */
function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;
        const startTime = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          setCount(Math.floor(progress * end));

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setCount(end);
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [end, duration]);

  return [count, ref];
}

export default useCountUp;