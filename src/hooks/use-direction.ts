'use client';

import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export function useDirection() {
  const [direction, setDirection] = useLocalStorage('iso-direction', 'ltr');

  useEffect(() => {
    document.documentElement.dir = direction ?? 'ltr';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  return {
    direction: direction ? direction : 'ltr',
    setDirection,
  };
}
