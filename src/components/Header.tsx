import Image from "next/image";
import React from "react";
import {
  UserCircleIcon,
  UsersIcon,
  GlobeAltIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

interface Props {
  placeholder?: string;
}

const Header = ({ placeholder }: Props) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [noOfGuests, setNoOfGuests] = React.useState(1);

  const selectionRange = [
    {
      startDate,
      endDate,
      key: "selection",
    },
  ];

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-4 md:grid-cols-3 bg-white shadow-md p-5 md:px-10 ">
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={() => router.push("/")}
      >
        <Image
          src="https://i.ibb.co/zhqKhxB/Airbnb-Logo-Be-lo-svg.png"
          alt="Airbnb Logo"
          fill={true}
          className="object-contain object-left"
          sizes="100%"
        />
      </div>
      {/* search bar */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm col-span-2 md:col-span-1">
        <input
          value={searchInput}
          type="text"
          placeholder={placeholder || "Start your search"}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-full"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <MagnifyingGlassIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 " />
      </div>
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {searchInput && (
        <div className="absolute top-20 w-full z-50 flex flex-row sm:flex-col items-center ">
          <div className="max-w-[30.3rem] sm:max-w-md md:max-w-none rounded-b-xl bg-white overflow-x-auto shadow-lg p-3">
            <DateRangePicker
              ranges={selectionRange}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={handleSelect}
              className="w-full"
            />
            <div className="flex items-center border-b mb-1 pb-3">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5 text-gray-500" />
              <input
                value={noOfGuests}
                onChange={(e) => setNoOfGuests(e.target.valueAsNumber)}
                type="number"
                min={1}
                className="w-12 pl-2 text-lg outline-none text-red-400"
              />
            </div>
            <div className="flex">
              <button
                type="button"
                className="flex-grow text-gray-500"
                onClick={resetInput}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-grow text-red-400"
                onClick={search}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
