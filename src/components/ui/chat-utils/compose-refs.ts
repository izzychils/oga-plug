import * as React from "react";

/** Writes a node into a callback ref, or into a ref object's `current`. */
function setRef<T>(ref: React.Ref<T> | null | undefined, node: T | null) {
  if (typeof ref === "function") {
    ref(node);
  } else if (ref != null) {
    (ref as { current: T | null }).current = node;
  }
}

/**
 * Merges two refs into a single callback ref, so a component inside `Chat` can
 * forward its own ref to a DOM node while the chat context also keeps hold of
 * the same node.
 *
 * Deliberately fixed-arity rather than `(...refs)`: a rest-args array cannot be
 * used as a `useCallback` dependency list (React warns when the list changes
 * size between renders, and the react-hooks rules reject it outright). The two
 * call sites in `chat.tsx` both pass exactly two refs: the forwarded ref and
 * the context ref: so the explicit pair is what the component actually needs,
 * with a dependency list that is a plain literal.
 */
export function useComposedRefs<T>(
  first: React.Ref<T> | null | undefined,
  second: React.Ref<T> | null | undefined,
) {
  return React.useCallback(
    (node: T | null) => {
      setRef(first, node);
      setRef(second, node);
    },
    [first, second],
  );
}
