This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and configured with **Shadcn UI**, **Tailwind CSS**, and **Framer Motion**.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Custom Components

This project includes custom, high-end UI components tailored for premium experiences. 

### `HeroGeometric`
A stunning, animated hero section built with Framer Motion, featuring glassmorphism shapes, ambient gradients, and smooth scroll animations.

**Location**: `src/components/ui/shape-landing-hero.tsx`

**How to Use**:
Import the component anywhere in your app (ensure the parent page or the component itself is a Client Component by having `"use client"`).

```tsx
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function MyPage() {
  return (
    <HeroGeometric 
      badge="New Release"
      title1="Unleash Your"
      title2="Creativity"
    />
  );
}
```

**Props available**:
- `badge` (string): Text for the small rounded badge at the top.
- `title1` (string): The first half of the main heading (white text).
- `title2` (string): The second half of the main heading (gradient text).

### `DemoHeroGeometric`
A pre-configured demo wrapper for the hero component that sets some default marketing copy.

**Location**: `src/components/ui/demo.tsx`

```tsx
import { DemoHeroGeometric } from "@/components/ui/demo";

export default function Home() {
  return <DemoHeroGeometric />;
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Framer Motion](https://www.framer.com/motion/) - learn about animation in React.
- [Shadcn UI](https://ui.shadcn.com/) - explore the base component structure.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
