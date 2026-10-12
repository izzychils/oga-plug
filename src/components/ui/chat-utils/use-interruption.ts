import * as React from "react";

/**
 * Tracks whether the person reading the transcript has just taken over.
 *
 * `Chat` calls `interrupt()` from the wheel and touch handlers, then refuses to
 * auto-scroll while `interruptedRef.current` is true. The flag clears after
 * `threshold` ms of quiet, so a single scroll gesture stops the transcript from
 * yanking itself back to the bottom while it is still being read.
 */
export function useUserInterruption(threshold = 200) {
  const interruptedRef = React.useRef(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const interrupt = React.useCallback(() => {
    interruptedRef.current = true;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      interruptedRef.current = false;
      timerRef.current = null;
    }, threshold);
  }, [threshold]);

  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return { interruptedRef, interrupt };
}
