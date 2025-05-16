import Link from "next/link";

import React from "react";
import Paragraph from "../shared/Paragraph";
import NextImage from "../common/NextImage";
import Image from "next/image";

const ClassCard = ({ cls }) => {
  return (
    <div className="rounded-3xl flex flex-col border border-box-border bg-box-bg shadow-lg shadow-box-shadow relative overflow-hidden">
      <div className="">
        <Image
          src={cls?.cover_img || "/classes/bg-1.jpg"}
          width={300}
          height={300}
          className={"w-full max-h-[12rem] object-fill"}
          alt={cls?.name || "IMAGE"}
        />
      </div>
      <Link
        href={`/dashboard/classes/${cls._id}`}
        className="p-2 sm:p-6 lg:p-5 "
      >
        <div className=" space-y-4 relative">
          <h2 className="text-lg md:text-xl font-semibold text-heading-2 hover:text-blue-700">
            {cls.name}
          </h2>

          <Paragraph>{cls.description}</Paragraph>
        </div>
      </Link>
    </div>
  );
};

export default ClassCard;
