import { useCallback, useState } from 'react';

function useValue(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((_, newValue) => setValue(newValue), [setValue]);
  const onAdd = useCallback(() => {

  }, []);
  //const onAdd = useCallback((...args) => console.log(...args), []);

  return [value, onChange, onAdd];
}

export default useValue;
