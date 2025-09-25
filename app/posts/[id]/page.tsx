'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  MapPin, 
  DollarSign, 
  AlertTriangle,
  Loader2,
  Edit2,
  Save,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '@/components/providers';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface User {
  id: string;
  name: string;
  is_verified: boolean;
  business_name?: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  created_at: string;
  privacy: string;
  show_business_name: boolean;
  allow_contact: boolean;
  user: User;
  category: Category;
  media: Array<{
    url: string;
    type: 'photo' | 'video';
  }>;
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editable form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    price: '',
    location: '',
    privacy: 'public',
    show_business_name: false,
    allow_contact: true,
  });

  // Fetch post data
  useEffect(() => {
    let mounted = true;
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        if (mounted) {
          setPost(data);
          setFormData({
            title: data.title || '',
            description: data.description || '',
            category_id: data.category?.id || '',
            price: data.price?.toString() || '',
            location: data.location || '',
            privacy: data.privacy || 'public',
            show_business_name: data.show_business_name || false,
            allow_contact: data.allow_contact ?? true,
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    return () => { mounted = false; };
  }, [id]);

  // Fetch categories
  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetch('/api/categories');
        if (response.ok && mounted) {
          const data = await response.json();
          setCategories([...data.categories, ...data.services]);
        }
      } catch (error) {
        if (mounted) toast.error('Failed to load categories');
      } finally {
        if (mounted) setCategoriesLoading(false);
      }
    };
    fetchCategories();
    return () => { mounted = false; };
  }, []);

  // File handling (for new uploads)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + (post?.media?.length || 0) + selectedFiles.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Only allow editing if user is the creator
  const canEdit = user && post && user.id === post.user.id;

  // Save edits
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (!formData.title.trim()) throw new Error('Title is required');
      if (!formData.description.trim()) throw new Error('Description is required');
      if (!formData.price || parseFloat(formData.price) <= 0) throw new Error('Valid price is required');
      // Optionally: validate at least one image

      const updateData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      const updatedPost = await res.json();
      setPost(updatedPost);
      setEditMode(false);
      toast.success('Post updated!');
      // TODO: handle image uploads
    } catch (err: any) {
      setError(err.message || 'Failed to update post');
      toast.error(err.message || 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h3 className="text-xl font-bold mb-2">Post Not Found</h3>
            <p className="text-muted-foreground mb-4">This post does not exist or has been removed.</p>
            <Button asChild>
              <a href="/">Go Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <Card className="rounded-2xl border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>
              {editMode ? (
                <Input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  maxLength={100}
                  required
                />
              ) : (
                post.title
              )}
            </CardTitle>
            <CardDescription>
              {editMode ? (
                <Textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  maxLength={2000}
                  required
                />
              ) : (
                post.description
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Images */}
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                {post.media?.map((media, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={media.url}
                      alt={`Media ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    {idx === 0 && (
                      <Badge className="absolute bottom-1 left-1 text-xs">Main</Badge>
                    )}
                  </div>
                ))}
                {editMode && selectedFiles.map((file, idx) => (
                  <div key={`new-${idx}`} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              {editMode && (
                <>
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="text-sm text-muted-foreground">Click to upload more photos</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </>
              )}
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                {editMode ? (
                  <Select
                    value={formData.category_id}
                    onValueChange={value => setFormData({ ...formData, category_id: value })}
                    disabled={categoriesLoading}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={categoriesLoading ? "Loading..." : "Select a category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1">{post.category?.icon} {post.category?.name}</div>
                )}
              </div>
              <div>
                <Label>Price (AUD)</Label>
                {editMode ? (
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="pl-10"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                ) : (
                  <div className="mt-1 font-semibold">${post.price}</div>
                )}
              </div>
            </div>
            <div>
              <Label>Location</Label>
              {editMode ? (
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Sydney, NSW"
                    className="pl-10"
                  />
                </div>
              ) : (
                <div className="mt-1">{post.location}</div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Label>Privacy</Label>
                {editMode ? (
                  <Select value={formData.privacy} onValueChange={value => setFormData({ ...formData, privacy: value })}>
                    <SelectTrigger className="w-32 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="ml-2">{post.privacy === 'public' ? 'Public' : 'Private'}</span>
                )}
              </div>
              <div>
                <Label>Allow Contact</Label>
                {editMode ? (
                  <Switch
                    checked={formData.allow_contact}
                    onCheckedChange={checked => setFormData({ ...formData, allow_contact: checked })}
                  />
                ) : (
                  <span className="ml-2">{post.allow_contact ? 'Yes' : 'No'}</span>
                )}
              </div>
              {post.user.business_name && (
                <div>
                  <Label>Show Business Name</Label>
                  {editMode ? (
                    <Switch
                      checked={formData.show_business_name}
                      onCheckedChange={checked => setFormData({ ...formData, show_business_name: checked })}
                    />
                  ) : (
                    <span className="ml-2">{post.show_business_name ? 'Yes' : 'No'}</span>
                  )}
                </div>
              )}
            </div>
            <div>
              <Label>Posted By</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-medium">{post.show_business_name && post.user.business_name ? post.user.business_name : post.user.name}</span>
                {post.user.is_verified && <Badge variant="outline">Verified</Badge>}
              </div>
            </div>
            <div>
              <Label>Created At</Label>
              <div className="mt-1 text-xs text-muted-foreground">{new Date(post.created_at).toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Edit/Save Buttons */}
        {canEdit && (
          <div className="flex gap-4">
            {editMode ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    // Reset form to original post data
                    setFormData({
                      title: post.title,
                      description: post.description,
                      category_id: post.category?.id || '',
                      price: post.price?.toString() || '',
                      location: post.location,
                      privacy: post.privacy,
                      show_business_name: post.show_business_name,
                      allow_contact: post.allow_contact,
                    });
                    setSelectedFiles([]);
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => setEditMode(true)}
                variant="default"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Listing
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}