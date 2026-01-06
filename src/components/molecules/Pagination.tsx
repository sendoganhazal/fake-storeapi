import Button from "../atoms/Button";
type Props = {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </Button>
      <ul className="pagination-list">
        <li className="pagination-list-item"> {page}</li>
        <li className="pagination-list-item"> /</li>
        <li className="pagination-list-item"> {totalPages}</li>
      </ul>

      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
