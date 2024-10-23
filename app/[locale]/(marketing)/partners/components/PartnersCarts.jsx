"use client";

import React, { useState } from "react";

import axios from "axios";
import { useParams } from "next/navigation";

import { PARTNERS_PAGE_SIZE } from "@/constants";
import translations from "@/translations";

import PartnerCard from "./partner-card";

function PartnersCarts({ data, title, isGlobal }) {
  const { locale } = useParams();
  const [items, setItems] = useState(data?.data);
  const [page, setPage] = useState(1);

  async function addCarts() {
    const res = await axios.get(
      `https://admin.it-ea.uz/api/partners?populate=deep&filters[isGlobal][$eq]=${!!isGlobal}&pagination[page]=${page + 1}&pagination[pageSize]=${PARTNERS_PAGE_SIZE}&sort[0]=id:asc`,
    );

    setItems((data) => [...data, ...res.data.data]);
    setPage((prev) => prev + 1);
  }

  return (
    <section className="bg-customGray">
      <div className="mx-auto w-full max-w-[1208px] px-[24px] pb-24">
        <h2 className="mb-12  text-[52px] font-semibold">{title}</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {items.map((item) => {
            return <PartnerCard key={item.id} partner={item} locale={locale} />;
          })}
        </div>
        {page !== data?.meta.pagination.pageCount && (
          <button
            onClick={addCarts}
            className="mx-auto mt-12 block w-full max-w-[160px] rounded-full bg-primary py-4 text-center font-semibold text-white"
          >
            {translations.common?.view_more}
          </button>
        )}
      </div>
    </section>
  );
}

export default PartnersCarts;
