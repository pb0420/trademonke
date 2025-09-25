'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Package, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  icon: string;
  post_count?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/?category=${categoryId}`);
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-64" />
            <div className="h-12 bg-muted rounded-full" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(12).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-3xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Categories</h1>
          <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
        </div>

        {/* Search */}
        <Card className="mb-8 rounded-3xl border-0 shadow-xl bg-white/90 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-12 h-12 text-base rounded-2xl border-0 shadow-lg bg-white focus:shadow-xl transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Categories */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">Shop Products</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
              <Package className="h-3 w-3 mr-1" />
              {filteredCategories.length}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl rounded-3xl overflow-hidden group hover:scale-105 active:scale-95 bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-indigo-50"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {category.name}
                  </h3>
                  {category.post_count !== undefined && (
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-600">
                      {category.post_count} items
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCategories.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No product categories found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Services Categories */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">Find Services</h2>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-0">
              <Wrench className="h-3 w-3 mr-1" />
              {filteredServices.length}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                onClick={() => handleCategoryClick(service.id)}
                className="cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl rounded-3xl overflow-hidden group hover:scale-105 active:scale-95 bg-gradient-to-br from-white to-emerald-50 hover:from-emerald-50 hover:to-green-50"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {service.name}
                  </h3>
                  {service.post_count !== undefined && (
                    <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-600">
                      {service.post_count} services
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No service categories found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}