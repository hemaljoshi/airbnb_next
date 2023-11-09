import { CardsData } from "@/pages";
import Image from "next/image";
import React from "react";

const MediumCard = ({ img, title }: CardsData) => {
  return (
    <div className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image
          src={img}
          alt=""
          fill={true}
          className="rounded-xl"
          sizes="100%"
        />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
};

export default MediumCard;
