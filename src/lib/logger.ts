
import { supabase } from './supabase';

type LogLevel = 'info' | 'warn' | 'error' | 'critical';

class Logger {
  private async log(level: LogLevel, message: string, metadata?: any) {
    // 1. Console Log (Dev)
    // @ts-ignore
    if (import.meta.env.DEV) {
      console.log(`[${level.toUpperCase()}] ${message}`, metadata);
    }

    // 2. Remote Log (Prod & Dev)
    // Fire and forget to avoid blocking UI
    try {
      const { error } = await supabase.from('system_logs').insert({
        level,
        message,
        metadata: metadata ? JSON.stringify(metadata) : {},
        source: 'frontend'
      });
      
      if (error) console.warn("Failed to write log:", error);
    } catch (e) {
      // Fail silently to prevent infinite loops
    }
  }

  info(message: string, metadata?: any) { this.log('info', message, metadata); }
  warn(message: string, metadata?: any) { this.log('warn', message, metadata); }
  error(message: string, metadata?: any) { this.log('error', message, metadata); }
  critical(message: string, metadata?: any) { this.log('critical', message, metadata); }
}

export const logger = new Logger();
