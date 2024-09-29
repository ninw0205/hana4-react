import { useState } from 'react';

export default function useToggle(defaultValue: boolean = false) {
  const [state, setState] = useState(defaultValue);

  const toggle = (forceState?: unknown) =>
    setState((pre) => (typeof forceState === 'boolean' ? forceState : !pre));

  return [state, toggle] as const;
}
