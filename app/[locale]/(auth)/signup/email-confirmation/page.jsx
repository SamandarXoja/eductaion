"use client";

import { Suspense } from "react";

import EmailConfirmation from "./email-confirmation-page";

function EmailConfirmationPage() {
  return (
    <Suspense>
      <EmailConfirmation />
    </Suspense>
  );
}

export default EmailConfirmationPage;
