
import React, { useEffect, useState } from 'react';
import { Award, Plus, Loader2, Trash2, Edit2 } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader } from '../../components/dashboard/Shared';
import { sponsorService } from '../../lib/sponsor-service';
import { SponsorshipPackage } from '../../types/sponsorship';
import { PackageBuilder } from '../../components/sponsors/PackageBuilder';
import { Button } from '../../components/Button';
import { useToast } from '../../components/Toast';
import { EmptyState } from '../../components/EmptyState';

export const DashboardPackages: React.FC = () => {
  const [packages, setPackages] = useState<SponsorshipPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<SponsorshipPackage | null>(null);
  const { success, error } = useToast();

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const data = await sponsorService.getPackages();
      setPackages(data || []);
    } catch (e) {
      console.error(e);
      // Keep empty state if fetch fails (e.g. table not created yet)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSave = async (pkg: Partial<SponsorshipPackage>) => {
    try {
      await sponsorService.savePackage(pkg);
      success(pkg.id ? "Package updated" : "Package created");
      setIsBuilderOpen(false);
      fetchPackages();
    } catch (e) {
      console.error(e);
      error("Failed to save package");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await sponsorService.deletePackage(id);
      success("Package deleted");
      fetchPackages();
    } catch (e) {
      console.error(e);
      error("Failed to delete package");
    }
  };

  const openBuilder = (pkg?: SponsorshipPackage) => {
    setEditingPackage(pkg || null);
    setIsBuilderOpen(true);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Sponsorship Packages" 
        subtitle="Define tiers and deliverables for your events." 
        breadcrumbs={['Dashboard', 'Packages']}
        actionLabel="Create Package"
        onAction={() => openBuilder()}
      />

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-600" size={32} /></div>
      ) : packages.length === 0 ? (
        <EmptyState 
            icon={Award}
            title="No Packages Yet"
            description="Create standardized sponsorship tiers to streamline your sales process."
            actionLabel="Create First Package"
            onAction={() => openBuilder()}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
            <FadeIn key={pkg.id} delay={i * 100}>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100%] -mr-8 -mt-8 z-0 group-hover:bg-purple-100 transition-colors" />
                
                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openBuilder(pkg)} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-purple-600">
                        <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(pkg.id)} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-red-600">
                        <Trash2 size={14} />
                    </button>
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-purple-600 border border-purple-50">
                        <Award size={24} />
                    </div>
                    <h3 className="font-serif font-bold text-2xl mb-2">{pkg.name}</h3>
                    <p className="text-3xl font-bold text-purple-600 mb-4">${pkg.default_price.toLocaleString()}</p>
                    <p className="text-gray-500 text-sm mb-8 flex-grow">{pkg.description}</p>
                    
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400 mb-6 border-t border-gray-100 pt-4">
                        <span>Inventory</span>
                        <span className="text-gray-900">{pkg.default_slots} Slots</span>
                    </div>

                    <Button variant="outline" fullWidth onClick={() => openBuilder(pkg)}>
                        Edit Package
                    </Button>
                </div>
                </div>
            </FadeIn>
            ))}
            
            {/* Add New Card */}
            <button 
                onClick={() => openBuilder()}
                className="rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-gray-400 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all group min-h-[400px]"
            >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition-all">
                    <Plus size={32} />
                </div>
                <span className="font-bold text-lg">Create New Package</span>
            </button>
        </div>
      )}

      {isBuilderOpen && (
        <PackageBuilder 
            initialData={editingPackage}
            onSave={handleSave}
            onCancel={() => setIsBuilderOpen(false)}
        />
      )}
    </div>
  );
};
