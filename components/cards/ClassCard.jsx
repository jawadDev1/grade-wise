import Link from "next/link";

import React from "react";
import Paragraph from "../shared/Paragraph";

const ClassCard = ({ cls }) => {
  return (
    <Link
      href={`/dashboard/classes/${cls._id}`}
      className="p-2 sm:p-6 lg:p-5 rounded-3xl border border-box-border bg-box-bg shadow-lg shadow-box-shadow relative overflow-hidden"
    >
      <div className=" space-y-4 relative">
        <h2 className="text-lg md:text-xl font-semibold text-heading-2 hover:text-blue-700">
          {cls.name}
        </h2>

        <Paragraph>{cls.description}</Paragraph>
      </div>
    </Link>
  );
};

export default ClassCard;
