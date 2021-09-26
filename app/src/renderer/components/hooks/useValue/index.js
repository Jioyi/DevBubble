import { useCallback, useState } from 'react';

const useValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((_, newValue) => setValue(newValue), [setValue]);
  const onAdd = useCallback(() => {}, []);
  const restore = useCallback(() => setValue(initialValue), [setValue]);

  return [value, onChange, onAdd, restore];
};

export default useValue;