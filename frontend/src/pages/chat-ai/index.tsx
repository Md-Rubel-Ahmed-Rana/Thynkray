import ChatAI from "@/components/chat";
import ChatUI from "@/components/chat/GeneratedLayout";
import SEOHead from "@/components/common/SEOHead";
import ChatLayout from "@/layout/ChatLayout";
import { ReactElement } from "react";

const ChatAIPage = () => {
  return (
    <>
      <SEOHead title={"Chat with AI - Thynkray"} />
      <ChatUI />
    </>
  );
};

export default ChatAIPage;

// ChatAIPage.getLayout = function (page: ReactElement) {
//   return <ChatLayout>{page}</ChatLayout>;
// };
