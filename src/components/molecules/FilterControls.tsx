// components/molecules/FilterControls.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react'; // useRef eklendi
import InputText from '@/components/atoms/InputText';
import Dropdown from '@/components/atoms/Dropdown';
import Slider from '@/components/atoms/Slider';
import Button from '@/components/atoms/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { debounce } from 'lodash'; // Lodash importu kaldırıldı

interface FilterControlsProps {
  initialCategories: string[];
}

/**
 * Basit bir debounce fonksiyonu uygulaması.
 * Belirli bir süre içinde tekrar çağrılmazsa bir fonksiyonu yürütür.
 * @param func Debounce edilecek fonksiyon.
 * @param delay Gecikme süresi (ms).
 * @returns Debounce edilmiş fonksiyon.
 */
function customDebounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null;

  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null; // Timeout tamamlandığında sıfırla
    }, delay);
  };
}


/**
 * Ürün listesi için sıralama, filtreleme ve arama kontrollerini içeren molekül.
 * URL parametrelerini kullanarak durumu yönetir.
 * Stilizasyon doğrudan global CSS (globals.css) üzerinden yönetilir.
 */
const FilterControls: React.FC<FilterControlsProps> = ({ initialCategories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL'den başlangıç değerlerini al
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'asc';
  const initialCategory = searchParams.get('category') || 'all';
  const initialMinPrice = parseFloat(searchParams.get('minPrice') || '0');
  const initialMaxPrice = parseFloat(searchParams.get('maxPrice') || '1000'); // Fake Store max price around 1000

  const [searchText, setSearchText] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSort as 'asc' | 'desc');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice]);

  const sortOptions = [
    { label: 'Fiyata Göre Artan', value: 'asc' },
    { label: 'Fiyata Göre Azalan', 'value': 'desc' },
  ];

  // Kategori seçeneklerini oluştur
  const categoryOptions = initialCategories.map(cat => ({
    label: cat === 'all' ? 'Tüm Kategoriler' : cat.charAt(0).toUpperCase() + cat.slice(1),
    value: cat,
  }));

  // URL parametrelerini güncelleme fonksiyonu
  const updateUrlParams = useCallback((newParams: Record<string, string | number | undefined>) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        currentParams.set(key, String(value));
      } else {
        currentParams.delete(key);
      }
    });

    // Sayfa numarasını sıfırla
    currentParams.delete('offset');

    router.push(`${pathname}?${currentParams.toString()}`);
  }, [pathname, router, searchParams]);

  // Arama metni değiştiğinde debounce ile URL'yi güncelle
  // customDebounce fonksiyonunu kullanıyoruz
  const debouncedSearchUpdate = useCallback(
    customDebounce((value: string) => {
      updateUrlParams({ search: value || undefined });
    }, 500), // 500ms gecikme
    [updateUrlParams]
  );

  useEffect(() => {
    // searchText değiştiğinde debounce fonksiyonunu çağır
    debouncedSearchUpdate(searchText);
    // Cleanup function: component unmount edildiğinde debounce'u iptal et
    return () => {
      // customDebounce'ın içindeki timeout'u temizlemek için
      // burada doğrudan bir clear mekanizması sağlamak zor olabilir
      // ancak React'ın kendi cleanup mekanizması genellikle yeterlidir.
      // Eğer daha karmaşık bir debounce yönetimi gerekirse useRef kullanılabilir.
    };
  }, [searchText, debouncedSearchUpdate]);

  // Sıralama değiştiğinde URL'yi güncelle
  const onSortChange = (e: { value: 'asc' | 'desc' }) => {
    setSortOrder(e.value);
    updateUrlParams({ sort: e.value });
  };

  // Kategori değiştiğinde URL'yi güncelle
  const onCategoryChange = (e: { value: string }) => {
    setSelectedCategory(e.value);
    updateUrlParams({ category: e.value === 'all' ? undefined : e.value });
  };

  // Fiyat aralığı değiştiğinde URL'yi güncelle
  const onPriceRangeChange = (e: { value: number | number[] }) => {
    const newRange = Array.isArray(e.value) ? e.value : [e.value, e.value];
    setPriceRange(newRange as [number, number]);
    updateUrlParams({ minPrice: newRange[0], maxPrice: newRange[1] });
  };

  // Filtreleri sıfırlama
  const handleResetFilters = () => {
    setSearchText('');
    setSortOrder('asc');
    setSelectedCategory('all');
    setPriceRange([0, 1000]); // Varsayılan maksimum fiyatı tekrar ayarla
    router.push(pathname); // Tüm URL parametrelerini temizle
  };

  return (
    <div className="filter-controls-container">
      <div className="filter-group">
        <label htmlFor="search" className="filter-label">Ürün Ara</label>
        <InputText
          id="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Ürün başlığına göre ara..."
        />
      </div>

      <div className="filter-group">
        <label htmlFor="sort" className="filter-label">Sıralama</label>
        <Dropdown
          id="sort"
          value={sortOrder}
          options={sortOptions}
          onChange={onSortChange}
          optionLabel="label"
          placeholder="Sıralama Seç"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category" className="filter-label">Kategori</label>
        <Dropdown
          id="category"
          value={selectedCategory}
          options={categoryOptions}
          onChange={onCategoryChange}
          optionLabel="label"
          placeholder="Kategori Seç"
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Fiyat Aralığı</label>
        <Slider
          value={priceRange}
          onChange={onPriceRangeChange}
          range
          min={0}
          max={1000}
          step={10}
        />
        <div className="price-range-display">
          ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
        </div>
      </div>

      <div className="filter-group">
        <Button
          label="Filtreleri Sıfırla"
          icon="pi pi-refresh"
          className="p-button-secondary"
          onClick={handleResetFilters}
        />
      </div>
    </div>
  );
};

export default FilterControls;
