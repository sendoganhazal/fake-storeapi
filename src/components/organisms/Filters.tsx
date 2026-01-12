"use client";

type Props = {
  categories: string[];
  sort: "" | "asc" | "desc";
  category: string;
  onSortChange: (value: "" | "asc" | "desc") => void;
  onCategoryChange: (value: string) => void;
};

export default function Filters({
   categories,
  sort,
  category,
  onSortChange,
  onCategoryChange,
}: Props) {


  return (
    <div className="form-group">
      {/* SORT */}
      <select
      className="form-select"
        value={sort}
        onChange={(e) =>
          onSortChange(e.target.value as "" | "asc" | "desc")
        }
      >
        <option value="">Default</option>
        <option value="asc">Price ↑</option>
        <option value="desc">Price ↓</option>
      </select>

      {/* CATEGORY */}
      <select
      className="form-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
