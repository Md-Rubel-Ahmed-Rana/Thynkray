import { initializeGoogleOneTap } from "@/modules/user/api";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const GoogleOneTapSignin = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      if (!session?.user?.email) {
        if (window.google) {
          initializeGoogleOneTap();
        } else {
          window.addEventListener("DOMContentLoaded", () => {
            initializeGoogleOneTap();
          });
        }
      } else {
        return;
      }
    }
  }, [session, status]);

  return (
    <script src="https://accounts.google.com/gsi/client" async defer></script>
  );
};

export default GoogleOneTapSignin;
