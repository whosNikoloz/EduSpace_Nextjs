import Secondlayout from "@/app/[lang]/layouts/Secondlayout";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import SSRCourse from "@/app/[lang]/learn/course/[course]/ssrcourse";
import CoursesAPI from "@/app/api/Learn/Course";

type Props = {
  params: { lang: Locale; course: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const CourseName = await CoursesAPI().GetCourseName(
    params.course,
    params.lang
  );
  return {
    title: `${CourseName}`,
    description: `სასწავლო კურსი - ${CourseName}`,
  };
};

export default function CoursePage({
  params: { lang, course },
}: {
  params: { lang: Locale; course: string };
}) {
  return (
    <Secondlayout lang={lang}>
      <SSRCourse params={{ lang, course }} />
    </Secondlayout>
  );
}
