import { writable } from "svelte/store";
import { getLocalStore, setLocalStore } from "./util/util";

export function createStore<T>(key: string, initialValue?: T) {
  const { set, subscribe, update: _update } = writable<T>(initialValue, (set) => {
    getLocalStore(key).then((value: T) => {
      set(value)
    });
  });

  function merge(value: Partial<T>) {
    _update((storedValue) => {
      const merged = { ...storedValue, ...value }
      return merged;
    })
  }

  function replace(value: T) {
    set(value)
  }

  subscribe((value: T) => {
    setLocalStore({[key]: value})
    .catch((err) => console.error('Saving to chrome.store failed', err))
  })

  return {
    subscribe, merge, replace, _update,
  }
}

export function createArrayStore<T>(key: string, initialValue: T[] = []) {
  const store = createStore<T[]>(key, initialValue);

  function remove(value: T, matcher: (value1: T, value2: T) => boolean) {
    store._update((stored) => {
      const itemRemoved = stored.filter((val) => !matcher(val, value));
      return itemRemoved;
    })
  }

  function push(value: T | T[]) {
    store._update((stored: T[]) => {
      const newItemArr = Array.isArray(value)? value: [value];
      const itemAdded = [...newItemArr, ...stored];
      return itemAdded;
    })
  }

  return { ...store, remove, push }
}
