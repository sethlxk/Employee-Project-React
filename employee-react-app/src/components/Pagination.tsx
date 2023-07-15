import { useState } from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: any;
}
const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const handlePageClick = (page:number) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  const handlePreviousClick = () => {
    if (selectedPage > 1) {
      handlePageClick(selectedPage - 1);
    }
  };

  const handleNextClick = () => {
    if (selectedPage < totalPages) {
      handlePageClick(selectedPage + 1);
    }
  };

  return (
    <div className="page-buttons">
      <button onClick={handlePreviousClick}>Previous</button>
      <span>{selectedPage}</span>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default Pagination;
