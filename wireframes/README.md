# Roovia — Wireframes and User Flow

Wireframes and user flow diagrams for **Roovia**, our DEV272 Mobile App Development team project: a React Native + Expo app that helps users discover travel destinations, save them to a bucket list, and plan trips.

**Team:** Nikole Dixon · Lizbeth Garcia · Jaqueline Navarro
**Stack:** Expo Router, Supabase (Auth + Postgres), TanStack Query, AsyncStorage, React Hook Form + Zod

## Design tool

The wireframes and user flow diagrams were designed with **Claude** (Anthropic), using its design canvas, and exported as PNG images.

## Folder contents

```
roovia-images/
├── README.md
├── wireframes/   21 PNGs: 9 screens and their states
└── user-flow/    5 PNGs: full diagram + one per flow
```

## Wireframes

Latest team changes: Explore shows a logo placeholder (top right) and the title “Discover, Save and Explore”; Destination Details no longer has a heart button over the photo (saving uses “Add to bucket list”); each saved Bucket List destination has a Remove button with a trash icon under its country and category.

| File | Screen | State |
| --- | --- | --- |
| `wireframes/01-explore-screen.png` | 1. Explore Screen | Default |
| `wireframes/01b-explore-screen-loading.png` | 1. Explore Screen | Loading state |
| `wireframes/01c-explore-screen-no-results.png` | 1. Explore Screen | No search results |
| `wireframes/01d-explore-screen-dark-mode.png` | 1. Explore Screen | Dark mode |
| `wireframes/02-destination-details-screen.png` | 2. Destination Details Screen | Default |
| `wireframes/03-bucket-list-screen.png` | 3. Bucket List Screen | Saved destinations |
| `wireframes/03b-bucket-list-screen-empty.png` | 3. Bucket List Screen | Empty state |
| `wireframes/03c-bucket-list-screen-signed-out.png` | 3. Bucket List Screen | Signed out |
| `wireframes/04-plan-trip-screen.png` | 4. Plan Trip Screen | Existing trips |
| `wireframes/04b-plan-trip-screen-empty.png` | 4. Plan Trip Screen | Empty state |
| `wireframes/04c-plan-trip-screen-signed-out.png` | 4. Plan Trip Screen | Signed out |
| `wireframes/05-create-trip-screen.png` | 5. Create Trip Screen | Filled form, two destinations |
| `wireframes/05b-create-trip-screen-validation-errors.png` | 5. Create Trip Screen | Validation errors |
| `wireframes/06-trip-details-screen.png` | 6. Trip Details Screen | Default |
| `wireframes/07-profile-screen-signed-out.png` | 7. Profile Screen | Signed out |
| `wireframes/07b-profile-screen-signed-in.png` | 7. Profile Screen | Signed in |
| `wireframes/07c-profile-screen-signed-in-dark-mode.png` | 7. Profile Screen | Signed in, dark mode |
| `wireframes/08-sign-in-screen.png` | 8. Sign In Screen | Default |
| `wireframes/08b-sign-in-screen-validation-errors.png` | 8. Sign In Screen | Validation errors |
| `wireframes/09-sign-up-screen.png` | 9. Sign Up Screen | Default |
| `wireframes/09b-sign-up-screen-validation-errors.png` | 9. Sign Up Screen | Validation errors |

## User flow diagrams

| File | Shows |
| --- | --- |
| `user-flow/user-flow-diagram.png` | All four flows in one high-resolution diagram, with a legend |
| `user-flow/user-flow-explore.png` | Explore flow |
| `user-flow/user-flow-bucket-list.png` | Bucket List flow |
| `user-flow/user-flow-trip-planning.png` | Trip Planning flow |
| `user-flow/user-flow-auth-profile.png` | Authentication & Profile flow |

## Navigation (Expo Router)

| Route file (`app/`) | Screen | Navigation | Sign-in needed |
| --- | --- | --- | --- |
| `(tabs)/index.tsx` | Explore | Tab | No |
| `(tabs)/bucket-list.tsx` | Bucket List | Tab | Yes |
| `(tabs)/plan.tsx` | Plan Trip | Tab | Yes |
| `(tabs)/profile.tsx` | Profile | Tab | No (signed-out and signed-in states) |
| `destination/[id].tsx` | Destination Details | Stack · dynamic route | No (saving needs sign-in) |
| `trip/new.tsx` | Create Trip | Stack | Yes |
| `trip/[id].tsx` | Trip Details | Stack · dynamic route | Yes |
| `sign-in.tsx` | Sign In | Stack | — |
| `sign-up.tsx` | Sign Up | Stack | — |

## User flow summary

- **Explore:** open Explore → search by name or filter by category (Beaches, Nature, Cities) → if there are no results, show “No destinations found” → select a destination → Destination Details → tap “Add to bucket list” (or the heart on an Explore card). Signed in: saved to the Bucket List. Signed out: open Sign In, then save.
- **Bucket List:** open Bucket List → signed out shows a Sign In message → no saved places shows the empty state → view saved destinations → open Destination Details or tap Remove (trash icon) under a destination.
- **Trip Planning:** open Plan Trip → signed out shows a Sign In message → view existing trips (or “No trips yet”) → Create Trip → enter title, start and end dates and optional notes → add one or more destinations → if the form is invalid, show errors → save to Supabase → Trip Details.
- **Authentication & Profile:** open Profile → signed out shows Sign In and Sign Up → form validation → Supabase Auth (error message if it fails) → authenticated Profile → change the Dark mode setting (saved with AsyncStorage) or Sign Out.

## Forms with validation

- **Sign In:** email required and valid; password required, at least 6 characters.
- **Sign Up:** email required and valid; password at least 6 characters; confirm password must match.
- **Create Trip:** trip title required (up to 60 characters); start and end dates required, end on or after start; at least one destination, each only once; notes optional (up to 500 characters).

## Color palette and contrast

Roovia uses Version B: a light-green background, cream/sand as the secondary color, and forest green for buttons, headings and important elements. Contrast ratios are measured with the WCAG 2.2 formula. Text needs at least **4.5:1** and borders or icons need at least **3:1**; every pair below passes WCAG 2.2 AA. Where two ratios are shown, the first is on the app background and the second on cards.

### Light mode

| Role | HEX | Contrast |
| --- | --- | --- |
| App background | `#CFE3DC` | — |
| Cards, inputs, tab bar | `#FFFFFF` | — |
| Main text (slate) | `#2F3E46` | 8.3:1 on background · 11.1:1 on cards |
| Secondary text | `#3F4E55` | 6.4:1 · 8.6:1 |
| Primary buttons, active tab (forest green) | `#2D5A3D` | White text 8.0:1 · 5.9:1 on background |
| Hearts, links, focus ring (deep teal) | `#17565D` | 6.2:1 · 8.3:1 |
| Errors (red) | `#A3261B` | 5.5:1 · 7.4:1 |
| Image placeholders, logo (sand, secondary) | `#F5EEDF` | Text on it 9.6:1 |
| Card outline | `#8A7650` | 3.3:1 (needs 3:1) |
| Input and chip outline | `#6B7B80` | 3.3:1 · 4.4:1 (needs 3:1) |

### Dark mode

| Role | HEX | Contrast |
| --- | --- | --- |
| App background | `#141C1F` | — |
| Cards, inputs, tab bar | `#1F2A2E` | — |
| Main text (cream) | `#F5EEDF` | 15.0:1 · 12.7:1 |
| Secondary text | `#C2CCC9` | 10.5:1 · 8.9:1 |
| Primary buttons (light forest) | `#8CC79F` | Dark text #13261A 8.2:1 |
| Hearts, links, focus ring (light teal) | `#7CC6CC` | 8.9:1 · 7.6:1 |
| Errors (coral) | `#FF9E91` | 8.7:1 · 7.4:1 |
| Card outline | `#8F8164` | 4.5:1 |
| Input and chip outline | `#8A9A9F` | 5.9:1 · 5.0:1 |

### Accessibility notes

- Category tags (Beaches `#F3E3C4`, Nature `#E1EDE3`, Cities `#E3E8EA`) always include a text label; tag text is 8.3:1 or higher.
- Forest green and teal are never the only difference between two things: selected chips also show a check mark, saved items a filled heart or a “Remove” button with text.
- Touch targets are at least 48 × 48 (iOS 44 pt and Android 48 dp), the smallest text is 13 px, and errors are shown as text with an icon, never color alone.

The logo is a placeholder. Destination names, trips and descriptions are sample data.