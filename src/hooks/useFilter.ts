
import { useState, useMemo } from 'react';

export const useFilter = <T>(data: T[], filterFn: (item: T, filter: string) => boolean, initialFilter = '') => {
  const [filter, setFilter] = useState(initialFilter);

  const filteredData = useMemo(() => {
    if (!filter) return data;
    return data.filter(item => filterFn(item, filter));
  }, [data, filter, filterFn]);

  return { filter, setFilter, filteredData };
};
