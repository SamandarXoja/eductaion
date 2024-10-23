import { useEffect, useState } from "react";

import { loadState } from "./load-state";

export async function saveState(key, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.log(err);
  }
}

export const useStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => loadState(key) || defaultValue);

  useEffect(() => {
    if (!!state) {
      saveState(key, state);
    }
  }, [key, state]);

  return [state, setState];
};
