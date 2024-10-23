"use client";

import React, { Suspense } from "react";

import Courses from "./courses-page";

function CoursesPage() {
  return (
    <Suspense>
      <Courses />
    </Suspense>
  );
}

export default CoursesPage;
