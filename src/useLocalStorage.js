import { useState, useEffect } from "react";

function getStorageValue(key) {
  // getting stored value
  if (typeof window !== "undefined") {
    console.info("get item value",localStorage.getItem(key));
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : '';
    return initial; 
  }
}

export const useLocalStorage = (key) => {
  const [value] = useState(() => {
    return getStorageValue(key);
  });

  useEffect(() => { 
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value];
};