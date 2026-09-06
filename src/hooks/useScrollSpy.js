import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view and returns its hash
 * (e.g. "#about"), instead of mutating `classList` on nav links
 * directly. This avoids the conflict where React re-renders (e.g.
 * Header re-rendering when the mobile menu toggles) would wipe out
 * whatever class this hook had set imperatively — since now the
 * active state lives in React state and Header renders the
 * "active" className from it on every render.
 *
 * @param {string[]} hashes - e.g. ["#hero", "#about", "#products", ...]
 * @returns {string | null} the currently active hash
 */
function useScrollSpy(hashes) {
  const [activeHash, setActiveHash] = useState(hashes?.[0] ?? null);

  useEffect(() => {
    if (!hashes || hashes.length === 0) return;

    const handleScrollSpy = () => {
      const position = window.scrollY + 200;

      for (const hash of hashes) {
        const section = document.querySelector(hash);
        if (!section) continue;

        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          setActiveHash(hash);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);

    handleScrollSpy();

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, [hashes]);

  return activeHash;
}

export default useScrollSpy;