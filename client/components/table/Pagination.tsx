import React from "react";
import PrimaryButton from "../ui/PrimaryButton";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-between items-center mt-4">
            <PrimaryButton
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </PrimaryButton>
            <span className="text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <PrimaryButton
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </PrimaryButton>
        </div>
    );
};
export default Pagination;