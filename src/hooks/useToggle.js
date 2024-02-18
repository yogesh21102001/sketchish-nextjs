import { useCallback, useState } from "react";

export default function useToggle(initial) {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => {
    setValue((prevState) => !prevState);
  }, []);

  return [value, toggle];
}
