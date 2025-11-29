
/**
 * Centralized error handling utility
 */

interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
}

export const handleError = (error: unknown): ErrorResponse => {
  console.error('App Error:', error);

  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.stack
    };
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      message: (error as any).message,
      code: (error as any).code
    };
  }

  if (typeof error === 'string') {
    return {
      message: error
    };
  }

  return {
    message: 'An unexpected error occurred'
  };
};

export const isSupabaseError = (error: any): boolean => {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error && 'details' in error;
};
