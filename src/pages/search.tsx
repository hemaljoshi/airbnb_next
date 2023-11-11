import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { format } from "date-fns";
import React from "react";
import axios from "axios";
import InfoCard from "@/components/InfoCard";
import Map from "@/components/Map";
import { LockClosedIcon, XMarkIcon } from "@heroicons/react/24/solid";

export interface SearchProps {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
  long: number;
  lat: number;
}

interface Props {
  searchResults: SearchProps[];
}

const Search = ({ searchResults }: Props) => {
  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;

  const [openMapModal, setOpenMapModal] = React.useState(false);

  const formattedStartDate = React.useMemo(() => {
    if (typeof startDate === "string") {
      return format(new Date(startDate), "dd MMMM yyyy");
    }
    return;
  }, [startDate]);

  const formattedEndDate = React.useMemo(() => {
    if (typeof endDate === "string") {
      return format(new Date(endDate), "dd MMMM yyyy");
    }
    return;
  }, [endDate]);

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className="flex ">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} number of guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <p
            className="lg:hidden filter-btn mb-10 w-fit"
            onClick={() => setOpenMapModal(!openMapModal)}
          >
            Check Map
          </p>

          <div className="hidden lg:inline-flex mb-5 space-x-5 text-gray-800 whitespace-nowrap">
            <p className="filter-btn">Cancelellation flexibility</p>
            <p className="filter-btn">Type of place</p>
            <p className="filter-btn">Price</p>
            <p className="filter-btn">Rooms and beds</p>
            <p className="filter-btn">More filters</p>
          </div>
          <div className="xs:mx-2 flex flex-col space-y-3 overflow-y-scroll scroll-smooth pb-4 scrollbar-hide">
            {searchResults.map(
              (
                { description, img, location, price, star, title, total },
                index
              ) => (
                <InfoCard
                  key={index}
                  description={description}
                  img={img}
                  location={location}
                  price={price}
                  star={star}
                  title={title}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden lg:inline-flex flex-grow min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>

        {openMapModal && (
          <div className="flex items-center justify-center h-full w-screen fixed top-10 bg-black bg-opacity-40 ">
            <div className="inline-block align-center rounded-lg text-left shadow-xl h-4/5 w-4/5 overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 max-h-full bg-white ">
                <h2 className="text-xl font-semibold">Map</h2>
                <XMarkIcon
                  className="h-7 cursor-pointer"
                  onClick={() => setOpenMapModal(!openMapModal)}
                />
              </div>
              <Map searchResults={searchResults} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps(params: any) {
  const searchResults = await axios("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.data
  );

  return {
    props: {
      searchResults,
    },
  };
}
