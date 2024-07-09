/* eslint-disable @next/next/no-img-element */
import React from "react";

const Card = ({ img, heading, para, bg = false }: { img: any, heading: any, para: any, bg: boolean }) => {
  return (
    <div
      className={`${bg ? "bg-primary" : "bg-[#0e212f]"
        } p-5 rounded-2xl border border-primary col-span-12 lg:col-span-4 lg:row-span-6 flex flex-col items-center mb-5 lg:mb-0`}
    >
      <div className="bg-[#0E212F] w-fit h-fit mb-4 rounded-xl">
        <img
          alt=""
          loading="lazy"
          width="48"
          height="49"
          decoding="async"
          data-nimg="1"
          className="m-5 text-transparent"
          src={img}
        />
      </div>
      <h4 className="text-darkgray mb-2 text-base leading-relaxed lg:text-xl font-bold lg:leading-snug text-center">
        {heading}
      </h4>
      <p className="text-darkgray text-xs leading-loose text-center lg:text-base lg:leading-relaxed __className_cbf3c0">
        {para}
      </p>
    </div>
  );
};

export default Card;
