
import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, File, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Button } from './Button';

interface FileUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
  maxSize?: number; // in bytes, default 10MB
  accept?: string; // e.g., "image/*,video/*"
  multiple?: boolean;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onUpload,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = "image/*",
  multiple = true,
  className = ""
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Drag Events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Validate and Add Files
  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError(null);

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(newFiles).forEach((file) => {
      // Validate Size
      if (file.size > maxSize) {
        setError(`File ${file.name} exceeds the ${maxSize / 1024 / 1024}MB limit.`);
        return;
      }
      // Validate Type (Simple check based on accept prop)
      if (!file.type.match(accept.replace('*', '.*'))) {
        setError(`File ${file.name} format is not supported.`);
        return;
      }
      
      validFiles.push(file);
      if (file.type.startsWith('image/')) {
        newPreviews.push(URL.createObjectURL(file));
      } else {
        newPreviews.push(''); // No preview for non-images
      }
    });

    if (multiple) {
      setFiles((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    } else {
      setFiles([validFiles[0]]);
      setPreviews([newPreviews[0]]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      // Revoke URL to avoid memory leaks
      if (prev[index]) URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUploadClick = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setProgress(0);

    // Simulate progress for UX (since we don't have granular XHR events easily with this setup)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 200);

    try {
      await onUpload(files);
      setProgress(100);
      setTimeout(() => {
        setFiles([]);
        setPreviews([]);
        setUploading(false);
        setProgress(0);
      }, 500);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
      setUploading(false);
    } finally {
      clearInterval(interval);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
          dragActive 
            ? "border-purple-500 bg-purple-50" 
            : "border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-gray-100"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          multiple={multiple} 
          accept={accept}
          onChange={handleChange}
          disabled={uploading}
        />

        <div className="flex flex-col items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${dragActive ? 'bg-white text-purple-600' : 'bg-purple-100 text-purple-600'}`}>
            <Upload size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              <button 
                onClick={() => inputRef.current?.click()}
                className="text-purple-600 hover:underline"
                type="button"
              >
                Click to upload
              </button>
              <span className="font-normal text-gray-500"> or drag and drop</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              SVG, PNG, JPG or GIF (max {maxSize / 1024 / 1024}MB)
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-xs text-red-600 animate-in fade-in">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* File List / Previews */}
      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Selected Files ({files.length})</h4>
          
          <div className="grid grid-cols-1 gap-3">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {previews[i] ? (
                      <img src={previews[i]} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <File size={18} className="text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                
                {!uploading && (
                  <button 
                    onClick={() => removeFile(i)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
                
                {uploading && progress === 100 && (
                  <CheckCircle2 size={20} className="text-green-500" />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-purple-600 h-full rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
             <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { setFiles([]); setPreviews([]); setError(null); }}
                disabled={uploading}
             >
                Cancel
             </Button>
             <Button 
                variant="primary" 
                size="sm" 
                onClick={handleUploadClick}
                disabled={uploading}
                className="min-w-[100px]"
             >
                {uploading ? 'Uploading...' : `Upload ${files.length} files`}
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};
