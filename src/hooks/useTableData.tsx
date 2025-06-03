import { useState, useMemo, useEffect } from "react";

interface Sorting {
  id: string;
  desc: boolean;
}

interface UseTableDataParams<T> {
  data: T[];
  initialPageSize?: number;
}

export function useTableData<T>({
  data,
  initialPageSize = 10,
}: UseTableDataParams<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<Sorting[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;

    const filter = globalFilter.toLowerCase();
    return data.filter((item:any) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(filter)
      )
    );
  }, [data, globalFilter]);

  const sortedData = useMemo(() => {
    if (!sorting.length) return filteredData;

    const [{ id, desc }] = sorting;
    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[id];
      const bValue = (b as any)[id];
      if (aValue < bValue) return desc ? 1 : -1;
      if (aValue > bValue) return desc ? -1 : 1;
      return 0;
    });
  }, [filteredData, sorting]);

  const paginatedData = useMemo(() => {
    const start = page * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  useEffect(() => {
    setPage(0);
  }, [globalFilter, pageSize]);

  return {
    paginatedData,
    page,
    setPage,
    pageCount,
    pageSize,
    setPageSize,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
  };
}
