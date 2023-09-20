import React, { useState } from 'react';
import { Checkbox, TextInput, Button } from '@mantine/core';
import { ProductFilterResult } from '@/ProductFilterResult';
import { ProductsCategoryData } from 'tp-kit/types';

interface ProductFiltersProps {
  categories: ProductsCategoryData[];
  onChange: (filters: ProductFilterResult) => void;
}

export function ProductFilters({ categories, onChange }: ProductFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values);
  };

  const handleFilterSubmit = () => {
    const filters: ProductFilterResult = {
      categoriesSlug: selectedCategories,
      search,
    };
    onChange(filters);
  };

  return (
    <div>
      <TextInput
        value={search}
        onChange={handleSearchChange}
        placeholder="Entrez une boisson"
      />
      <Checkbox.Group value={selectedCategories} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <Checkbox key={category.id} value={category.slug}>
            {category.slug}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Button onClick={handleFilterSubmit}>Filtrer</Button>
    </div>
  );
}
