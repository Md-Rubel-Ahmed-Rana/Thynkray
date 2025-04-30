import SEOHead from "@/components/common/SEOHead";
import Dashboard from "@/components/dashboard";
import { useRouter } from "next/router";

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
