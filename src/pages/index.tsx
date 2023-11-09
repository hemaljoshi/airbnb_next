import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import axios from "axios";
import SmallCard from "@/components/SmallCard";
import MediumCard from "@/components/MediumCard";
import Largcard from "@/components/Largcard";
import Footer from "@/components/Footer";

export interface ExploreData {
  img: string;
  location: string;
  distance: string;
}

export interface CardsData {
  img: string;
  title: string;
}

interface Props {
  exploreData: ExploreData[];
  cardsData: CardsData[];
}

export default function Home({ exploreData, cardsData }: Props) {
  return (
    <main>
      <Head>
        <title>Airbnb 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, location, distance }, index) => (
              <SmallCard
                key={index}
                img={img}
                location={location}
                distance={distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }, index) => (
              <MediumCard key={index} img={img} title={title} />
            ))}
          </div>
        </section>

        <Largcard
          img="https://i.ibb.co/GJsgBJL/2da67c1c-0c61-4629-8798-1d4de1ac9291.webp"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const exploreData = await axios
    .get("https://www.jsonkeeper.com/b/9F6D")
    .then((res) => res.data);

  const cardsData = await axios("https://www.jsonkeeper.com/b/VHHT").then(
    (res) => res.data
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
