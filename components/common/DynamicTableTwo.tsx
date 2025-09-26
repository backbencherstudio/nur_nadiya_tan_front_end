"use client";

import Image from "next/image";
import React from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface ColumnConfig {
  label: React.ReactNode;
  width: any;
  accessor: string;
  formatter?: (value: any, row: any) => React.ReactNode;
}

interface DynamicTableProps {
  columns: any;
  data: any[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onView?: (row: any) => void;
  onDelete?: (id: any) => void;
  noDataMessage?: string;
  totalpage: number;
  totalItems?: number;
  onItemsPerPageChange?: (n: number) => void;
}

export default function DynamicTableTwo({
  columns,
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
  onView,
  totalpage,
  onDelete,
  noDataMessage = "No data found.",
  totalItems,
  onItemsPerPageChange,
}: DynamicTableProps) {
  const totalPages = totalpage;
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const effectiveTotalItems = typeof totalItems === "number" ? totalItems : data.length;
  const startIndex = paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, effectiveTotalItems);

  const getPagination = () => {
    let pages: (number | string)[] = [];
    if (totalPages <= 4) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
    return pages;
  };

  const handleItemsPerPageChange = (value: number) => {
    if (onItemsPerPageChange) onItemsPerPageChange(value);
    // Reset to page 1 on page-size change
    onPageChange(1);
  };
const originalArray = [ itemsPerPage,10, 25, 50, 100];
const uniqueArray = [...new Set(originalArray)];
  return (
    <div>
      {/* Table Wrapper with Border & Radius */}
      <div className=" rounded-t-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full text-left">
            <thead className="bg-neutral-50">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={{ width: col.width  || "auto" }}
                    className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#4a4c56] border-b border-gray-100"
                  >
                    {col.label}
                  </th>
                ))}
                {(onView || onDelete) && (
                  <th className="px-4 py-3 text-sm font-medium text-[#4a4c56] border-b border-gray-100">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        style={{ width: col.width || "auto" }}
                        className="px-4 py-3 text-sm text-[#4a4c56]"
                      >
                        {col.formatter
                          ? col.formatter(row[col.accessor], row, (currentPage - 1) * itemsPerPage + i)
                          : row[col.accessor]}
                      </td>
                    ))}
                    {(onView || onDelete) && (
                      <td className="px-4 py-3 flex gap-4 items-center">
                        {onView && (
                          <span
                            className="text-xs underline text-[#4a4c56]  cursor-pointer"
                            onClick={() => onView(row)}
                          >
                            View details
                          </span>
                        )}
                        {onDelete && (
                          <Image
                            onClick={() => onDelete(row.id)}
                            src="/dashboard/icon/delete.svg"
                            alt="delete"
                            width={16}
                            height={16}
                            className="cursor-pointer"
                          />
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (onView || onDelete ? 1 : 0)}
                    className="px-4 py-10 text-center text-[#4a4c56] text-sm"
                  >
                    {noDataMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination + Right-side summary / page-size */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 cursor-pointer py-1 flex justify-center  items-center border border-primaryColor text-primaryColor rounded disabled:opacity-40 disabled:text-grayColor1 disabled:border-grayColor1"
            >
              <MdArrowBackIosNew />
            </button>
            {getPagination().map((page, i) => (
              <button
                key={i}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..."}
                className={`px-2 rounded border text-sm ${page === currentPage
                    ? "text-primaryColor border-primaryColor  font-medium"
                    : "text-grayColor1"
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer px-2 py-1 flex justify-center  items-center border border-primaryColor text-primaryColor rounded disabled:opacity-40 disabled:text-grayColor1 disabled:border-grayColor1"
            >
              <MdArrowForwardIos />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-[#4a4c56]">
              Showing {startIndex} to {endIndex} of {effectiveTotalItems} entries
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-[#4a4c56]">Show</label>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-2 py-1 border rounded text-sm"
              >
                {uniqueArray.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}