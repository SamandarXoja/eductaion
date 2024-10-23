"use client";

import React from "react";

import dayjs from "dayjs";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

import "./courses.css";

function Courses({ data, className }) {
  const { locale } = useParams();

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
        <div className="min-w-[1000px] p-3">
          <Table>
            <TableHeader style={{ padding: 0 }}>
              <TableRow style={{ border: "none"}}>
                <TableHead style={{ width: "3%", padding: 0 }}>№</TableHead>
                <TableHead style={{ width: "48%", padding: 0 }}>
                  Kurs nomi
                </TableHead>
                <TableHead style={{ width: "12%", padding: 0 }}>
                  Davomiyligi
                </TableHead>
                <TableHead style={{ width: "12%", padding: 0 }}>
                  Haftasiga
                </TableHead>
                <TableHead style={{ width: "12%", padding: 0 }}>
                  Level
                </TableHead>
                <TableHead style={{ width: "8%", padding: 0 }}>
                  Tajriba kerak
                </TableHead>
              </TableRow>
            </TableHeader>{" "}
          </Table>

          {data.map(({ attributes, id }, parentIndex) => (
            <div key={id}>
              <div className="section-row w-full bg-[#F5F5F5] p-4 text-center">
                <h4 className="text-sm font-medium">
                  {attributes?.[`name_${locale}`]}
                </h4>
              </div>
              {attributes.courseMarkups.data.map(
                ({ attributes: data, id }, index) => {
                  return (
                    <Link
                      key={id}
                      className="row transition duration-400  ease-in-out hover:shadow-md"
                      href={data.url}
                      target="_blank"
                    >
                      <div
                        style={{
                          width: "3%",
                          padding: "4px",
                          fontSize: "12px",
                          color: "#737373",
                          fontWeight: "600",
                          lineHeight: "19.2px",
                        }}
                       
                      >
                        {parentIndex * attributes?.courseMarkups?.data?.length +
                          index +
                          1}
                      </div>
                      <div
                        style={{
                          width: "65%",
                        }}
                      >
                        {data.name}
                      </div>
                      <div
                        style={{
                          width: "16.5%",
                        }}
                      >
                        {data.duration} oy
                      </div>
                      <div
                        style={{
                          width: "16.5%",
                        }}
                      >
                        {data.weekly} soat
                      </div>
                      <div
                        style={{
                          width: "16.5%",
                        }}
                      >
                        {data.level}
                      </div>
                      <div
                        style={{
                          width: "10%",
                        }}
                      >
                        {data.isExperienceRequired ? "Ha" : "Yo'q"}
                      </div>
                    </Link>
                  );
                },
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
