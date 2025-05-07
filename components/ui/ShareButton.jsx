import React from "react";
import { Button } from "./button";

import { Share2 } from "lucide-react";
import { notifySuccess } from "@/lib/utils";

const ShareButton = ({id}) => {
  const handleShare = () => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/join/${id}`;

    window.navigator.clipboard.writeText(url);

    notifySuccess("Link copied successfully");
  };

  return (
    <Button onClick={handleShare}>
      <Share2 />
    </Button>
  );
};

export default ShareButton;
