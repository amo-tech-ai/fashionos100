
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';

// --- Types ---

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  removeToast: (id: string) => void;
}

// --- Context ---

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// --- Hook ---

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// --- Component: Toast Item ---

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const styles = {
    success: "border-green-500 bg-white",
    error: "border-red-500 bg-white",
    warning: "border-amber-500 bg-white",
    info: "border-blue-500 bg-white"
  };

  const iconStyles = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-amber-500",
    info: "text-blue-500"
  };

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const Icon = icons[toast.type];

  return (
    <div className={`
      relative flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 min-w-[300px] max-w-md 
      animate-in slide-in-from-right duration-300 ease-out mb-3
      ${styles[toast.type]}
    `} role="alert">
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconStyles[toast.type]}`} />
      <div className="flex-1 mr-2">
        <p className="text-sm font-medium text-gray-800 leading-snug">{toast.message}</p>
      </div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// --- Provider ---

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss
    setTimeout(() => {
      removeToast(id);
    }, 3000); // 3 seconds
  }, [removeToast]);

  const toastHelpers = {
    toast: addToast,
    success: (msg: string) => addToast(msg, 'success'),
    error: (msg: string) => addToast(msg, 'error'),
    warning: (msg: string) => addToast(msg, 'warning'),
    info: (msg: string) => addToast(msg, 'info'),
    removeToast
  };

  return (
    <ToastContext.Provider value={toastHelpers}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end pointer-events-none">
        {/* Inner container to re-enable pointer events for the toasts themselves */}
        <div className="pointer-events-auto">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={removeToast} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
