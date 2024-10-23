"use client";

import React, { useMemo } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useTranslations from "@/hooks/utils/use-translation";

import { PAGE_SIZE } from "@/constants";

import Pagination from "./pagination";

export function DataTableDemo({
  rating,
  currentPage,
  handlePageChange,
  totalPages,
}) {
  const { locale } = useParams();
  const translations = useTranslations(locale);

  const columns = useMemo(
    () => [
      {
        header: "#",
        id: "number",
        cell: ({ row }) =>
          currentPage > 1
            ? (currentPage - 1) * PAGE_SIZE + row.index + 1
            : row.index + 1,
      },
      {
        accessorKey: "status",
        header: translations.common?.name,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3 capitalize">
              <Image
                src={
                  row?.original?.attributes?.icon?.data?.attributes?.url
                    ? `https://admin.it-ea.uz${row?.original?.attributes?.icon?.data?.attributes?.url}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQegkCKfIuNKOK0p6Kt5XcewwMHyZJYq6Kv26hbYLLYct6llrinEUXy5Vc7reD1GZvBcN0&usqp=CAU"
                }
                alt={"icons"}
                width={30}
                height={32}
                priority
              />
              {row.getValue("status")}
              <p>{row?.original?.attributes?.name || "no img"}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "A direction",
        cell: ({ row }) => <div>{row.original.attributes.directionAScore}</div>,
      },
      {
        accessorKey: "status",
        header: "B direction",
        cell: ({ row }) => (
          <div>{row?.original?.attributes?.directionBScore}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "C direction",

        cell: ({ row }) => (
          <div className="lowercase">
            {row?.original?.attributes?.directionDScore}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Total score",
        cell: ({ row }) => (
          <div className="lowercase">
            {row?.original?.attributes?.totalScore}
          </div>
        ),
      },
    ],
    [currentPage, translations],
  );

  const table = useReactTable({
    data: rating || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="mt-16 w-full border bg-white p-6 shadow-sm">
      <div className=" ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={index}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={index}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-200 transition duration-200 ease-in-out"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={index}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {translations.common?.no_results}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="flex cursor-pointer justify-between space-x-2 border-t pt-[30px]">
          <Button
            variant="outline"
            className="tab-b cur w-9 xs:h-9 sm:w-[83px] md:w-[83px] lg:w-[83px] xl:w-[83px] 2xl:w-[83px]"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <div>
              <ArrowLeft size={20} color="#737373" />
            </div>
            <span className="ml-2 text-sm font-semibold text-customSilver xs:hidden sm:block md:block lg:block xl:block 2xl:block">
              {translations.common?.previous}
            </span>
          </Button>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <Button
            variant="outline"
            className="tab-b cur w-9 xs:h-9 sm:w-[58px] md:w-[58px] lg:w-[58px] xl:w-[58px] 2xl:w-[58px]"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="mr-2 text-sm font-semibold text-customSilver xs:hidden sm:block md:block lg:block xl:block 2xl:block">
              {translations.common?.next}
            </span>
            <div>
              <ArrowRight color="#737373" size={20} />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
