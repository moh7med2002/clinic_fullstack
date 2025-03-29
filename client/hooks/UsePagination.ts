import { useState } from "react";

interface UsePagination<T> {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    paginatedData: T[];
}

const usePagination = <T>(data: T[], itemsPerPage: number = 3): UsePagination<T> => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    return { currentPage, setCurrentPage, totalPages, paginatedData };
};

export default usePagination;
