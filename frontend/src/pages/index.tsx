import Home from "@/components/home";
import SEOHead from "@/components/common/SEOHead";
import RootLayout from "@/layout/RootLayout";
import { GetStaticProps } from "next";
import { ReactElement } from "react";
import fetchHomepageData, { HomePageProps } from "@/lib/fetchHomeData";

export default function HomePage(props: HomePageProps) {
  return (
    <>
      <SEOHead title="Home - Thynkray" />
      <Home {...props} />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const data = await fetchHomepageData();

  return {
    props: data,
    revalidate: 86400,
  };
};

HomePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
