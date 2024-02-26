import MainLayout from "@/app/[lang]/layouts/Mainlayout";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import SSRCourse from "@/app/[lang]/learn/course/[course]/ssrcourse";
import CoursesAPI from "@/app/api/Learn/Course";

type Props = {
  params: { course: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  return {
    title: `${params.course}`,
    description: `სასწავლო კურსი - ${params.course}`,
  };
};

export default function CoursePage({
  params: { lang, course },
}: {
  params: { lang: Locale; course: string };
}) {
  return (
    <MainLayout lang={lang}>
      <SSRCourse params={{ lang, course }} />
    </MainLayout>
  );
}
