import Header from "../src/components/header.jsx";
import Head from "next/head.js";
import Script from "next/script.js";
import dynamic from "next/dynamic";
import Footer from "../src/components/footer.jsx";
import Hero from "@/components/hero.jsx";

const Index = () => {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="description" content="" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>Bestglobeshop</title>
      </Head>
      <Head>
        <link rel="icon" href="/img/core-img/favicon.ico" />
      </Head>

      <Header />
      <Hero
        collection_brand={
          "fhsgfjhdsfgsdghfgdfgsdfgsdfgsdhfsdghjsdgfhsdfgfgdsjfgsdfgsdhfg"
        }
        collection_name={"fhdjskfhdskjfhsdjkf"}
        collection_url={"/"}
        image_url={
          "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg"
        }
      />
      <Footer />

      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/../src/js/popper.min.js" strategy="beforeInteractive" />
      <Script src="/../src/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="/../src/js/plugins.js" strategy="beforeInteractive" />
      <Script src="/../src/js/classy-nav.min.js" strategy="beforeInteractive" />
      <Script src="/../src/js/active.js" strategy="beforeInteractive" />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
