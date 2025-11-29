# 🤖 Google AI Studio Multi-Step Prompts

**Purpose:** Comprehensive natural language prompts for Google AI Studio's Build Mode/Vibe Coding to generate production-ready React/TypeScript components and pages for FashionOS.

**How to Use:**
1. Copy the entire prompt for a task
2. Paste into Google AI Studio (https://aistudio.google.com/)
3. Enable "Build Mode" or "Vibe Coding"
4. Review generated code
5. Follow verification checklist
6. Provide proof of completion

---

## 🎨 UI Components

### Prompt 1: LoadingSpinner Component

**Natural Language Prompt:**
```
Create a production-ready React TypeScript LoadingSpinner component for FashionOS. 

STEP 1: Component Structure
- Create file: components/LoadingSpinner.tsx
- Export as named export: export const LoadingSpinner
- Use React.FC with proper TypeScript interface
- Accept props: size ('sm' | 'md' | 'lg'), label (optional string), className (optional string)

STEP 2: Design System Integration
- Match FashionOS design system: black, white, gray color palette
- Use Tailwind CSS classes (no inline styles)
- Reference Button.tsx component for variant pattern consistency
- Use serif font (Playfair Display) for labels if provided

STEP 3: Spinner Animation
- Create circular spinner using CSS animations
- Use Tailwind's animate-spin utility
- Size variants: sm (w-4 h-4), md (w-6 h-6), lg (w-8 h-8)
- Border color: gray-300, border-top color: black for contrast

STEP 4: Layout & Styling
- Flex container (flex items-center gap-3)
- Spinner centered with optional label below or beside
- Label styling: text-sm text-gray-600 font-medium
- Support fullWidth prop for centered display

STEP 5: Accessibility
- Add aria-label="Loading" to spinner element
- Include role="status" for screen readers
- Add aria-live="polite" when label is present

STEP 6: Code Quality
- Proper TypeScript types for all props
- Default props: size='md', label=undefined
- Export interface: LoadingSpinnerProps
- Add JSDoc comment explaining usage
```

**Success Criteria:**
- [ ] Component file created at `components/LoadingSpinner.tsx`
- [ ] TypeScript interface defined with proper types
- [ ] Three size variants working (sm, md, lg)
- [ ] Spinner animation smooth and visible
- [ ] Optional label displays correctly
- [ ] Matches FashionOS design system colors
- [ ] Accessibility attributes present
- [ ] No TypeScript errors
- [ ] No console warnings

**Production-Ready Checklist:**
- [ ] Code follows existing component patterns (Button.tsx style)
- [ ] Tailwind CSS classes used (no inline styles)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Component exported correctly
- [ ] TypeScript types complete
- [ ] No unused imports
- [ ] Proper error handling
- [ ] Performance optimized (no unnecessary re-renders)

**Verification Steps:**
1. Import component: `import { LoadingSpinner } from './components/LoadingSpinner'`
2. Test all variants: `<LoadingSpinner size="sm" />`, `<LoadingSpinner size="md" label="Loading..." />`, `<LoadingSpinner size="lg" />`
3. Check browser console for errors
4. Verify spinner animation is smooth
5. Test with screen reader (accessibility)
6. Check responsive behavior on mobile

**Proof of Completion:**
- [ ] File exists: `components/LoadingSpinner.tsx`
- [ ] Component renders without errors
- [ ] All size variants work
- [ ] Screenshot of component in browser
- [ ] TypeScript compilation passes: `npx tsc --noEmit`
- [ ] No ESLint errors: `npm run lint` (if configured)

---

### Prompt 2: SkeletonLoader Component

**Natural Language Prompt:**
```
Create a production-ready React TypeScript SkeletonLoader component for FashionOS with shimmer animation.

STEP 1: Component Structure
- Create file: components/SkeletonLoader.tsx
- Export as named export: export const SkeletonLoader
- Use React.FC with TypeScript interface
- Accept props: variant ('card' | 'text' | 'image' | 'avatar'), width (optional string), height (optional string), className (optional string)

STEP 2: Design System
- Match FashionOS gray color palette (gray-100, gray-200, gray-300)
- Use Tailwind CSS classes exclusively
- Reference existing components for spacing consistency

STEP 3: Shimmer Animation
- Create shimmer effect using CSS gradient animation
- Use Tailwind's animate-pulse utility as base
- Custom shimmer: gradient from gray-200 to gray-100 to gray-200
- Animation duration: 2s, infinite loop

STEP 4: Variants Implementation
- Card variant: rounded rectangle with padding (p-4), aspect ratio maintained
- Text variant: multiple lines of varying widths (h-4, w-3/4, w-1/2)
- Image variant: square or rectangle with aspect ratio (aspect-square or aspect-video)
- Avatar variant: circular (rounded-full, w-12 h-12)

STEP 5: Responsive Design
- Mobile-first approach
- Width/height props support Tailwind classes or custom values
- Default sizes: card (h-32), text (h-4), image (aspect-video), avatar (w-12 h-12)

STEP 6: Accessibility
- Add aria-label="Loading content"
- Include role="status"
- Use aria-busy="true"

STEP 7: Code Quality
- Proper TypeScript types
- Export SkeletonLoaderProps interface
- JSDoc comments
- Default props: variant='text'
```

**Success Criteria:**
- [ ] Component file created at `components/SkeletonLoader.tsx`
- [ ] Four variants working (card, text, image, avatar)
- [ ] Shimmer animation smooth and visible
- [ ] Customizable width/height props work
- [ ] Matches FashionOS gray palette
- [ ] Accessibility attributes present
- [ ] No TypeScript errors

**Production-Ready Checklist:**
- [ ] All variants render correctly
- [ ] Animation performance smooth (60fps)
- [ ] Responsive on all screen sizes
- [ ] TypeScript types complete
- [ ] No console warnings
- [ ] Proper prop validation

**Verification Steps:**
1. Test all variants: `<SkeletonLoader variant="card" />`, `<SkeletonLoader variant="text" />`, etc.
2. Test custom sizes: `<SkeletonLoader variant="image" width="w-full" height="h-64" />`
3. Check animation smoothness
4. Verify accessibility with screen reader
5. Test responsive behavior

**Proof of Completion:**
- [ ] File exists: `components/SkeletonLoader.tsx`
- [ ] All 4 variants render correctly
- [ ] Screenshot showing all variants
- [ ] TypeScript compilation passes
- [ ] Animation smooth (no jank)

---

### Prompt 3: ErrorBoundary Component

**Natural Language Prompt:**
```
Create a production-ready React ErrorBoundary class component for FashionOS with styled fallback UI.

STEP 1: Component Structure
- Create file: components/ErrorBoundary.tsx
- Use React class component (required for Error Boundaries)
- Implement componentDidCatch and getDerivedStateFromError lifecycle methods
- Export as: export class ErrorBoundary extends React.Component

STEP 2: TypeScript Interface
- Define ErrorBoundaryProps: { children: React.ReactNode, fallback?: React.ReactNode }
- Define ErrorBoundaryState: { hasError: boolean, error: Error | null }
- Proper generic types: ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>

STEP 3: Error Handling Logic
- getDerivedStateFromError: Set hasError to true, capture error
- componentDidCatch: Log error to console (and optionally to error reporting service)
- Reset error state method for "Try Again" functionality

STEP 4: Fallback UI Design
- Match FashionOS design system: serif fonts (Playfair Display), black/white colors
- Use Tailwind CSS classes
- Display friendly error message: "Something went wrong"
- Include "Try Again" button (use Button component from './Button')
- Optional: Show error details in collapsed section (for development)
- Centered layout with max-width container

STEP 5: Styling
- Background: white or gray-50
- Text: black, serif font for heading
- Button: Use existing Button component with variant="primary"
- Padding and spacing consistent with other pages
- FadeIn animation (reference FadeIn component)

STEP 6: Error Reporting
- Console.error with full error details
- Optional: Prepare for future error reporting service integration
- Include error boundary name in logs

STEP 7: Code Quality
- Proper error handling
- TypeScript types complete
- JSDoc comments
- Export default or named export
```

**Success Criteria:**
- [ ] Class component created at `components/ErrorBoundary.tsx`
- [ ] ErrorBoundary catches React errors
- [ ] Fallback UI displays correctly
- [ ] "Try Again" button resets error state
- [ ] Error logged to console
- [ ] Matches FashionOS design system
- [ ] TypeScript compilation passes

**Production-Ready Checklist:**
- [ ] Catches rendering errors
- [ ] Catches lifecycle errors
- [ ] Fallback UI styled correctly
- [ ] Button component integrated
- [ ] Error logging works
- [ ] Reset functionality works
- [ ] No TypeScript errors

**Verification Steps:**
1. Wrap a component that throws error: `<ErrorBoundary><ComponentThatThrows /></ErrorBoundary>`
2. Verify fallback UI appears
3. Click "Try Again" button
4. Check console for error logs
5. Test with different error types
6. Verify styling matches design system

**Proof of Completion:**
- [ ] File exists: `components/ErrorBoundary.tsx`
- [ ] Error boundary catches errors
- [ ] Screenshot of fallback UI
- [ ] Console log shows error details
- [ ] TypeScript compilation passes
- [ ] Test case: Component throws error → ErrorBoundary catches it

---

### Prompt 4: Toast Notification Component

**Natural Language Prompt:**
```
Create a production-ready React TypeScript Toast notification component system for FashionOS.

STEP 1: Component Structure
- Create file: components/Toast.tsx
- Export Toast component and useToast hook
- Toast component: Individual toast item
- ToastContainer component: Container for multiple toasts
- Use React.FC with TypeScript

STEP 2: Toast Variants
- Support variants: 'success' (green), 'error' (red), 'warning' (amber), 'info' (blue)
- Each variant has distinct color scheme matching FashionOS design
- Icons: CheckCircle (success), XCircle (error), AlertTriangle (warning), Info (info)
- Use lucide-react icons (already in project)

STEP 3: Animation
- Slide-in from top-right corner
- Fade-in animation (opacity 0 to 1)
- Slide-out when dismissing
- Smooth transitions (duration-300)

STEP 4: Auto-Dismiss
- Auto-dismiss after 5 seconds (configurable)
- Progress bar showing time remaining (optional)
- Pause on hover
- Manual close button (X icon)

STEP 5: Toast Container
- Fixed position: top-right (top-4 right-4)
- z-index: 50 (above other content)
- Stack toasts vertically with gap
- Max-width: 400px per toast
- Mobile responsive (full width on mobile with margin)

STEP 6: useToast Hook
- Create custom hook: hooks/useToast.ts
- Functions: toast.success(), toast.error(), toast.warning(), toast.info()
- Each function accepts: message (string), duration (optional number)
- Returns toast ID for manual dismissal
- Manages toast state (array of toasts)

STEP 7: Styling
- Background: white with border
- Shadow: shadow-lg for depth
- Border color matches variant
- Text: black, readable font sizes
- Padding: p-4
- Rounded corners: rounded-sm (FashionOS style)

STEP 8: Accessibility
- aria-live="polite" for announcements
- role="alert" for error toasts
- Keyboard accessible (ESC to close)
- Focus management

STEP 9: Code Quality
- TypeScript types for all props
- Export ToastProps, ToastContainerProps interfaces
- JSDoc comments
- Proper cleanup on unmount
```

**Success Criteria:**
- [ ] Toast component created at `components/Toast.tsx`
- [ ] useToast hook created at `hooks/useToast.ts`
- [ ] All 4 variants work (success, error, warning, info)
- [ ] Auto-dismiss after 5 seconds
- [ ] Manual close button works
- [ ] Slide-in animation smooth
- [ ] Multiple toasts stack correctly
- [ ] Accessibility attributes present

**Production-Ready Checklist:**
- [ ] All variants render correctly
- [ ] Animations smooth (60fps)
- [ ] Auto-dismiss works
- [ ] Manual close works
- [ ] Multiple toasts don't overlap
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] TypeScript types complete

**Verification Steps:**
1. Import useToast hook
2. Test each variant: `toast.success('Success!')`, `toast.error('Error!')`, etc.
3. Verify auto-dismiss after 5 seconds
4. Test manual close button
5. Test multiple toasts stacking
6. Test on mobile device
7. Test keyboard navigation (ESC)
8. Check accessibility with screen reader

**Proof of Completion:**
- [ ] Files exist: `components/Toast.tsx`, `hooks/useToast.ts`
- [ ] All variants work
- [ ] Screenshot showing toast notifications
- [ ] TypeScript compilation passes
- [ ] Test: Call toast.success() → Toast appears → Auto-dismisses after 5s

---

### Prompt 5: Modal Component

**Natural Language Prompt:**
```
Create a production-ready reusable React TypeScript Modal component for FashionOS.

STEP 1: Component Structure
- Create file: components/Modal.tsx
- Export as named export: export const Modal
- Use React.FC with TypeScript interface
- Accept props: isOpen (boolean), onClose (function), title (optional string), children (ReactNode), size ('sm' | 'md' | 'lg' | 'full'), showCloseButton (boolean, default true)

STEP 2: Overlay Backdrop
- Fixed position covering entire viewport
- Background: black with opacity (bg-black/50 or backdrop-blur)
- z-index: 50 (above page content)
- Click outside to close (onClick overlay calls onClose)
- Smooth fade-in animation

STEP 3: Modal Container
- Centered on screen (flex items-center justify-center)
- Max-width based on size prop: sm (max-w-md), md (max-w-lg), lg (max-w-2xl), full (max-w-full with margin)
- Background: white
- Rounded corners: rounded-sm (FashionOS style)
- Shadow: shadow-2xl for depth
- z-index: 50 (above overlay)

STEP 4: Modal Content
- Header section: Title (if provided) and close button
- Body section: children content with padding
- Footer section: Optional (can be passed as prop or part of children)
- Padding: p-6 for body, p-4 for header/footer

STEP 5: Close Functionality
- Close button (X icon) in top-right corner
- Escape key closes modal (useEffect with keyboard event listener)
- Click outside overlay closes modal
- Prevent body scroll when modal open (document.body.style.overflow = 'hidden')

STEP 6: Animation
- Fade-in for overlay (opacity 0 to 1)
- Scale-in for modal (scale-95 to scale-100)
- Smooth transitions (duration-300)
- Use Tailwind transition classes

STEP 7: Accessibility
- Focus trap: Focus stays within modal
- aria-modal="true"
- aria-labelledby for title
- Return focus to trigger element on close
- ESC key handling

STEP 8: Styling
- Match FashionOS design system
- Use existing Button component for any buttons
- Serif font for title (Playfair Display)
- Black/white color scheme
- Proper spacing and typography

STEP 9: Code Quality
- TypeScript types complete
- Export ModalProps interface
- JSDoc comments
- Proper cleanup (remove event listeners, restore body scroll)
- Portal rendering (optional, use React.createPortal for better z-index management)
```

**Success Criteria:**
- [ ] Modal component created at `components/Modal.tsx`
- [ ] Overlay backdrop displays correctly
- [ ] All size variants work (sm, md, lg, full)
- [ ] Close button works
- [ ] Escape key closes modal
- [ ] Click outside closes modal
- [ ] Body scroll prevented when open
- [ ] Animations smooth
- [ ] Accessibility features work

**Production-Ready Checklist:**
- [ ] All size variants render correctly
- [ ] Close functionality works (button, ESC, click outside)
- [ ] Animations smooth (60fps)
- [ ] Body scroll locked when open
- [ ] Focus trap works
- [ ] Mobile responsive
- [ ] TypeScript types complete
- [ ] No memory leaks (cleanup on unmount)

**Verification Steps:**
1. Test modal opening: `<Modal isOpen={true} onClose={handleClose}>Content</Modal>`
2. Test all sizes: sm, md, lg, full
3. Test close button
4. Test ESC key
5. Test click outside
6. Verify body scroll locked
7. Test focus trap (Tab key)
8. Test on mobile device

**Proof of Completion:**
- [ ] File exists: `components/Modal.tsx`
- [ ] Modal opens and closes correctly
- [ ] Screenshot of modal in browser
- [ ] TypeScript compilation passes
- [ ] Test: Open modal → All close methods work → Body scroll restored

---

### Prompt 6: Form Components Library

**Natural Language Prompt:**
```
Create a production-ready forms component library for FashionOS with consistent styling and validation.

STEP 1: Directory Structure
- Create directory: components/forms/
- Create files: Input.tsx, Textarea.tsx, Select.tsx, Checkbox.tsx, Radio.tsx
- Each component exported as named export
- Use React.FC with TypeScript

STEP 2: Input Component (components/forms/Input.tsx)
- Props: label (optional string), error (optional string), helperText (optional string), type (string, default 'text'), required (boolean), disabled (boolean), placeholder (string), value, onChange, className
- Styling: Match Button component style (border, rounded-sm, padding)
- States: default, focus (ring-2 ring-black), error (border-red-500), disabled (opacity-50)
- Label above input, error below input
- Use FashionOS design system colors

STEP 3: Textarea Component (components/forms/Textarea.tsx)
- Similar props to Input
- Multi-line text input
- Resizable (resize-y or resize-none)
- Min-height for usability
- Same styling pattern as Input

STEP 4: Select Component (components/forms/Select.tsx)
- Props: label, error, helperText, options (array of {value, label}), value, onChange, placeholder, required, disabled
- Native select element styled with Tailwind
- Custom dropdown arrow (using CSS)
- Same states as Input (default, focus, error, disabled)

STEP 5: Checkbox Component (components/forms/Checkbox.tsx)
- Props: label, checked, onChange, disabled, error
- Custom styled checkbox (not native)
- Checkmark icon (lucide-react Check icon)
- Label beside checkbox
- States: checked, unchecked, disabled, error

STEP 6: Radio Component (components/forms/Radio.tsx)
- Props: label, name (for group), value, checked, onChange, disabled, error
- Custom styled radio button
- Dot indicator when selected
- Label beside radio
- Group support (multiple radios with same name)

STEP 7: Validation & Error States
- All components support error prop
- Error message displays below component (red text, text-sm)
- Error state: red border, red text
- Helper text: gray text below component (if no error)

STEP 8: Accessibility
- All inputs have proper labels (htmlFor/id connection)
- aria-describedby for error messages
- aria-invalid for error state
- aria-required for required fields
- Keyboard navigation support

STEP 9: Styling Consistency
- Match Button component border style (border-gray-300, hover:border-black)
- Match FashionOS design system
- Consistent padding (px-4 py-3)
- Consistent font sizes and weights
- Focus states: ring-2 ring-black ring-offset-2

STEP 10: Code Quality
- TypeScript interfaces for all props
- Export all interfaces (InputProps, TextareaProps, etc.)
- JSDoc comments for each component
- Default props where appropriate
- Proper event handlers (onChange with proper types)
```

**Success Criteria:**
- [ ] All 5 form components created in `components/forms/` directory
- [ ] Each component has proper TypeScript types
- [ ] Error states work on all components
- [ ] Validation UI displays correctly
- [ ] Accessibility attributes present
- [ ] Styling matches FashionOS design system
- [ ] All components are reusable

**Production-Ready Checklist:**
- [ ] All components render correctly
- [ ] Error states work
- [ ] Helper text displays
- [ ] Disabled states work
- [ ] Required fields marked
- [ ] Accessibility tested
- [ ] Mobile responsive
- [ ] TypeScript types complete
- [ ] No console warnings

**Verification Steps:**
1. Test Input component: All states (default, focus, error, disabled)
2. Test Textarea: Multi-line input, resizing
3. Test Select: Dropdown opens, options selectable
4. Test Checkbox: Check/uncheck, disabled state
5. Test Radio: Single selection, group behavior
6. Test error messages on all components
7. Test keyboard navigation
8. Test on mobile device
9. Test with screen reader

**Proof of Completion:**
- [ ] Files exist: `components/forms/Input.tsx`, `Textarea.tsx`, `Select.tsx`, `Checkbox.tsx`, `Radio.tsx`
- [ ] All components render without errors
- [ ] Screenshot of form with all components
- [ ] TypeScript compilation passes
- [ ] Test: Create form using all components → All work correctly

---

## 📄 Marketing Pages

### Prompt 7: ContactPage

**Natural Language Prompt:**
```
Create a production-ready ContactPage component for FashionOS matching the design system and structure of existing pages.

STEP 1: File Structure
- Create file: pages/public/ContactPage.tsx
- Export as named export: export const ContactPage
- Use React.FC with TypeScript
- Import existing components: Button, FadeIn, SectionTag from '../../components'

STEP 2: Page Layout
- Match structure of HomePage.tsx
- Use PublicLayout (already wrapped in App.tsx routing)
- Background: white (bg-white)
- Padding: pt-20 pb-20 (consistent with other pages)
- Container: container mx-auto px-4 md:px-8 lg:px-12

STEP 3: Hero Section
- SectionTag: "Get in Touch" or "Contact Us"
- Main heading: "Let's Create Something Amazing" (serif font, Playfair Display)
- Subheading: Brief description of contact options
- Use FadeIn component for animation
- Centered text alignment

STEP 4: Contact Form Section
- Two-column layout on desktop (lg:flex-row), stacked on mobile
- Left column: Contact form
- Right column: Contact information cards
- Form fields: Name (Input), Email (Input), Subject (Select), Message (Textarea)
- Use form components from components/forms/ (or create inline if not available)
- Submit button: Use Button component with variant="primary"
- Form validation: Required fields, email format validation

STEP 5: Contact Information Cards
- Three cards: Email, Phone, Address
- Each card: Icon (lucide-react), title, value, description
- Styling: White background, border, hover effect
- Icons: Mail, Phone, MapPin from lucide-react
- Layout: Grid (grid-cols-1 md:grid-cols-3) with gap

STEP 6: Map Placeholder
- Section below contact form
- Placeholder div with gray background
- Text: "Map coming soon" or use Google Maps embed (optional)
- Height: h-96 (24rem)
- Rounded corners

STEP 7: Additional Sections (Optional)
- FAQ section: Common questions about contacting
- Office hours section
- Social media links

STEP 8: Styling
- Match FashionOS design system
- Serif fonts for headings (Playfair Display)
- Sans-serif for body text (Inter)
- Black/white color scheme
- Use FadeIn for section animations
- Use SectionTag for section labels

STEP 9: Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Form stacks on mobile
- Contact cards stack on mobile
- Proper spacing on all screen sizes

STEP 10: Code Quality
- TypeScript types for form state
- Form handling with useState
- Proper event handlers
- JSDoc comments
- Clean component structure
```

**Success Criteria:**
- [ ] ContactPage created at `pages/public/ContactPage.tsx`
- [ ] Hero section displays correctly
- [ ] Contact form renders with all fields
- [ ] Contact information cards display
- [ ] Map placeholder visible
- [ ] Matches HomePage.tsx structure
- [ ] Responsive on all devices
- [ ] Form validation works
- [ ] TypeScript compilation passes

**Production-Ready Checklist:**
- [ ] Page structure matches existing pages
- [ ] All sections render correctly
- [ ] Form fields functional
- [ ] Contact cards display information
- [ ] Responsive design works
- [ ] FadeIn animations work
- [ ] SectionTag components used
- [ ] Button component integrated
- [ ] TypeScript types complete
- [ ] No console errors

**Verification Steps:**
1. Navigate to `/contact` route
2. Verify hero section displays
3. Test form: Fill all fields, submit
4. Verify contact cards display
5. Check map placeholder
6. Test responsive design (mobile, tablet, desktop)
7. Verify animations (FadeIn)
8. Check browser console for errors
9. Test form validation (required fields, email format)

**Proof of Completion:**
- [ ] File exists: `pages/public/ContactPage.tsx`
- [ ] Route added to App.tsx: `<Route path="/contact" element={<ContactPage />} />`
- [ ] Page renders at `/contact` URL
- [ ] Screenshot of complete page
- [ ] TypeScript compilation passes
- [ ] Form submission works (even if just console.log for now)
- [ ] Mobile responsive verified

---

### Prompt 8: AboutPage

**Natural Language Prompt:**
```
Create a production-ready AboutPage component for FashionOS showcasing company story, team, and values.

STEP 1: File Structure
- Create file: pages/public/AboutPage.tsx
- Export as named export: export const AboutPage
- Use React.FC with TypeScript
- Import: Button, FadeIn, SectionTag from '../../components'

STEP 2: Page Layout
- Match structure of HomePage.tsx
- Background: white (bg-white)
- Container: container mx-auto px-4 md:px-8 lg:px-12
- Padding: pt-20 pb-20

STEP 3: Hero Section
- SectionTag: "About FashionOS"
- Main heading: "The Operating System for Fashion" (serif font, large)
- Subheading: Mission statement (2-3 sentences)
- Centered text alignment
- Use FadeIn component

STEP 4: Mission Statement Section
- Full-width section with background (bg-gray-50 or white)
- Large text block explaining company mission
- Serif font for emphasis
- Padding: py-16

STEP 5: Team Members Grid
- SectionTag: "Our Team"
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Team member cards:
  - Photo (aspect-square, rounded)
  - Name (serif font, bold)
  - Role (uppercase, tracking-wide, gray text)
  - Bio (short description, 2-3 lines)
  - Social links (optional, icons)
- Hover effect: Scale or shadow
- Use FadeIn for each card

STEP 6: Company Values Section
- SectionTag: "Our Values"
- Three or four value cards in grid
- Each card: Icon, title, description
- Icons: Use lucide-react (Heart, Target, Users, Sparkles)
- Styling: White background, border, padding

STEP 7: Timeline/History Section (Optional)
- SectionTag: "Our Journey"
- Vertical timeline or horizontal cards
- Key milestones with dates
- Visual timeline with connecting lines

STEP 8: CTA Section
- Final section with call-to-action
- Heading: "Ready to Get Started?"
- Description: Brief invitation
- Button: "Start Your Project" (links to /start-project)
- Background: Can be colored or white
- Use Button component

STEP 9: Styling
- Match FashionOS design system
- Serif fonts (Playfair Display) for headings
- Sans-serif (Inter) for body text
- Black/white/gray color scheme
- Consistent spacing (gap-8, gap-12)
- Use FadeIn animations throughout

STEP 10: Responsive Design
- Mobile-first approach
- Team grid: 1 column mobile, 2 tablet, 3 desktop
- Values grid: 1 column mobile, 2 desktop
- Proper spacing on all breakpoints

STEP 11: Code Quality
- TypeScript types
- Clean component structure
- Reusable team member card component (can be inline)
- JSDoc comments
```

**Success Criteria:**
- [ ] AboutPage created at `pages/public/AboutPage.tsx`
- [ ] Hero section with mission statement
- [ ] Team members grid displays
- [ ] Company values section displays
- [ ] CTA section at bottom
- [ ] Matches HomePage.tsx structure
- [ ] Responsive on all devices
- [ ] All animations work

**Production-Ready Checklist:**
- [ ] All sections render correctly
- [ ] Team member cards display
- [ ] Values section complete
- [ ] Responsive grid layouts work
- [ ] FadeIn animations smooth
- [ ] Button component integrated
- [ ] SectionTag components used
- [ ] TypeScript types complete
- [ ] No console errors

**Verification Steps:**
1. Navigate to `/about` route (add to App.tsx if not exists)
2. Verify all sections display
3. Check team member grid (responsive)
4. Verify values section
5. Test CTA button (links to /start-project)
6. Test responsive design
7. Verify animations
8. Check browser console

**Proof of Completion:**
- [ ] File exists: `pages/public/AboutPage.tsx`
- [ ] Route added to App.tsx
- [ ] Page renders at `/about`
- [ ] Screenshot of complete page
- [ ] All sections visible
- [ ] TypeScript compilation passes

---

### Prompt 9: PricingPage

**Natural Language Prompt:**
```
Create a production-ready PricingPage component for FashionOS with tiered pricing and feature comparison.

STEP 1: File Structure
- Create file: pages/public/PricingPage.tsx
- Export as named export: export const PricingPage
- Use React.FC with TypeScript
- Import: Button, FadeIn, SectionTag from '../../components'

STEP 2: Page Layout
- Match structure of ServicesPage.tsx
- Background: white (bg-white)
- Container: container mx-auto px-4 md:px-8 lg:px-12
- Padding: pt-20 pb-20

STEP 3: Hero Section
- SectionTag: "Pricing"
- Main heading: "Simple, Transparent Pricing" (serif font)
- Subheading: Brief description of pricing model
- Centered text alignment
- Use FadeIn component

STEP 4: Pricing Tiers Section
- Three pricing cards: Starter, Professional, Enterprise
- Grid layout: grid-cols-1 md:grid-cols-3
- Each card contains:
  - Tier name (serif font, bold)
  - Price (large number, currency)
  - Billing period ("per month" or "one-time")
  - Feature list (bullet points)
  - CTA button ("Get Started" or "Contact Sales")
  - Popular badge (optional, for middle tier)
- Styling: White background, border, hover effect (border-black)
- Popular tier: Highlighted with border-black or colored background

STEP 5: Feature Comparison Table
- SectionTag: "Compare Plans"
- Table with features as rows, plans as columns
- Features list: Common features (e.g., "Event Management", "AI Assistance", "Analytics", etc.)
- Checkmarks (✓) for included features
- Dashes (-) for not included
- Responsive: Scrollable table on mobile, or card-based comparison

STEP 6: FAQ Section
- SectionTag: "Frequently Asked Questions"
- Accordion-style FAQ items
- Questions: Clickable, expand to show answers
- Common questions about pricing, billing, features
- Use FadeIn for each FAQ item

STEP 7: CTA Section
- Final section
- Heading: "Still have questions?"
- Description: Invitation to contact
- Button: "Contact Us" (links to /contact)
- Use Button component

STEP 8: Styling
- Match ServicesPage.tsx card styling
- Hover effects on pricing cards
- Consistent spacing
- Serif fonts for headings
- Sans-serif for body
- Use FadeIn animations

STEP 9: Responsive Design
- Pricing cards: Stack on mobile, 3 columns desktop
- Comparison table: Scrollable on mobile or card view
- FAQ: Full width, stacked
- Proper spacing on all breakpoints

STEP 10: Code Quality
- TypeScript types for pricing data
- Reusable pricing card component (can be inline)
- Clean structure
- JSDoc comments
```

**Success Criteria:**
- [ ] PricingPage created at `pages/public/PricingPage.tsx`
- [ ] Three pricing tiers display
- [ ] Feature comparison table works
- [ ] FAQ section functional
- [ ] CTA section at bottom
- [ ] Matches ServicesPage.tsx styling
- [ ] Responsive on all devices

**Production-Ready Checklist:**
- [ ] All pricing cards render
- [ ] Feature comparison displays
- [ ] FAQ accordion works
- [ ] Hover effects smooth
- [ ] Responsive layouts work
- [ ] Button components integrated
- [ ] TypeScript types complete

**Verification Steps:**
1. Navigate to `/pricing` route
2. Verify pricing tiers display
3. Check feature comparison table
4. Test FAQ accordion (expand/collapse)
5. Test responsive design
6. Verify CTA button
7. Check browser console

**Proof of Completion:**
- [ ] File exists: `pages/public/PricingPage.tsx`
- [ ] Route added to App.tsx
- [ ] Page renders correctly
- [ ] Screenshot of pricing page
- [ ] TypeScript compilation passes

---

## 🔐 Authentication Pages

### Prompt 10: LoginPage

**Natural Language Prompt:**
```
Create a production-ready LoginPage component for FashionOS authentication with email/password and social login.

STEP 1: File Structure
- Create directory: pages/auth/ (if not exists)
- Create file: pages/auth/LoginPage.tsx
- Export as named export: export const LoginPage
- Use React.FC with TypeScript
- Import: Button, FadeIn from '../../components'
- Import form components from '../../components/forms' (if available)

STEP 2: Page Layout
- Centered layout (flex items-center justify-center min-h-screen)
- Background: white or gray-50
- Container: max-w-md w-full
- Padding: p-8

STEP 3: Login Form
- Form container: White background, border, rounded-sm, shadow
- Logo/Title: "FashionOS" or logo at top
- Heading: "Welcome Back" (serif font)
- Subheading: "Sign in to your account"
- Form fields:
  - Email input (type="email", required)
  - Password input (type="password", required, show/hide toggle)
  - "Forgot Password?" link (right-aligned, links to /forgot-password)
- Submit button: "Sign In" (Button component, variant="primary", fullWidth)
- Form validation: Email format, required fields

STEP 4: Social Login Section
- Divider: "Or continue with" (text with lines on sides)
- Social buttons: Google, LinkedIn (optional: Instagram)
- Each button: Icon + "Continue with [Platform]"
- Styling: Outline variant, full width
- Use Button component with variant="outline"
- Icons: Use lucide-react or simple text

STEP 5: Sign Up Link
- Text: "Don't have an account?"
- Link: "Sign up" (links to /signup)
- Centered at bottom of form

STEP 6: Styling
- Match FashionOS design system
- Serif font for heading
- Sans-serif for form text
- Black/white color scheme
- Consistent spacing
- Use FadeIn animation for form

STEP 7: Form State Management
- useState for email and password
- useState for form errors
- Handle form submission (prevent default)
- Validation logic
- Error display below fields

STEP 8: Accessibility
- Proper form labels (htmlFor/id)
- aria-describedby for errors
- Keyboard navigation
- Focus management

STEP 9: Responsive Design
- Mobile: Full width with padding
- Desktop: Centered, max-width
- Form fields: Full width
- Buttons: Full width on mobile

STEP 10: Code Quality
- TypeScript types for form state
- Proper event handlers
- Form validation
- JSDoc comments
- Clean structure
```

**Success Criteria:**
- [ ] LoginPage created at `pages/auth/LoginPage.tsx`
- [ ] Email/password form renders
- [ ] Social login buttons display
- [ ] Form validation works
- [ ] "Forgot Password" link works
- [ ] "Sign up" link works
- [ ] Responsive design
- [ ] TypeScript compilation passes

**Production-Ready Checklist:**
- [ ] Form fields functional
- [ ] Validation displays errors
- [ ] Social buttons render
- [ ] Links navigate correctly
- [ ] Responsive on mobile
- [ ] Accessibility features
- [ ] TypeScript types complete

**Verification Steps:**
1. Navigate to `/login` route
2. Test email input
3. Test password input (show/hide)
4. Test form validation (empty fields, invalid email)
5. Test "Forgot Password" link
6. Test "Sign up" link
7. Test social login buttons (UI only for now)
8. Test responsive design
9. Check browser console

**Proof of Completion:**
- [ ] File exists: `pages/auth/LoginPage.tsx`
- [ ] Route added to App.tsx
- [ ] Page renders at `/login`
- [ ] Screenshot of login page
- [ ] Form validation works
- [ ] TypeScript compilation passes

---

## 📊 Dashboard Modules

### Prompt 11: DashboardSettings

**Natural Language Prompt:**
```
Create a production-ready DashboardSettings component for FashionOS with tabbed interface for profile, account, notifications, and team management.

STEP 1: File Structure
- Create file: pages/dashboard/DashboardSettings.tsx
- Export as named export: export const DashboardSettings
- Use React.FC with TypeScript
- Import: Button from '../../components/Button'
- Import form components from '../../components/forms' (if available)

STEP 2: Page Layout
- Match structure of other dashboard pages (DashboardEvents.tsx)
- Use DashboardLayout (already wrapped in routing)
- Container: Full width with padding
- Header: "Settings" heading with description

STEP 3: Tab Navigation
- Horizontal tabs: Profile, Account, Notifications, Team
- Active tab: Underline or border-bottom (black)
- Inactive tabs: Gray text, hover effect
- State management: useState for activeTab
- Click handler to switch tabs

STEP 4: Profile Tab
- Form sections:
  - Avatar upload: Image preview, "Change Avatar" button, file input (hidden)
  - Name input
  - Title/Role input
  - Bio textarea
  - Location input
  - Social links (optional): Instagram, LinkedIn, Twitter
- "Save Changes" button at bottom
- Form state: useState for each field

STEP 5: Account Tab
- Sections:
  - Email: Display current email, "Change Email" button
  - Password: "Change Password" button (opens modal or form)
  - Two-factor authentication: Toggle switch
  - Delete account: Danger zone section with red button
- Styling: Consistent with other tabs

STEP 6: Notifications Tab
- Toggle switches for:
  - Email notifications (on/off)
  - New bookings (on/off)
  - Event reminders (on/off)
  - Marketing emails (on/off)
  - Weekly digest (on/off)
- Each toggle: Label, description, switch component
- "Save Preferences" button

STEP 7: Team Tab
- Team member list:
  - Table or cards showing: Name, Role, Email, Status, Actions
  - Roles: Admin, Member, Viewer (badges)
  - Actions: Edit, Remove buttons
- "Invite Member" button at top
- Invite form (modal or inline): Email, Role selector, "Send Invite" button

STEP 8: Styling
- Match DashboardEvents.tsx styling
- Consistent spacing and typography
- Tab styling: Clean, minimal
- Form styling: Use form components
- Button styling: Use Button component

STEP 9: Responsive Design
- Tabs: Scrollable on mobile or stack
- Forms: Stack on mobile
- Team table: Scrollable on mobile or card view
- Proper spacing on all breakpoints

STEP 10: Code Quality
- TypeScript types for all state
- Proper form handling
- Tab switching logic
- JSDoc comments
- Clean component structure
```

**Success Criteria:**
- [ ] DashboardSettings created at `pages/dashboard/DashboardSettings.tsx`
- [ ] Tab navigation works
- [ ] All 4 tabs render content
- [ ] Profile form displays
- [ ] Account settings display
- [ ] Notification toggles work
- [ ] Team management section displays
- [ ] Responsive design

**Production-Ready Checklist:**
- [ ] All tabs functional
- [ ] Forms render correctly
- [ ] Toggle switches work
- [ ] Team list displays
- [ ] Responsive layouts
- [ ] TypeScript types complete
- [ ] No console errors

**Verification Steps:**
1. Navigate to `/dashboard/settings`
2. Test tab switching
3. Test Profile tab form
4. Test Account tab
5. Test Notifications toggles
6. Test Team tab
7. Test responsive design
8. Check browser console

**Proof of Completion:**
- [ ] File exists: `pages/dashboard/DashboardSettings.tsx`
- [ ] Page renders at `/dashboard/settings`
- [ ] All tabs work
- [ ] Screenshot of settings page
- [ ] TypeScript compilation passes

---

## 🎯 Multi-Step Wizard

### Prompt 12: StartProjectPage (Multi-Step Wizard)

**Natural Language Prompt:**
```
Create a production-ready StartProjectPage component with Typeform-style multi-step wizard for FashionOS.

STEP 1: File Structure
- Create file: pages/public/StartProjectPage.tsx
- Export as named export: export const StartProjectPage
- Use React.FC with TypeScript
- Import: Button, FadeIn, SectionTag from '../../components'

STEP 2: Wizard State Management
- useState for currentStep (1-4)
- useState for form data (category, budget, vision, contact)
- useState for progress percentage
- Step names: ['Category', 'Budget', 'Vision', 'Contact']

STEP 3: Progress Bar
- Top of page, fixed or sticky
- Visual progress indicator (0% to 100%)
- Step indicators: Dots or numbers showing current step
- Progress calculation: (currentStep / totalSteps) * 100
- Styling: Black bar that fills, or step dots that highlight

STEP 4: Step 1 - Category Selection
- Heading: "What type of project are you planning?"
- Visual category cards in grid:
  - Photography
  - Video Production
  - Social Media
  - E-commerce
  - Web Design
  - Event Planning
- Each card: Icon, title, description, hover effect
- Selection: Click to select, visual feedback (border-black or background change)
- "Next" button at bottom

STEP 5: Step 2 - Budget Range
- Heading: "What's your budget range?"
- Budget options: Radio buttons or cards
  - Under $1,000
  - $1,000 - $5,000
  - $5,000 - $10,000
  - $10,000 - $25,000
  - $25,000+
- Or: Slider component for budget selection
- "Back" and "Next" buttons

STEP 6: Step 3 - Vision/Description
- Heading: "Tell us about your vision"
- Large textarea for project description
- Placeholder: "Describe your project goals, timeline, and any specific requirements..."
- Character count (optional)
- "Back" and "Next" buttons

STEP 7: Step 4 - Contact Information
- Heading: "How can we reach you?"
- Form fields:
  - Name (required)
  - Email (required, validation)
  - Phone (optional)
  - Company (optional)
- "Back" and "Submit" buttons
- Submit handler: Log data or show success

STEP 8: Success State
- After submission, show success page
- Heading: "Thank you! We've received your brief."
- Description: Next steps information
- Button: "Return to Home" (links to /)
- Confetti animation (optional)

STEP 9: Transitions
- Smooth transitions between steps
- FadeIn animation for each step
- Slide animation (optional): Slide out current, slide in next
- Duration: 300ms

STEP 10: Navigation
- "Back" button: Goes to previous step (disabled on step 1)
- "Next" button: Validates current step, advances
- Progress bar updates on step change
- Keyboard: Enter to advance (optional)

STEP 11: Styling
- Match FashionOS design system
- Full-screen or centered container
- Serif fonts for headings
- Clean, minimal design
- Use Button component
- Use FadeIn animations

STEP 12: Responsive Design
- Mobile: Full screen, stacked layout
- Desktop: Centered container, max-width
- Category cards: 1 column mobile, 2-3 desktop
- Form fields: Full width

STEP 13: Code Quality
- TypeScript types for wizard state
- Form validation for each step
- Clean step components (can be inline or separate)
- JSDoc comments
- Proper event handlers
```

**Success Criteria:**
- [ ] StartProjectPage created at `pages/public/StartProjectPage.tsx`
- [ ] Progress bar displays and updates
- [ ] All 4 steps render correctly
- [ ] Step navigation works (Next/Back)
- [ ] Form validation works
- [ ] Success state displays
- [ ] Transitions smooth
- [ ] Responsive design

**Production-Ready Checklist:**
- [ ] All steps functional
- [ ] Progress bar accurate
- [ ] Form validation works
- [ ] Transitions smooth
- [ ] Success state works
- [ ] Responsive on mobile
- [ ] TypeScript types complete

**Verification Steps:**
1. Navigate to `/start-project`
2. Test Step 1: Select category, click Next
3. Test Step 2: Select budget, click Next
4. Test Step 3: Enter description, click Next
5. Test Step 4: Fill contact info, click Submit
6. Verify success state
7. Test Back button on each step
8. Test progress bar updates
9. Test responsive design
10. Check browser console

**Proof of Completion:**
- [ ] File exists: `pages/public/StartProjectPage.tsx`
- [ ] Route added to App.tsx
- [ ] All 4 steps work
- [ ] Success state displays
- [ ] Screenshot of wizard flow
- [ ] TypeScript compilation passes
- [ ] Test: Complete full wizard flow → Success page appears

---

## 📝 General Guidelines for All Prompts

### Code Quality Standards
- **TypeScript**: All components must have proper TypeScript types
- **Imports**: Use existing components (Button, FadeIn, SectionTag)
- **Styling**: Tailwind CSS only, no inline styles
- **Responsive**: Mobile-first design
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: No unnecessary re-renders

### Design System Consistency
- **Fonts**: Serif (Playfair Display) for headings, Sans-serif (Inter) for body
- **Colors**: Black, white, gray palette
- **Spacing**: Consistent padding and margins
- **Borders**: rounded-sm for FashionOS style
- **Animations**: Use FadeIn component for sections

### Verification Checklist (Apply to All)
- [ ] File created in correct location
- [ ] Component exports correctly
- [ ] TypeScript compilation passes
- [ ] No console errors
- [ ] Responsive design works
- [ ] Matches design system
- [ ] Accessibility features present
- [ ] Screenshot provided
- [ ] Route added to App.tsx (if page component)

### Proof of Completion Template
For each task, provide:
1. **File Location**: Exact path to created file
2. **Screenshot**: Visual proof of component/page
3. **Code Snippet**: Key code showing implementation
4. **Test Results**: TypeScript compilation, no errors
5. **Functionality**: Description of what works
6. **Next Steps**: What still needs manual work (backend integration, etc.)

---

**Last Updated:** 2025-01-25  
**Total Prompts:** 12 comprehensive multi-step prompts  
**Categories:** UI Components (6), Marketing Pages (3), Auth Pages (1), Dashboard Modules (1), Multi-Step Wizard (1)

---

## ✅ Implementation Status

### Completed (10/12 Prompts - 83%)

**UI Components (6/6 - 100%):**
- ✅ Prompt 1: LoadingSpinner - `components/LoadingSpinner.tsx` (52 lines)
- ✅ Prompt 2: SkeletonLoader - `components/SkeletonLoader.tsx` (65 lines)
- ✅ Prompt 3: ErrorBoundary - `components/ErrorBoundary.tsx` (94 lines)
- ✅ Prompt 4: Toast + useToast - `components/Toast.tsx` (127 lines), `hooks/useToast.ts` (61 lines)
- ✅ Prompt 5: Modal - `components/Modal.tsx` (118 lines)
- ✅ Prompt 6: Form Components - `components/forms/*.tsx` (5 components, 376 lines total)

**Marketing Pages (3/3 - 100%):**
- ✅ Prompt 7: ContactPage - `pages/public/ContactPage.tsx` (207 lines)
- ✅ Prompt 8: AboutPage - `pages/public/AboutPage.tsx` (189 lines)
- ✅ Prompt 9: PricingPage - `pages/public/PricingPage.tsx` (273 lines)

**Authentication Pages (1/1 - 100%):**
- ✅ Prompt 10: LoginPage - `pages/auth/LoginPage.tsx` (165 lines)

### Remaining (2/12 Prompts - 17%)

**Dashboard Modules:**
- ⏳ Prompt 11: DashboardSettings - Pending

**Multi-Step Wizard:**
- ⏳ Prompt 12: StartProjectPage (Enhanced) - Pending (basic version exists)

### Verification

**Files Created:** 15 files  
**Total Lines:** ~1,800 lines of production-ready code  
**TypeScript Errors:** 0 (in new components)  
**Linter Errors:** 0  
**Routes Added:** 4 routes in App.tsx  
**Status:** ✅ All completed components are production-ready

**See:** `docs/PROMPTS_COMPLETION_REPORT.md` for detailed verification checklist.

