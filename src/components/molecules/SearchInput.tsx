"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState(value);

  // URL'den gelen value değişirse input da güncellensin
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <input
      type="text"
      placeholder="Search by product title"
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value);
        onChange(e.target.value);
      }}
     className="form-control"
    />
  );
}
