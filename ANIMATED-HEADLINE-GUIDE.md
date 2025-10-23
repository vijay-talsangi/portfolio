# Animated Headline Feature Guide

## Overview
The Hero section now supports an animated text flip effect where words cycle through with smooth animations. This feature uses the `LayoutTextFlip` component and pulls data from Sanity CMS.

## How It Works

The headline can display in two modes:

1. **Animated Mode** (when configured): Shows static text + rotating animated words
2. **Fallback Mode**: Shows the regular headline if animated fields are not configured

## Sanity Configuration

### Fields Added to Profile Schema

Three new fields have been added to the `profile` schema:

1. **Headline Static Text** (`headlineStaticText`)
   - Type: String
   - Description: The static part of your animated headline
   - Example: "I build", "I create", "Welcome to"

2. **Headline Animated Words** (`headlineAnimatedWords`)
   - Type: Array of strings
   - Validation: Minimum 2 words, maximum 10 words
   - Description: Words that will flip/animate
   - Example: ["amazing apps", "beautiful websites", "innovative solutions"]

3. **Headline Animation Duration** (`headlineAnimationDuration`)
   - Type: Number (milliseconds)
   - Default: 3000ms (3 seconds)
   - Range: 1000ms - 10000ms
   - Description: How long each word stays visible before flipping

## Setting Up in Sanity Studio

1. Navigate to your Sanity Studio (typically at `/studio`)
2. Open the **Profile** document (singleton)
3. Scroll to find the new headline animation fields
4. Fill them out:

### Example Configuration

```
Headline Static Text: "I build "
Headline Animated Words: 
  - "innovative web apps"
  - "scalable solutions"
  - "beautiful interfaces"
  - "cutting-edge AI tools"
Headline Animation Duration: 3000
```

This will display as:
- "I build **innovative web apps**" (3 seconds)
- "I build **scalable solutions**" (3 seconds)
- "I build **beautiful interfaces**" (3 seconds)
- "I build **cutting-edge AI tools**" (3 seconds)
- (cycles back to first)

## Implementation Details

### Component Structure

```tsx
<LayoutTextFlip
  text={profile.headlineStaticText}
  words={profile.headlineAnimatedWords}
  duration={profile.headlineAnimationDuration || 3000}
/>
```

### Fallback Behavior

If any of these conditions are met, the component falls back to showing the regular `headline` field:
- `headlineStaticText` is not set
- `headlineAnimatedWords` is not set or empty
- `headlineAnimatedWords` has fewer than 2 words

### Animation Features

- **Smooth transitions**: Words slide in from top and out to bottom
- **Blur effect**: Creates a smooth fade effect during transitions
- **Responsive**: Text size adapts to screen size using container queries
- **Dark mode support**: Automatically adjusts styling for dark/light themes
- **Layout animations**: Uses Framer Motion's layout animations for smooth positioning

## Styling

The animated words appear in a styled container with:
- Rounded corners
- Border and shadow effects
- Background that contrasts with the page
- Responsive font sizes (2xl on mobile, 4xl on desktop)
- Drop shadow for enhanced visibility

## Tips for Best Results

1. **Keep words similar in length** to avoid jarring layout shifts
2. **Use 3-5 words** for optimal user experience
3. **Set duration to 2500-4000ms** for comfortable reading
4. **Test both light and dark modes** to ensure visibility
5. **Keep static text concise** - it displays before each animated word

## Demo Component

A demo component is available at `components/layout-text-flip-demo.tsx` that you can use for testing:

```tsx
import LayoutTextFlipDemo from "@/components/layout-text-flip-demo";

// Use in any page
<LayoutTextFlipDemo />
```

## Troubleshooting

### Words not animating?
- Ensure you have at least 2 words in `headlineAnimatedWords`
- Check that `headlineStaticText` is filled out
- Verify the data is saved in Sanity Studio

### Layout looks broken?
- The component uses container queries - ensure parent has proper spacing
- Check responsive breakpoints in your layout

### Animation too fast/slow?
- Adjust `headlineAnimationDuration` in Sanity Studio
- Recommended range: 2000-5000ms

## Disabling the Feature

To revert to the simple headline:
1. Clear the `headlineAnimatedWords` field in Sanity
2. The component will automatically fall back to showing `headline`

## Technical Stack

- **Animation Library**: `motion` (Framer Motion)
- **Styling**: Tailwind CSS v4.0
- **State Management**: React hooks (useState, useEffect)
- **CMS**: Sanity.io with TypeScript types
- **Component Type**: Client-side rendered

