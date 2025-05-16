"use client";
import React from "react";
import dynamic from "next/dynamic";

import { Text } from "@radix-ui/themes";
import { FormLabel } from "./form";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

export const StudentMultiSelect = ({
  data,
  name,

  label,
  required = false,
  error,
  value,
  onChange,
  ...props
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (option) => {
    if (Array.isArray(option) && option.length > 0) {
      onChange(option.map((option) => option.value));
    } else if (Array.isArray(option) && option.length == 0) {
      onChange(option.map((option) => option.value));
    }
    if (!Array.isArray(option)) {
      if (option.label == "Inactive" || option.label == "Active") {
        const val = option.label == "Inactive" ? 0 : 1;
        onChange(val);
      } else {
        onChange(option.value);
      }
    }
  };

  let initialValues;
  if (Array.isArray(value) && value.length > 0) {
    initialValues = data.filter((option) => value.includes(option.value));
  } else {
    initialValues = data.find(
      (option) => option.value === value || option.value == Boolean(value)
    );
  }
  return (
    <>
      {label && <FormLabel {...{ label, required }} />}
      {isMounted ? (
        <Select
          name={name}
          options={data}
          value={initialValues}
          className="focus:z-20 bg-transparent"
          onChange={(option) => handleChange(option)}
          isMulti={true}
          styles={{ backgroundColor: 'red' }}
          {...props}
        />
      ) : (
        <div className="h-10 w-full rounded-md border border-gray-200 bg-transparent animate-pulse" />
      )}
      {error && <Text as="p" className="text-red-600" {...{ error }} />}
    </>
  );
};
