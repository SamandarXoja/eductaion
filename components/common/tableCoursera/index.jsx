"use client";

import React, { useMemo } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useTranslations from "@/hooks/utils/use-translation";

import { cn } from "@/lib/utils";

import "./style.css";

export function TableCoursera({ data, className }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const router = useRouter();

  const columns = useMemo(
    () => [
      {
        header: "#",
        id: "number",
        size: "3%",
        cell: ({ row }) => row.index + 1,
      },

      {
        size: "45%",
        accessorKey: "name",
        header: "Xalqaro IT-sertificat nomi",
        cell: ({ row }) => <div>{row?.original?.attributes?.name}</div>,
      },
      {
        size: "20%",
        accessorKey: "level",
        header: "Level",
        cell: ({ row }) => <div>{row?.original?.attributes?.level}</div>,
      },
      {
        size: "5%",
        accessorKey: "bonus",
        header: "Bonus",
        cell: ({ row }) => (
          <div className="text-[#0056D2]">
            {row?.original?.attributes?.bonus}
          </div>
        ),
      },
    ],
    [translations],
  );

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="px-4">
      <div
        style={{
          boxShadow: `0px 20px 40px 0px #0A0A0A0F`,
          border: `1px solid #E5E5E5`,
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          overflowX: "auto",
          width: "100%",
        }}
        className={cn("my-16 pb-6 pt-4 xl:container", className)}
      >
        <div>
          <Table className="min-w-[500px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} style={{ border: "none" }}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    style={{ cursor: "pointer" }}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => router.push(row.original.attributes.url)}
                    className="row-course font-medium"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.columnDef.size }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
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
      </div>
    </div>
  );
}
