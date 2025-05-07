import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";;
import React from "react";

const ClassCard = ({ cls}) => {
  return (
    <Link  href={`/dashboard/classes/${cls._id}`}>
      <Card className="hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle>{cls.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm line-clamp-3 " >{cls.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ClassCard;
