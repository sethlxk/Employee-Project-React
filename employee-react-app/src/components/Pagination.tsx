import { Button } from "@mui/material";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: any;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };
  return (
    <div className="page-buttons">
      {currentPage != 1 ? (
        <Button onClick={handlePreviousClick}>Previous</Button>
      ) : (
        <Button disabled>Previous</Button>
      )}
      <span>{currentPage}</span>
      {currentPage != totalPages ? (
        <Button onClick={handleNextClick}>Next</Button>
      ) : (
        <Button disabled>Next</Button>
      )}
    </div>
  );
};

export default Pagination;
