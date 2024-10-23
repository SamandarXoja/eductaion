"use client";

import React, { Suspense } from "react";

import ProfilePage from "./profile-page";

export default function Profile() {
  return (
    <Suspense>
      <ProfilePage />
    </Suspense>
  );
}
