
export interface BookingStep {
  path: string;
  label: string;
  progress: number;
}

export const BOOKING_STEPS: BookingStep[] = [
  { path: '/start-project/category', label: 'Category', progress: 5 },
  { path: '/start-project/style', label: 'Style', progress: 10 },
  { path: '/start-project/size', label: 'Size', progress: 15 },
  { path: '/start-project/scenes', label: 'Scenes', progress: 20 },
  { path: '/start-project/shot-type', label: 'Shot Type', progress: 25 },
  { path: '/start-project/sub-category', label: 'Specifics', progress: 35 },
  { path: '/start-project/models', label: 'Talent', progress: 40 },
  { path: '/start-project/shot-list', label: 'Count', progress: 50 },
  { path: '/start-project/references', label: 'Moodboard', progress: 60 },
  { path: '/start-project/brief', label: 'Brief', progress: 70 },
  { path: '/start-project/shot-builder', label: 'Shot List', progress: 80 },
  { path: '/start-project/retouching', label: 'Retouching', progress: 85 },
  { path: '/start-project/schedule', label: 'Schedule', progress: 95 }, 
  { path: '/start-project/review', label: 'Review', progress: 100 },
];
