
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export interface GalleryFolder {
  id: string;
  name: string;
  date: string;
  count: number;
  previews: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  type: 'image' | 'video';
  url: string;
  dimensions: string;
  size: string;
  isFavorite: boolean;
  aiTags?: string[];
  aiDescription?: string;
}

export const useGallery = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [folders, setFolders] = useState<GalleryFolder[]>([]);
  const [assets, setAssets] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // 1. Fetch Shoots (Folders)
      const { data: shoots, error: shootsError } = await supabase
        .from('shoots')
        .select(`
          id, 
          fashion_category, 
          shoot_type, 
          created_at,
          shoot_assets (
            url
          )
        `)
        .eq('designer_id', user.id)
        .order('created_at', { ascending: false });

      if (shootsError) throw shootsError;

      const mappedFolders: GalleryFolder[] = (shoots || []).map(s => ({
        id: s.id,
        name: `${s.shoot_type} - ${s.fashion_category}`,
        date: new Date(s.created_at).toLocaleDateString(),
        count: s.shoot_assets?.length || 0,
        previews: s.shoot_assets?.slice(0, 3).map((a: any) => a.url) || []
      }));

      setFolders(mappedFolders);

      // 2. Fetch Recent Assets
      const { data: shootAssets, error: assetsError } = await supabase
        .from('shoot_assets')
        .select(`
            *,
            shoot:shoots (
                fashion_category
            )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (assetsError) throw assetsError;

      const mappedAssets: GalleryItem[] = (shootAssets || []).map(a => ({
        id: a.id,
        title: a.filename || 'Untitled',
        category: (a.shoot as any)?.fashion_category || 'General',
        date: new Date(a.created_at).toLocaleDateString(),
        type: a.file_type === 'video' || a.filename?.endsWith('.mp4') ? 'video' : 'image',
        url: a.url,
        dimensions: a.metadata?.dimensions || '2400x3600',
        size: a.metadata?.size || '4.2 MB',
        isFavorite: a.is_favorite,
        aiTags: a.metadata?.ai_tags || ['Studio', 'Fashion', 'Portrait', 'High Key'],
        aiDescription: a.metadata?.ai_description || 'A high-quality studio shot with professional lighting.'
      }));

      setAssets(mappedAssets);

    } catch (e) {
      console.error("Gallery fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const toggleFavorite = async (assetId: string) => {
    // Optimistic Update
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    const newStatus = !asset.isFavorite;
    
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, isFavorite: newStatus } : a));

    try {
      const { error } = await supabase
        .from('shoot_assets')
        .update({ is_favorite: newStatus })
        .eq('id', assetId);

      if (error) throw error;
      toast(newStatus ? "Added to favorites" : "Removed from favorites", "success");
    } catch (e) {
      console.error("Favorite update failed", e);
      // Revert on error
      setAssets(prev => prev.map(a => a.id === assetId ? { ...a, isFavorite: !newStatus } : a));
      toast("Failed to update favorite status", "error");
    }
  };

  return { folders, assets, loading, refetch: fetchData, toggleFavorite };
};
