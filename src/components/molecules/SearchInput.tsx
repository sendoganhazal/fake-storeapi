"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = new URLSearchParams(params.toString());
    search.set("q", e.target.value);
    router.push(`/?${search.toString()}`);
  };

  return <input placeholder="Search product..." onChange={onChange} className="form-control" />;
}
