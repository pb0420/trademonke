import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// This file contains seed data to populate the database
export const seedDatabase = async (supabaseUrl: string, supabaseKey: string) => {
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  try {
    // Check if categories already exist
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (existingCategories && existingCategories.length > 0) {
      console.log('Database already seeded');
      return;
    }

    // Seed categories
    const categories = [
      { name: 'Cars', icon: '🚗' },
      { name: 'Living', icon: '🏠' },
      { name: 'Furniture', icon: '🪑' },
      { name: 'Electronics', icon: '📱' },
      { name: 'Fashion', icon: '👕' },
      { name: 'Sports', icon: '⚽' },
      { name: 'Books', icon: '📚' },
      { name: 'Other', icon: '📦' },
      // Services
      { name: 'Web Dev', icon: '💻' },
      { name: 'Cleaning', icon: '🧹' },
      { name: 'Tutoring', icon: '📚' },
      { name: 'Fitness', icon: '💪' },
      { name: 'Beauty', icon: '💄' },
      { name: 'Handyman', icon: '🔧' },
      { name: 'Photography', icon: '📸' },
      { name: 'Music', icon: '🎵' },
      { name: 'Pet Care', icon: '🐕' },
      { name: 'Delivery', icon: '🚚' },
    ];

    const { error: categoriesError } = await supabase
      .from('categories')
      .insert(categories);

    if (categoriesError) {
      console.error('Error seeding categories:', categoriesError);
      return;
    }

    // Create admin user
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .insert({
        id: 'admin',
        phone: '+61400000000',
        email: 'admin@trademonkey.com',
        name: 'Admin User',
        is_verified: true,
        verification_status: 'approved',
        is_admin: true,
      })
      .select()
      .single();

    if (adminError && adminError.code !== '23505') { // Ignore duplicate key error
      console.error('Error creating admin user:', adminError);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};