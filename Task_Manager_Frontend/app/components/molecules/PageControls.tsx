"use client";

import Button from "../atoms/Button";

type PageControlsProps = {
  page: number;
  setPage: (page: number) => void;
  total: number;
  pageSize?: number;
};

export default function PageControls({
  page,
  setPage,
  total,
  pageSize = 8,
}: PageControlsProps) {
  const lastPage = Math.ceil(total / pageSize);

  const showLeft = page > 1;
  const showRight = page < lastPage;

  if (lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 px-4 md:px-10 pb-4">
      {page > 2 && (
        <>
          <Button
            type="button"
            onClick={() => setPage(1)}
            className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            {1}
          </Button>
          <span className="px-1 text-white">...</span>
        </>
      )}

      {showLeft && (
        <Button
          type="button"
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          {page - 1}
        </Button>
      )}

      <div className="px-3 py-1 text-sm rounded-md bg-gray-900 text-white">
        {page}
      </div>

      {showRight && (
        <Button
          type="button"
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          {page + 1}
        </Button>
      )}

      {page < lastPage - 1 && (
        <>
          <span className="px-1 text-white">...</span>

          <Button
            type="button"
            onClick={() => setPage(lastPage)}
            className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            {lastPage}
          </Button>
        </>
      )}
    </div>
  );
}
