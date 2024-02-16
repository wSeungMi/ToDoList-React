import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
export default function Pagination({ total, limit, page, setPage }) {
  const pageNums = Math.ceil(total / limit);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex m-auto">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 
            text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:text-gray-300"
          >
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="lg"
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
          {Array(Math.max(pageNums, 1))
            .fill()
            .map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                ${
                  page === i + 1
                    ? ' text-white bg-[#9070c0] hover:bg-[#584278]'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                } `}
              >
                {i + 1}
              </button>
            ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === 1 ? page - 1 === pageNums : page === pageNums}
            className="relative inline-flex items-center rounded-r-md px-2 py-2
             text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:text-gray-300
             "
          >
            <span className="sr-only">Next</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="lg"
              className="h-5 w-5 "
              aria-hidden="true"
            />
          </button>
        </nav>
      </div>
    </div>
  );
}
