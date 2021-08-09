import { Button } from "@chakra-ui/react";
import React from "react";

type inputParams = {
    currentPage: number;
    totalPages: number;
    onPageClick: (page: number) => void;
    displayPages?: number;
}
const Pagination: React.FC<inputParams> = ({ currentPage, totalPages, onPageClick = () => { }, displayPages = 9 }) => {
    const sides = Math.floor(displayPages / 2);

    const lowerBound = Math.max(2, currentPage - sides);
    const upperBound = Math.min(totalPages, currentPage + sides);
    return (
        <div>
            <Button onClick={() => onPageClick(1)} colorScheme={getColorSchemeSelected(1, currentPage)}>{1}</Button>
            {lowerBound !== 2 ? "..." : ""}
            {generatePagesArray(lowerBound, upperBound).map(page =>
                <Button onClick={() => onPageClick(page)} colorScheme={getColorSchemeSelected(page, currentPage)} >{page} </Button>
            )}
            {upperBound !== totalPages - 1 ? "..." : ""}
            <Button onClick={() => onPageClick(totalPages)} colorScheme={getColorSchemeSelected(totalPages, currentPage)}>{totalPages}</Button>
        </div>
    );
}

const generatePagesArray = (from: number, to: number) => Array.from({ length: (to - from) + 1 }, (_, i) => i + from)
const getColorSchemeSelected = (page: number, currentPage: number) => page === currentPage ? "blue" : "gray";

export default Pagination;
