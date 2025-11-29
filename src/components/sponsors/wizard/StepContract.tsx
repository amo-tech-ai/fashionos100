
import React, { useState } from 'react';
import { Upload, Wand2, Download } from 'lucide-react';
import { Textarea } from '../../forms/Textarea';
import { Button } from '../../Button';
import { DealState } from '../../../types/deal';
import { aiService } from '../../../lib/ai-service';
import { LoadingSpinner } from '../../LoadingSpinner';

interface Props {
  data: DealState;
  update: (data: Partial<DealState>) => void;
}

export const StepContract: React.FC<Props> = ({ data, update }) => {
  const [isDrafting, setIsDrafting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleAIDraft = async () => {
    setIsDrafting(true);
    try {
      const result = await aiService.sponsorAgent('draft-contract', {
        sponsorName: data.sponsorName || 'Sponsor',
        sponsorIndustry: data.sponsorIndustry || 'General',
        contractTerms: {
            tier: data.packageTier,
            value: data.cashValue,
            inKind: data.inKindValue,
            event: data.eventName || 'Event'
        }
      });
      
      if (result.success && typeof result.data === 'string') {
        update({ terms: result.data });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDrafting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!data.terms) return;
    setIsGeneratingPdf(true);
    try {
      const result = await aiService.generateContract({
          sponsorName: data.sponsorName || 'Sponsor',
          terms: data.terms,
          value: data.cashValue,
          date: new Date().toLocaleDateString(),
          eventName: data.eventName || 'Event Partnership'
      });

      if (result.success && result.data) {
          const url = window.URL.createObjectURL(result.data);
          triggerDownload(url, `Contract-${data.sponsorName || 'Agreement'}.pdf`);
      } else {
          console.warn("PDF Generation unavailable, falling back to text.");
          const blob = new Blob([data.terms], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          triggerDownload(url, `${data.sponsorName}-Contract-Draft.txt`);
      }
      
    } catch (e) {
      console.error("PDF Gen failed", e);
      alert("Could not generate PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const triggerDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2">Contract & Terms</h2>
        <p className="text-gray-500">Define terms and upload signed agreements.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Upload size={24} />
          </div>
          <p className="font-bold text-gray-900">Upload Signed Contract</p>
          <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 10MB</p>
        </div>

        {/* Terms Drafting */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Key Terms</label>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleAIDraft} 
                disabled={isDrafting}
                className="text-purple-600 hover:bg-purple-50"
              >
                {isDrafting ? <LoadingSpinner size={14} /> : <Wand2 size={14} className="mr-2" />}
                AI Draft Terms
              </Button>
              {data.terms && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleDownloadPDF} 
                  disabled={isGeneratingPdf}
                  className="text-gray-600 hover:text-black border-gray-200"
                >
                  {isGeneratingPdf ? <LoadingSpinner size={14} /> : <Download size={14} className="mr-2" />}
                  Download PDF
                </Button>
              )}
            </div>
          </div>
          <Textarea
            value={data.terms}
            onChange={(e) => update({ terms: e.target.value })}
            className="h-64 bg-gray-50 font-mono text-xs"
            placeholder="Deliverables, Payment Schedule, Exclusivity Clauses..."
          />
        </div>

        <div className="flex gap-4">
          {['Draft', 'Sent', 'Signed'].map(status => (
            <button
              key={status}
              onClick={() => update({ contractStatus: status as any })}
              className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                data.contractStatus === status 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
