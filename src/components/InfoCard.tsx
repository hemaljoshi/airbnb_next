import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

interface Props {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
}

const InfoCard = ({
  description,
  img,
  location,
  price,
  star,
  title,
  total,
}: Props) => {
  return (
    <div className="flex py-7 px-2 cursor-pointer hover:opacity-80 hover:shadow-lg border-b transition duration-200 ease-out first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink">
        <Image
          src={img}
          fill={true}
          className="rounded-2xl object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>

        <h4 className="text-xl">{title}</h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-lg font-semibold pb-2 lg:text-2xl">{price}</p>
          <p className="text-right font-extralight">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
