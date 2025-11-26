
import { supabase } from './supabase';

/**
 * Uploads a base64 image string to Supabase Storage bucket 'event-media'.
 * Handles stripping data URI prefixes if present.
 * Returns the public URL.
 */
export async function uploadEventImage(base64Data: string, fileName: string): Promise<string | null> {
  try {
    // Strip data URI prefix if present (e.g. "data:image/png;base64,")
    // This regex covers common image types
    const cleanedBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');

    // Convert base64 to Blob
    const byteCharacters = atob(cleanedBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Generate a unique path
    const filePath = `generated/${Date.now()}_${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('event-media')
      .upload(filePath, blob, {
        contentType: 'image/png',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('event-media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Failed to upload image:', error);
    return null;
  }
}
