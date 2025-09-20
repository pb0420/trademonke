'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
  selectedCategory: string;
}

export function CategoryGrid({ onCategorySelect, selectedCategory }: CategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-background to-muted/20 py-6">
        <div className="container mx-auto px-4 space-y-6">
          {/* Loading skeleton for categories */}
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            <div className="flex gap-3 overflow-hidden">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-20 h-20 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-28 animate-pulse" />
            <div className="flex gap-3 overflow-hidden">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-20 h-20 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const CategoryButton = ({ category, isService = false }: { category: Category; isService?: boolean }) => {
    const isSelected = selectedCategory === category.id;
    const colorScheme = isService ? 'emerald' : 'blue';
    
    return (
      <Card
        onClick={() => onCategorySelect(isSelected ? '' : category.id)}
        className={clsx(
          'flex-shrink-0 cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl',
          'rounded-2xl overflow-hidden group hover:scale-105 active:scale-95',
          isSelected
            ? `bg-gradient-to-br ${isService ? 'from-emerald-500 to-green-600' : 'from-blue-500 to-indigo-600'} shadow-${colorScheme}-500/30`
            : 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 shadow-gray-200/50'
        )}
      >
        <CardContent className="p-4 flex flex-col items-center justify-center min-w-[80px] h-20">
          <div className={clsx(
            'text-2xl mb-1 transition-transform duration-300 group-hover:scale-110',
            isSelected ? 'drop-shadow-sm' : ''
          )}>
            {category.icon}
          </div>
          <span className={clsx(
            'text-xs font-medium text-center leading-tight transition-colors duration-300',
            isSelected ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
          )}>
            {category.name}
          </span>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-gradient-to-b from-background via-muted/10 to-background py-6">
      <div className="container mx-auto px-4 space-y-8">
        {/* Shop Products Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            <h2 className="text-lg font-bold text-gray-900">Shop Products</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
              {categories.length}
            </Badge>
          </div>
          
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Find Services Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full" />
            <h2 className="text-lg font-bold text-gray-900">Find Services</h2>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-0">
              {services.length}
            </Badge>
          </div>
          
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {services.map((service) => (
              <CategoryButton key={service.id} category={service} isService />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}