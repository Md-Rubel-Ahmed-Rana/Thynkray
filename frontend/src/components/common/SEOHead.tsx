import Head from "next/head";

type SEOHeadProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const SEOHead = ({
  title = "Thynkray | Elevate Your Thinking",
  description = "A modern blog for curious minds. Read articles on tech, design, productivity, and more.",
  children,
}: SEOHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
};

export default SEOHead;
