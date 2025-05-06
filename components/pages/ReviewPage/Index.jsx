import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { generateResponse } from "@/helpers/generateResponse";
import { SERVICES } from "@/services";
import { redirect } from "next/navigation";

const ReviewPage = async ({ id }) => {
  const response = await generateResponse(
    SERVICES.AIService.getReviewDetails(id)
  );

  const { data } = await response.json();

  //   if (!data) redirect("/");

  const { title, review, marks } = data;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className=" text-gray-600">{review}</CardDescription>

          <div className="mt-2 text-sm text-gray-500 font-medium">
            <span className="font-bold text-gray-900">Marks:</span>
            <ul className="list-disc pl-6 mt-2">
              {Object.entries(marks).map(([key, value]) => (
                <li key={key} className="text-gray-600">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                  : {value}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPage;
