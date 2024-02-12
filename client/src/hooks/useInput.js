import { useState } from 'react';

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setValue(value);
  };

  return { value, onChange };
};
