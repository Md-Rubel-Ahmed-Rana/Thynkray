import SEOHead from "@/components/common/SEOHead";
import Profile from "@/components/profile";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const { query } = useRouter();
  const name = query?.name as string;
  return (
    <>
      <SEOHead title={`Profile - ${name || "unknown"}`} />
      <Profile />
    </>
  );
};

export default ProfilePage;
