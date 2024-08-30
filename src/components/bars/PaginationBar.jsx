import ArrowButton from "../buttons/ArrowButton";

function PaginationBar({ handleLeftClick, handleRightClick, page, totalPages }) {
  return (
    <div className="pb-4 w-full flex justify-center items-center">
      <ArrowButton
        onClick={handleLeftClick}
        direction='left'
        disabled={page === 1}
      />
      <p className="p-1 w-[55px] text-center text-lg">
        {page}
      </p>
      <ArrowButton
        onClick={handleRightClick}
        direction='right'
        disabled={page === totalPages}
      />
    </div>
  );
};

export default PaginationBar;