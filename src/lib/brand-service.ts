
import { supabase, supabaseUrl } from './supabase';
import { FullBrandProfile, BrandGenerationParams, ProductionRecommendations } from '../types/brand';

/**
 * Fetches the full brand profile for a given company ID.
 */
export async function getBrandProfile(companyId: string): Promise<FullBrandProfile | null> {
  try {
    const { data: company, error: coError } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (coError || !company) throw coError;

    const [identityRes, visualsRes, recsRes] = await Promise.all([
      supabase.from('brand_identities').select('*').eq('company_id', companyId).maybeSingle(),
      supabase.from('brand_visuals').select('*').eq('company_id', companyId).maybeSingle(),
      supabase.from('production_recommendations').select('*').eq('company_id', companyId).maybeSingle(),
    ]);

    return {
      company,
      identity: identityRes.data,
      visuals: visualsRes.data,
      recommendations: recsRes.data as unknown as ProductionRecommendations,
    };

  } catch (error) {
    console.error('Error fetching brand profile:', error);
    return null;
  }
}

/**
 * Gets the first company associated with the user.
 */
export async function getUserBrand(): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
        .from('companies')
        .select('id')
        .eq('owner_id', user.id)
        .limit(1)
        .single();
    
    return data?.id || null;
}

/**
 * Triggers the AI generation of a brand profile.
 */
export async function generateBrandProfile(params: BrandGenerationParams): Promise<{ success: boolean; companyId?: string; error?: string }> {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Not authenticated");

        const response = await fetch(`${supabaseUrl}/functions/v1/generate-brand-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify(params)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Generation failed');

        return { success: true, companyId: result.companyId };

    } catch (error: any) {
        console.error("Generate Brand Profile Error:", error);
        return { success: false, error: error.message };
    }
}
