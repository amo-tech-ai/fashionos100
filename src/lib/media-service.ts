
import { supabase } from './supabase';
import { handleError } from '../utils/error-handler';

export const mediaService = {
  /**
   * Upload a file to a specific bucket and path
   */
  async uploadAsset(bucket: string, path: string, file: File) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
        
      return { path: data.path, publicUrl: urlData.publicUrl };
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Download a file from storage
   */
  async downloadAsset(bucket: string, path: string) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);

      if (error) throw error;
      return data; // Blob
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Delete a file from storage
   */
  async deleteAsset(bucket: string, path: string) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * List files in a folder
   */
  async listAssets(bucket: string, folder: string) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) throw error;
      return data;
    } catch (error) {
      throw handleError(error);
    }
  }
};
