import { useState, useEffect } from 'react';

/**
 * Hook personalizado para implementar debounce en valores
 * @param {any} value - El valor que se quiere debounce
 * @param {number} delay - El delay en milisegundos (por defecto 500ms)
 * @returns {any} - El valor debounced
 */
export const useDebounce = (value = '', delay = 500, minLength = 2) => {
      const [debouncedValue, setDebouncedValue] = useState(value);

      useEffect(() => {
            const handler = setTimeout(() => {
                  if (value.length >= minLength && value.trim() !== '') {
                        setDebouncedValue(value);
                  } else if (value.trim() === '') {
                        setDebouncedValue('');
                  }
            }, delay);

            return () => {
                  clearTimeout(handler);
            };
      }, [value, delay, minLength]);

      return { debouncedValue };
};

export default useDebounce;
