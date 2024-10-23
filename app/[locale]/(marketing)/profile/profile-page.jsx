"use client";

import React, { useEffect, useState } from "react";

import { Loader } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Button } from "@/components/ui/button";

import CourseCard from "@/components/common/course-card";

import useTranslations from "@/hooks/utils/use-translation";

import { fetchUserCourses } from "@/services/api/coursera";
import { fetchProfile } from "@/services/api/profile";
import { createQueryString } from "@/services/query-string";

import NoData from "./no-data";
import ProfileCard from "./profile-card";

export default function ProfilePage() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();
  const searchParams = useSearchParams();
  const tabValue = searchParams.get("tab");
  const translations = useTranslations(locale);

  const [profile, setProfile] = useState({});
  const [pendingCourses, setPendingCourses] = useState([]);
  const [finishedCourses, setFinishedCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const tabs = [
    {
      title: translations.profile.ongoing_courses,
      value: "pending",
    },
    {
      title: translations.profile.completed_courses,
      value: "finished",
    },
  ];

  const handleTabChange = (value) => {
    replace(`${pathname}?${createQueryString(searchParams, "tab", value)}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!!token) {
      setProfileLoading(true);
      setCoursesLoading(true);

      fetchProfile()
        .then((profile) => {
          setProfile(profile);

          fetchUserCourses(profile?.externalId)
            .then((data) => {
              const pending =
                data?.elements?.filter(
                  (course) => !course?.progress.isCompleted,
                ) || [];
              const finished =
                data?.elements?.filter(
                  (course) => course?.progress?.isCompleted,
                ) || [];

              setPendingCourses(pending);
              setFinishedCourses(finished);
            })
            .finally(() => {
              setCoursesLoading(false);
            });
        })
        .catch(() => setCoursesLoading(false))
        .finally(() => setProfileLoading(false));
    }
  }, []);

  useEffect(() => {
    const isTabValid = tabs.some((tab) => tab.value === tabValue);

    if (!isTabValid) {
      handleTabChange(tabs[0]?.value);
    }
  }, [tabs, tabValue]);

  return (
    <div className="mx-auto max-w-[984px] px-8 py-16">
      <ProfileCard
        profile={profile}
        setProfile={setProfile}
        isLoading={profileLoading}
      />

      <div>
        <div className="mb-8 flex items-center space-x-3">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={tabValue === tab.value ? "default" : "ghost"}
              onClick={() => handleTabChange(tab.value)}
              className="rounded-full"
            >
              {tab.title}
            </Button>
          ))}
        </div>
        {coursesLoading ? (
          <div className="py-20">
            <Loader className="mx-auto h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div>
            {tabValue === "pending" ? (
              pendingCourses.length ? (
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(290px, max-content)",
                  }}
                >
                  {pendingCourses.map(({ content }) => (
                    <CourseCard key={content.id} course={content} />
                  ))}
                </div>
              ) : (
                <NoData />
              )
            ) : null}
            {tabValue === "finished" ? (
              finishedCourses.length ? (
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(290px, max-content)",
                  }}
                >
                  {finishedCourses.map(({ content }) => (
                    <CourseCard key={content.id} course={content} />
                  ))}
                </div>
              ) : (
                <NoData />
              )
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
