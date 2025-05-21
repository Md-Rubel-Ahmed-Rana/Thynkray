import SEOHead from "@/components/common/SEOHead";
import Dashboard from "@/components/dashboard";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const DashboardPage = () => {
  const { query } = useRouter();
  const name = query?.name as string;
  return (
    <>
      <SEOHead title={`Dashboard - ${name || "unknown"}`} />
      <Dashboard />
    </>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
