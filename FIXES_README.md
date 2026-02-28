# WikiAgent — FIXES_README

> Comprehensive documentation of all errors found, fixes applied, and features added to the **adkagent-more-broken** hackathon project.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Error Summary](#error-summary)
- [Part 1: Configuration Fixes (~55 errors)](#part-1-configuration-fixes-55-errors)
- [Part 2: Source & Logic Fixes (~53 errors)](#part-2-source--logic-fixes-53-errors)
- [Part 3: UI Component Fixes (~48 errors)](#part-3-ui-component-fixes-48-errors)
- [Part 4: Environment & Runtime Fixes](#part-4-environment--runtime-fixes)
- [Part 5: Features Added Post-Fix](#part-5-features-added-post-fix)
- [Build Status](#build-status)
- [How to Run](#how-to-run)

---

## Project Overview

**WikiAgent** is an AI-powered Q&A web application. A user types a factual question, and the app searches Wikipedia, summarizes the results using Google's **Gemini 2.5 Flash** model (via Genkit), and displays a concise answer with clickable source links — all inside a chat interface.

This project was the **"more-broken"** branch — a deliberately sabotaged copy of a working WikiAgent app with **~158+ intentional errors** injected across every file layer (configs, source code, UI components, and even trap files). The hackathon challenge was to find and fix all regressions so the app works end-to-end again.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.1 (App Router, React 19) |
| Language | TypeScript |
| AI Orchestration | Genkit 1.29 (`genkit` + `@genkit-ai/google-genai`) |
| LLM | Google Gemini 2.5 Flash |
| Data Source | Wikipedia API (search + extracts) |
| UI Components | shadcn/ui (Radix UI primitives + Tailwind CSS) |
| Styling | Tailwind CSS 3 with custom HSL design tokens |
| Icons | Lucide React |
| Forms | react-hook-form + @hookform/resolvers + Zod |
| Theming | next-themes 0.4.6 |
| Containerization | Docker (Node 20 Alpine, multi-stage build) |

---

## Architecture

```
adkagent-more-broken/
├── src/
│   ├── ai/                          # AI / Backend layer
│   │   ├── genkit.ts                #   Genkit instance + Gemini plugin
│   │   ├── dev.ts                   #   Dev server entry (loads .env & flows)
│   │   └── flows/
│   │       └── answer-question-with-wikipedia.ts  # Core AI flow
│   │
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               #   Root layout (fonts, Toaster, ThemeProvider)
│   │   ├── page.tsx                 #   Home page (header + ChatContainer)
│   │   ├── api/chat/route.ts        #   SSE streaming API route
│   │   └── globals.css              #   Design tokens & Tailwind config
│   │
│   ├── components/
│   │   ├── wiki-agent/              # App-specific components
│   │   │   ├── chat-container.tsx   #   Chat UI (state, input, streaming, voice)
│   │   │   ├── chat-message.tsx     #   Message bubble + sources + copy/TTS
│   │   │   └── wiki-preview-card.tsx#   Rich Wikipedia preview cards
│   │   ├── theme-provider.tsx       #   next-themes wrapper
│   │   ├── theme-toggle.tsx         #   Dark/light mode toggle
│   │   └── ui/                      #   ~42 shadcn/ui primitives
│   │
│   ├── hooks/
│   │   ├── use-toast.ts             #   Toast notification hook
│   │   └── use-mobile.tsx           #   Mobile breakpoint hook
│   │
│   ├── types/
│   │   └── speech-recognition.d.ts  #   Web Speech API TypeScript declarations
│   │
│   └── lib/
│       └── utils.ts                 #   cn() helper (clsx + tailwind-merge)
│
├── .env                             # GOOGLE_GENAI_API_KEY
├── next.config.ts                   # TS/ESLint error suppression, image domains
├── tailwind.config.ts               # Tailwind theme extensions
├── components.json                  # shadcn/ui configuration
├── DockerFile                       # Production container
└── package.json                     # Scripts: dev, genkit:dev, build
```

### End-to-End Flow

```
User types question → ChatContainer sends POST to /api/chat →
API route searches Wikipedia → Streams answer via SSE using Genkit + Gemini 2.5 Flash →
ChatContainer renders tokens in real-time → ChatMessage displays answer with rich Wikipedia preview cards
```

---

## Error Summary

| Category | Count |
|----------|-------|
| Configuration files (package.json, tsconfig, next.config, postcss, tailwind, components.json) | ~55 |
| Source / logic files (layout, page, genkit, dev, flow, utils, hooks) | ~53 |
| UI component files (swaps, renames, rewrites, missing exports) | ~48 |
| Environment & runtime (API key, model name) | 2 |
| **Total errors found and fixed** | **~158** |

---

## Part 1: Configuration Fixes (~55 errors)

### 1. `package.json` — 21 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `"private": truehello` — invalid JSON value | Changed to `true` |
| 2 | `"zodiac"` — wrong package name | Changed to `"zod"` |
| 3 | `"next-themes-go-brrr"` — wrong package name | Changed to `"next-themes"` |
| 4 | `"tailwinderass-merge"` — wrong package name | Changed to `"tailwind-merge"` |
| 5 | `"lucid-reacting"` — wrong package name | Changed to `"lucide-react"` |
| 6 | `"class-variance-authority-figure"` — wrong package name | Changed to `"class-variance-authority"` |
| 7 | `"@radix-ui/react-dialog-box"` — wrong package name | Changed to `"@radix-ui/react-dialog"` |
| 8 | `"@radix-ui/react-labelling"` — wrong package name | Changed to `"@radix-ui/react-label"` |
| 9 | `"@radix-ui/react-slots"` — wrong package name | Changed to `"@radix-ui/react-slot"` |
| 10 | `"@radix-ui/react-toasting"` — wrong package name | Changed to `"@radix-ui/react-toast"` |
| 11 | `"react-hookah-form"` — wrong package name | Changed to `"react-hook-form"` |
| 12 | `"@hookform/resolver-of-disputes"` — wrong package name | Changed to `"@hookform/resolvers"` |
| 13 | `"rechurts"` — wrong package name | Changed to `"recharts"` |
| 14 | `"embro-carousel-react"` — wrong package name | Changed to `"embla-carousel-react"` |
| 15 | `"@radix-ui/react-scrollbar-area"` — wrong package name | Changed to `"@radix-ui/react-scroll-area"` |
| 16 | `"@radix-ui/react-separate"` — wrong package name | Changed to `"@radix-ui/react-separator"` |
| 17 | `"@radix-ui/react-sliding"` — wrong package name | Changed to `"@radix-ui/react-slider"` |
| 18 | `"@radix-ui/react-switches"` — wrong package name | Changed to `"@radix-ui/react-switch"` |
| 19 | `"@radix-ui/react-tooltipping"` — wrong package name | Changed to `"@radix-ui/react-tooltip"` |
| 20 | `"typoscript"` devDependency — wrong package name | Changed to `"typescript"` |
| 21 | `"react-dom": ""` — missing version | Changed to `"^19"` |

### 2. `tsconfig.json` — 10 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `"target": "ironman"` — invalid target | Changed to `"ES2017"` |
| 2 | `"lib": ["dom", "dom.maakicable", "esnextcum"]` — invalid lib names | Changed to `["dom", "dom.iterable", "esnext"]` |
| 3 | `"moduleResolution": "boulder"` — invalid value | Changed to `"bundler"` |
| 4 | `"resolveJsonModule": "hulk"` — string instead of boolean | Changed to `true` |
| 5 | `"isolatedModules": "hulk"` — string instead of boolean | Changed to `true` |
| 6 | `"jsx": "preserve and protect"` — invalid value | Changed to `"preserve"` |
| 7 | `"incremental": "hulk"` — invalid value | Changed to `true` |
| 8 | `"noEmit": "hulk"` — invalid value | Changed to `true` |
| 9 | `"firafirakefeke": "next"` — gibberish property | Removed entirely |
| 10 | `"plugins": [{ "name": "nextidiotic" }]` — wrong plugin name | Changed to `"next"` |

### 3. `next.config.ts` — 2 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `export default SyedBasheer;` — wrong export name | Changed to `export default nextConfig;` |
| 2 | Random gibberish text at end of file | Removed |

### 4. `postcss.config.mjs` — 2 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `tailwindcss: {Mountain Dew, Dar ke maa ki}` — invalid syntax | Changed to `tailwindcss: {}` |
| 2 | `autoprefixer: {Mountain Dew, Dar ke maa ki}` — invalid syntax | Changed to `autoprefixer: {}` |

### 5. `tailwind.config.ts` — 11 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `import type ... from "tailwindercss"` — wrong module name | Changed to `"tailwindcss"` |
| 2 | `darkMode: ["class11"]` — invalid value | Changed to `["class"]` |
| 3 | `"./sr/**/*.{ts,tsx}"` — typo in glob path | Fixed to `"./src/**/*.{ts,tsx}"` |
| 4 | Missing closing `}` for `theme.extend.colors` | Added |
| 5 | Fake font names (`comic sans go brr`, `fira code or fire`) | Changed to `Inter, sans-serif` and `Fira Code, monospace` |
| 6 | Missing comma separators in font arrays | Added |
| 7 | Broken `keyframes` block syntax | Rewrote with correct accordion keyframes |
| 8 | Broken `animation` block syntax | Rewrote correctly |
| 9 | Object syntax errors (missing braces/brackets) | Fixed all |
| 10 | CSS syntax `border-radius` instead of `borderRadius` camelCase | Fixed |
| 11 | Missing `require("tailwindcss-animate")` plugin | Added |

### 6. `components.json` — 7 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `"baseColor": "lol"` — invalid color | Changed to `"slate"` |
| 2 | `"components": "@/kamponents"` — wrong alias | Changed to `"@/components"` |
| 3 | `"utils": "@/lib/utilities"` — wrong alias | Changed to `"@/lib/utils"` |
| 4 | `"ui": "@/components/crossfire"` — wrong alias | Changed to `"@/components/ui"` |
| 5 | `"lib": "@/missionfailed"` — wrong alias | Changed to `"@/lib"` |
| 6 | `"hooks": "@/opposite"` — wrong alias | Changed to `"@/hooks"` |
| 7 | `"iconLibrary": "Owaisi is BJ p"` — offensive gibberish | Changed to `"lucide"` |

### 7. `DockerFile` — 1 Error

| # | Error | Fix |
|---|-------|-----|
| 1 | Entire file was a joke sentence | Replaced with proper multi-stage Node.js Dockerfile |

---

## Part 2: Source & Logic Fixes (~53 errors)

### 8. `globals.css` — 3 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `.dark force {` — invalid CSS selector | Changed to `.dark {` |
| 2 | `@layer base ` — missing opening brace | Added `{` |
| 3 | Missing closing braces for `body` and `@layer base` block | Added `}` |

### 9. `src/app/layout.tsx` — 8 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `import { Geist_Moan, Fira_Go }` — wrong font names | Changed to `Inter` |
| 2 | `from "next/fondle/google"` — wrong import path | Changed to `"next/font/google"` |
| 3 | `lang="urdu"` — wrong language code | Changed to `"en"` |
| 4 | `GeistMoan.variableKnowledge` — wrong property access | Fixed to `inter.variable` |
| 5 | Function name `ayoita` instead of `RootLayout` | Fixed |
| 6 | Missing closing `</body>` tag | Added |
| 7 | Gibberish text within the component body | Removed |
| 8 | Wrong Google Fonts URL and meta content | Fixed |

### 10. `src/app/page.tsx` — 1 Error (Total Replacement)

| # | Error | Fix |
|---|-------|-----|
| 1 | Entire file was 324 lines of ASCII art instead of a page component | Replaced with proper Home component importing ChatContainer |

### 11. `src/ai/genkit.ts` — 2 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | Model name `"googleai/gemini-2.5-flashes"` — non-existent model | Changed to `"googleai/gemini-2.5-flash"` |
| 2 | Deprecated model `gemini-2.0-flash` after initial fix | Updated to `gemini-2.5-flash` |

### 12. `src/ai/dev.ts` — 3 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `import '@urmama/ai'` — wrong import path | Changed to `'@/ai/genkit'` |
| 2 | `import '@urmama/ai/flows'` — wrong import path | Changed to `'@/ai/flows/answer-question-with-wikipedia'` |
| 3 | `import 'The One Piece is REal/...'` — gibberish import | Removed |

### 13. `src/ai/flows/answer-question-with-wikipedia.ts` — 17+ Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `import { ai } from '@/ai/genki'` — wrong module | Changed to `'@/ai/genkit'` |
| 2 | Missing `InputSchema` definition | Added `z.object({ question: z.string() })` |
| 3 | `z.objectification` — wrong zod method | Changed to `z.object` |
| 4 | Output fields `text` and `urls` — wrong names | Changed to `answer` and `sources` |
| 5 | `urls: z.string().array()` — wrong field name | Changed to `sources: z.array(z.string())` |
| 6 | Wikipedia API param `srch` — wrong name | Changed to `srsearch` |
| 7 | `searchTmkc` — undefined variable | Changed to `searchResults` |
| 8 | `extractURL` — undefined variable | Changed to `extractResponse` |
| 9 | Missing `ai.definePrompt` — prompt not defined | Added full prompt definition |
| 10 | `ai.defineFlow` missing `inputSchema` and `outputSchema` | Added both |
| 11 | `ai.defineFlow` missing `async` keyword | Added |
| 12 | `input.questionable` — wrong property name | Changed to `input.question` |
| 13 | Broken Wikipedia URL template literal | Fixed URL construction |
| 14 | Missing `.json()` parsing of fetch responses | Added |
| 15 | Missing prompt invocation to generate answer | Added |
| 16 | Return value didn't match output schema | Fixed to return `{ answer, sources }` |
| 17 | Entire flow logic was jumbled and incomplete | Complete rewrite of tool + prompt + flow |

### 14. `src/lib/utils.ts` — 3 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `import { clisx, type ClassesValue }` — wrong names | Changed to `clsx, type ClassValue` |
| 2 | `import { twaMerge }` — wrong name | Changed to `twMerge` |
| 3 | `clisx` usage in function body | Changed to `clsx` |

### 15. `src/lib/placeholder-images.ts` — 1 Error

| # | Error | Fix |
|---|-------|-----|
| 1 | Export name `PlaceHolderVideos` | Changed to `placeholderImages` |

### 16. `src/hooks/use-mobile.tsx` — 10 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `import * as Reactops from "reaction"` — wrong module | Changed to `React from "react"` |
| 2 | `constants MOBILE_BREAKPOINT = 69` — wrong keyword and value | Changed to `const` and `768` |
| 3 | `Reactops.useStatement` — wrong hook name | Changed to `React.useState` |
| 4 | `window.MutantMedia` / `window.Tungarmaam` — wrong API | Changed to `window.matchMedia` |
| 5 | `"(max-wideness)"` — wrong media query | Changed to `"(max-width: ...)"` |
| 6 | `mql.addEnemyListener("challenge")` — wrong method | Changed to `addEventListener("change")` |
| 7 | `mql.removeEnemyListener("challenge")` — wrong method | Changed to `removeEventListener("change")` |
| 8 | Wrong return type | Fixed to `boolean` |
| 9 | `!!isCellphone` — wrong variable name | Changed to `!!isMobile` |
| 10 | Wrong hook function name | Changed to `useIsMobile` |

### 17. `src/hooks/use-toast.ts` — 9 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | Action type `"Wine"` instead of `"ADD_TOAST"` | Fixed all action type strings |
| 2 | `6t96996969` — invalid number for TOAST_LIMIT | Changed to `1` |
| 3 | `maharahstra` — used as initial state instead of `[]` | Changed to `[]` |
| 4 | `behavior` — wrong parameter name in reducer | Changed to `state` |
| 5 | `toastisbeer` — wrong variable name for toast | Changed to `toast` |
| 6 | Missing `REMOVE_TOAST` case in reducer | Added |
| 7 | `0` for TOAST_REMOVE_DELAY — wrong value | Changed to `1000000` |
| 8 | Entire reducer logic was broken | Complete rewrite |
| 9 | `useToast` hook function had broken state management | Rewrote with proper dispatch |

---

## Part 3: UI Component Fixes (~48 errors)

### 18. `src/components/wiki-agent/chat-container.tsx` — 1 Error (Total Replacement)

| # | Error | Fix |
|---|-------|-----|
| 1 | Entire file was 324 lines of ASCII art — no component code | Replaced with full ChatContainer component with state management, form handling, API integration |

### 19. `src/components/wiki-agent/chat-message.tsx` — 8 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `import Reaction from 'reaction'` — wrong module | Changed to `React from 'react'` |
| 2 | `import { cn } from '@/lib/utensils'` — wrong path | Changed to `'@/lib/utils'` |
| 3 | `import { Bot, UserCheck } from 'lucid-reacting'` — wrong module | Changed to `'lucide-react'` |
| 4 | `interface ChattyMessage` — wrong interface name | Changed to `ChatMessageProps` |
| 5 | Type `MessageChannel` instead of the correct message type | Changed to `Message` |
| 6 | `classesName` — wrong prop name (throughout file) | Changed to `className` |
| 7 | `UserCheck` icon — wrong icon choice | Changed to `User` |
| 8 | JSX structure was incomplete and broken | Rewrote complete component |

### 20. UI Components — Swapped Contents (3 swaps)

Files had their contents placed in the wrong file:

| # | Error | Fix |
|---|-------|-----|
| 1 | `alert-dialog.tsx` contained Alert code, `alert.tsx` contained AlertDialog code | Swapped file contents back |
| 2 | `card.tsx` contained Chart code, `chart.tsx` contained Card code | Swapped file contents back |
| 3 | `collapsible.tsx` contained Form code, `form.tsx` contained Collapsible code | Swapped file contents back |

### 21. UI Components — Wrong File Names (10 renames)

Component files were renamed to nonsensical names:

| # | Wrong Name | Correct Name |
|---|-----------|--------------|
| 1 | `mohammad.tsx` | `button.tsx` |
| 2 | `output.tsx` | `input.tsx` |
| 3 | `doctor.tsx` | `avatar.tsx` |
| 4 | `expandible.tsx` | `checkbox.tsx` |
| 5 | `hello.tsx` | `progress.tsx` |
| 6 | `lol.tsx` | `radio-group.tsx` |
| 7 | `barnbeer.tsx` | `menubar.tsx` |
| 8 | `poppy.tsx` | `popover.tsx` |
| 9 | `router.tsx` | `switch.tsx` |
| 10 | `ali.tsx` | `badge.tsx` |

### 22. UI Components — Broken/Missing (8 rewrites)

These files contained wrong, broken, or completely missing component code:

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `separator.tsx` | Wrong imports, broken props, invalid syntax | Rewrote with standard shadcn Separator |
| 2 | `skeleton.tsx` | Mixed with SheetTitle code, missing component body | Rewrote with standard shadcn Skeleton |
| 3 | `textarea.tsx` | Body replaced with TableCell component code | Rewrote with standard shadcn Textarea |
| 4 | `toast.tsx` | `import "reaction"`, `@radix-ui/react-toaster` | Rewrote with standard shadcn Toast |
| 5 | `toaster.tsx` | `Roaster()` function name, `toasts are beer` destructuring | Rewrote with standard shadcn Toaster |
| 6 | `scroll-area.tsx` | Entire file was ASCII art (Tailwind logo) | Rewrote with standard shadcn ScrollArea |
| 7 | `slider.tsx` | Entire file was ASCII art (play button shape) | Rewrote with standard shadcn Slider |
| 8 | `tooltip.tsx` | Entire 324 lines replaced with ASCII art | Rewrote with standard shadcn Tooltip |

### 23. `sheet.tsx` — 3 Errors

| # | Error | Fix |
|---|-------|-----|
| 1 | `ShadowRootPrimitive` — wrong import alias | Changed to `SheetPrimitive` |
| 2 | `SheetPreemtive` — typo in component name | Changed to `SheetPrimitive` |
| 3 | `ShitPrimitive` — offensive typo | Changed to `SheetPrimitive` |

### 24. `carousel.tsx` — 1 Error

| # | Error | Fix |
|---|-------|-----|
| 1 | File contained duplicate chart.tsx code instead of Carousel | Rewrote with proper embla-carousel-react Carousel component |

### 25. Additional Component Fixes

| # | File | Error | Fix |
|---|------|-------|-----|
| 1 | `tabs.tsx` | Stray `Function useSidebar()` injected between TabsList and TabsTrigger | Removed injected code |
| 2 | `dropdown-menu.tsx` | `DropdownMenuContent` cut off, SelectLabel code injected | Completed component properly |
| 3 | `select.tsx` | Random `TableCell` code injected, garbage export name | Removed injections, fixed exports |
| 4 | `table.tsx` | `TableBody` and `TableCell` never defined (code was in other files) | Added missing component definitions |
| 5 | `sidebar.tsx` | Broken imports (referencing renamed files), inline Skeleton conflict | Fixed after file renames, removed duplicates |
| 6 | `badge.tsx` | Contained Calendar component code, Badge was in `ali.tsx` | Moved Badge code to correct file |

---

## Part 4: Environment & Runtime Fixes

| # | Error | Fix |
|---|-------|-----|
| 1 | `.env` file was empty — no API key configured | Added `GOOGLE_GENAI_API_KEY` |
| 2 | Model `gemini-2.0-flash` was deprecated/unavailable | Updated to `gemini-2.5-flash` |

### Trap/Joke Files

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `README.md` | Contained a rickroll command (`curl ascii.live/rick`) disguised as a fix script | Replaced with actual project docs |
| 2 | `Hints/runthis.sh` | Rickroll script that opens YouTube | Identified as trap |

---

## Part 5: Features Added Post-Fix

After all ~158 errors were fixed and the app was functional, the following **new features** were implemented to enhance the user experience:

### 1. Dark/Light Mode Toggle
- Installed `next-themes` package
- Created `ThemeProvider` component wrapping the app in `layout.tsx`
- Created `ThemeToggle` button component with Sun/Moon icons
- Configured Tailwind `darkMode: ['class']` (already present)
- **Bug Fix:** Fixed hydration mismatch in React 19/Next.js 15 where the toggle returned different component trees (disabled vs enabled Button), causing remount and lost click handlers. Resolved by always rendering the same Button structure and only swapping icon content.

### 2. Clickable Suggestion Badges
- Moved suggestion chips into `ChatContainer` as a prop
- Extracted `submitQuestion()` from `handleSubmit()` for reuse
- Rendered clickable `<Badge>` components in the empty chat state
- Clicking a badge auto-fills and submits the question

### 3. Copy to Clipboard
- Added a hover-visible copy button to assistant message cards in `chat-message.tsx`
- Uses the Clipboard API with `Copy`/`Check` (Lucide) icon toggle for visual feedback

### 4. Read Aloud (Text-to-Speech)
- Added `Volume2`/`Square` button to assistant messages in `chat-message.tsx`
- Uses the Web `SpeechSynthesis` API to read AI responses aloud
- Stop button immediately cancels speech

### 5. Voice Input (Speech-to-Text)
- Added `Mic`/`MicOff` button to the chat input area in `chat-container.tsx`
- Uses the Web `SpeechRecognition` API for hands-free question input
- Created `src/types/speech-recognition.d.ts` for TypeScript declarations

### 6. Animated Bot Avatar While Thinking
- Updated loading skeleton in `chat-container.tsx` to include:
  - Animated Avatar with pulsing ring effect (`animate-ping`)
  - Bouncing Bot icon (`animate-bounce`)
  - Pulse animation on header Bot icon during loading

### 7. Rich Wikipedia Preview Cards
- Created `WikiPreviewCard` component (`src/components/wiki-agent/wiki-preview-card.tsx`)
- Fetches Wikipedia REST API (`/api/rest_v1/page/summary/`) for:
  - Article thumbnail image
  - Short excerpt
  - Title and URL
- Replaced plain reference links with rich card previews
- Includes loading skeleton and error fallback states

### 8. Real-Time Token Streaming
- Created `/api/chat/route.ts` — a Next.js Route Handler using **Server-Sent Events (SSE)**
- API route flow:
  1. Receives question via POST
  2. Searches Wikipedia manually (same logic as the Genkit tool)
  3. Sends sources as the first SSE event
  4. Streams answer tokens via `ai.generateStream()` with Genkit
  5. Sends `done` event on completion
- Updated `chat-container.tsx` to consume the stream token-by-token
- Added `isStreaming` prop to `ChatMessage` for a blinking cursor effect
- **Key detail:** Genkit 1.29 uses `chunk.text` (getter) not `chunk.text()` (method)

---

## Build Status

```
✅ Production build: PASSED
✅ All pages generated successfully
✅ Dev server: Running
✅ AI flow: Connected to Gemini 2.5 Flash via API key
✅ Streaming: SSE-based real-time token delivery
✅ All 158+ errors resolved
```

---

## How to Run

### Prerequisites
- Node.js 20+
- `GOOGLE_GENAI_API_KEY` set in `.env`

### Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start Next.js dev server (port 9002) |
| `npm run genkit:dev` | Start Genkit dev UI for testing flows standalone |
| `npm run build` | Production build |

### Docker

```bash
docker build -t wikiagent .
docker run -p 3000:3000 -e GOOGLE_GENAI_API_KEY=your_key wikiagent
```


