"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/fetcher/api-fetcher";
import ProductList from "@/components/organisms/ProductList";
import Filters from "@/components/organisms/Filters";
import Pagination from "@/components/molecules/Pagination";
import { Product } from "@/lib/types/types";
import SearchInput from "@/components/molecules/SearchInput";

const PAGE_SIZE = 10;

type Props = {
  categories: string[];
};

export default function ProductsClient({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
 const initialPage = Number(searchParams.get("page")) || 1;
  const initialSort = (searchParams.get("sort") as "" | "asc" | "desc") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(initialPage);
  const [sort, setSort] = useState<"" | "asc" | "desc">(initialSort);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", String(page));
    if (sort) params.set("sort", sort);
    if (category) params.set("category", category);
    if (search) params.set("search", search);

    router.replace(`/?${params.toString()}`, { scroll: false });
  }, [page, sort, category, search, router]);


  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    if (search) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "asc") {
      list = [...list].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sort === "desc") {
      list = [...list].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    return list;
  }, [allProducts, category, sort, search]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);


  return (
    <>
      <section className="filters-section">
        <SearchInput
          value={search}
          onChange={(value) => {
            setPage(1);
            setSearch(value);
          }}
        />

        <Filters
          categories={categories}
          sort={sort}
          category={category}
          onSortChange={(value) => {
            setPage(1);
            setSort(value);
          }}
          onCategoryChange={(value) => {
            setPage(1);
            setCategory(value);
          }}
        />
      </section>

      <ProductList products={paginatedProducts} />

      <Pagination
        page={page}
        total={filteredProducts.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </>
  );
}
