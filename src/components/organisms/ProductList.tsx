"use client";

import React, { useEffect, useState, useCallback } from "react";
import { DataView } from "primereact/dataview";
import { ProgressSpinner } from "primereact/progressspinner";
import ProductCard from "@/components/molecules/ProductCard";
import FilterControls from "@/components/molecules/FilterControls";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/api/product";

interface ProductListProps {
  initialCategories: string[];
}

const ProductList: React.FC<ProductListProps> = ({ initialCategories }) => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const limit = 10;

  const fetchProducts = useCallback(
    async (currentOffset: number) => {
      setLoading(true);
      try {
        const allProducts = await getProducts({ limit: 0 });

        let filtered = allProducts;

        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const sort = searchParams.get("sort");

        if (minPrice !== undefined && minPrice !== null) {
          filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
        }
        if (maxPrice !== undefined && maxPrice !== null) {
          filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
        }
        if (search) {
          const lowerCaseSearch = search.toLowerCase();
          filtered = filtered.filter((p) =>
            p.title.toLowerCase().includes(lowerCaseSearch)
          );
        }
        if (category && category !== "all") {
          filtered = filtered.filter((p) => p.category === category);
        }

        if (sort) {
          filtered.sort((a, b) => {
            if (sort === "asc") {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          });
        }

        setTotalProducts(filtered.length);
        setProducts(filtered.slice(currentOffset, currentOffset + limit));
      } catch (error) {
        console.error("Ürünler çekilirken hata oluştu:", error);
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    },
    [searchParams]
  );

  useEffect(() => {
    const currentOffsetFromUrl = parseInt(
      searchParams.get("offset") || "0",
      10
    );
    fetchProducts(currentOffsetFromUrl);
  }, [fetchProducts, searchParams]);

  const currentOffsetForDataView = parseInt(
    searchParams.get("offset") || "0",
    10
  );
  const sortField = searchParams.get("sort") === "desc" ? "price" : "price";
  const sortOrder = searchParams.get("sort") === "desc" ? -1 : 1;
  const itemTemplate = (product: Product) => {
    return (
      <div className="col-12 sm:col-6 md:col-4 p-3">
        <ProductCard product={product} />
      </div>
    );
  };

  const onPage = (event: {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
  }) => {
    const newOffset = event.first;
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("offset", newOffset.toString());
    // const newUrl = `${pathname}?${currentParams.toString()}`;

    // router.push(newUrl);
    fetchProducts(newOffset);
  };

  return (
    <div className="product-list-container">
      <FilterControls initialCategories={initialCategories} />

      {loading ? (
        <div className="loading-container">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <DataView
          value={products}
          itemTemplate={itemTemplate}
          paginator
          rows={limit}
          first={currentOffsetForDataView}
          totalRecords={totalProducts}
          onPage={onPage}
          layout="grid"
          sortField={sortField}
          sortOrder={sortOrder}
          emptyMessage="Gösterilecek ürün bulunamadı. Filtreleri veya arama terimini değiştirmeyi deneyin."
          className="product-dataview"
        />
      )}
    </div>
  );
};

export default ProductList;
