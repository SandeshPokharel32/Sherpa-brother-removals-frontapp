import { useState, useEffect } from "react";

interface UseMediaQuery {
    (query: string): boolean;
}

interface MediaQueryListenerEvent {
    matches: boolean;
}

const useMediaQuery: UseMediaQuery = (query) => {
    // Initialize state with whether the query matches
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== "undefined" && window.matchMedia) {
            return window.matchMedia(query).matches;
        }
        return false; // Default to false during SSR or unsupported environments
    });

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }

        const mediaQueryList: MediaQueryList = window.matchMedia(query);

        // Update state when the media query status changes
        const listener = (event: MediaQueryListenerEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener
            ? mediaQueryList.addEventListener("change", listener)
            : mediaQueryList.addListener(listener); // fallback for older browsers

        // Set initial value in case it changed before listener was added
        setMatches(mediaQueryList.matches);

        return () => {
            mediaQueryList.removeEventListener
                ? mediaQueryList.removeEventListener("change", listener)
                : mediaQueryList.removeListener(listener);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
