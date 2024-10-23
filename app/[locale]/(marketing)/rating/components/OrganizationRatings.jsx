"use client";

import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { useParams } from "next/navigation";

import { DataTableDemo } from "@/components/common/ratingtable";

import useOnScreen from "@/hooks/utils/use-on-screen";

import { PAGE_SIZE } from "@/constants";

function OrganizationRatings({
  data: { title, description },
  rating,
  orgType,
}) {
  const { locale } = useParams();
  const [activeOrgId, setActiveOrgId] = useState(orgType[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    rating.meta.pagination.pageCount,
  );
  const [data, setData] = useState(rating.data);
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  const fetchData = async (page, id) => {
    const { data } = await axios.get(
      `https://admin.it-ea.uz/api/organization-ratings?populate=deep&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&filters[organization_type][id][$eq]=${id || activeOrgId}`,
    );

    setData(data.data);
    setTotalPages(data.meta.pagination.pageCount);
  };

  const handlePageChange = (newPage, id) => {
    if (id !== activeOrgId) {
      setCurrentPage(newPage);
      fetchData(newPage, id);
    }
  };

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [elementRef, isOnScreen]);

  return (
    <section className="bg-[#FAFAFA] py-[120px]">
      <div ref={elementRef} className="opacity-0">
        <div className="mx-auto w-full max-w-[1208px] px-6">
          <h2 className="text-[52px] font-semibold">{title}</h2>
          <p className="w-full max-w-[767px] text-lg text-customSilver">
            {description}
          </p>
          <div className="mt-16 flex gap-5">
            {orgType.map(({ attributes, id }) => (
              <button
                key={id}
                className={`rounded-full  px-5 py-2 text-sm font-semibold text-customSilver ${
                  activeOrgId === id && "bg-primary text-white"
                }`}
                onClick={() => {
                  setActiveOrgId(id);
                  handlePageChange(1, id);
                }}
              >
                {attributes.name[`name_${locale}`]}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1208px] px-6">
          <DataTableDemo
            rating={data}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}

export default OrganizationRatings;
