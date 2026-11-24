# Roovia ✈️

**Discover. Save. Explore.**

Roovia is a travel app that helps people discover new destinations, save places they would like to visit, and organize their travel ideas into personalized trip plans. Users can explore destinations, search by name, filter places by category, and save destinations to their bucket list. The app is designed to make it easier for travelers to keep track of places they want to visit and organize them into trips.

## Team Members

| **Team Member** | **GitHub Username** | **Primary Role** | **Secondary Roles** |
| --- | --- | --- | --- |
| Nikole Dixon | NikoleDixon | Project Management / Scrum Master | DevOps and QA |
| Jaqueline Navarro | JaquelineNavarro | Front-End Development | UI Design and QA |
| Lizbeth Garcia | izbethgarcia | Back-End Development | Front-End Development |

## Screens

| Screen | What it does | Route type | File | Wireframes |
| --- | --- | --- | --- | --- |
| Explore | List of destinations, search, filter by category | Tab | `app/(tabs)/index.tsx`| 1, 9, 12 |
| Destination details | Shows more information about one destination | Dynamic | `app/destination/[id].tsx` | 2 |
| Bucket list | Shows saved destinations | Tab | `app/(tabs)/bucket-list.tsx` | 3, 4 |
| Plan | Shows your trips with button to add a new trip | Tab | `app/(tabs)/plan.tsx` | 5 |
| Create trip | Form to make a new trip, saves to Plan tab | Stack | `app/trip/new.tsx` | 6, 7 |
| Trip details | Shows information about selected trip | Dynamic | `app/trip/[id].tsx` | 8 |
| Profile / Sign in | Sign in, Sign up, and toggle light/dark mode | Tab | `app/(tabs)/profile.tsx` | 10, 11 |

## Features

### Discover and Explore
- **Explore destinations:** Browse a list of travel destinations.
- **Search and filter:** Search by name and filter by category to find places faster. (🚧 in work)
- **Destination details:** Open any destination to see more information on its own page.

### Save and Plan
- **Bucket list:** Save destinations you want to visit and view them in one place. (🚧 in work)
- **Plan trips:** Create a trip with a form and see all your trips in the Plan tab. (🚧 in work)
- **Trip details:** Open a trip to review its information. (in work)

### Account
- **Sign in and profile:** Create an account and sign in using Supabase authentication. (🚧 in work)

### Usability and Accessibility
- **Helpful messages:** Loading states, empty states, and form error messages tell the user what is happening. (🚧 in work)
- **Accessible design:** Colors meet WCAG 2.2 AA, and all touch targets are at least 48 x 48. (🚧 in work)
- **Large text support:** The Explore screen reflows correctly at 200% text size. (🚧 in work)

### Built With
- React Native and Expo Router
- FlatList for scrolling lists
- Supabase for authentication and remote data

## Getting Started

Follow these steps to set up and run Roovia on your local machine.

### Prerequisites

Before getting started, make sure you have installed:

- Node.js
- pnpm
- Git
- Expo Go on your mobile device, if you want to test the app on your phone.

### 1. Clone the Repository

```bash
git clone https://github.com/NikoleDixon/DEV272-TravelApp.git
```

Go into the project folder:

```bash
cd DEV272-TravelApp
```

### 2. Install Dependencies

Install the project dependencies using pnpm:

```bash
pnpm install
```

This project uses pnpm as its package manager. Please do not use npm or yarn to install dependencies.

### 3. Set Up Environment Variables

Roovia uses Supabase for authentication and remote data. The app needs the following environment variables to connect to the team's Supabase project:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_KEY=
```

**Setting up your `.env` file:**

1. Open the main project folder (`DEV272-TravelApp`).
2. Check that the team's `.env` file is present in the project root. It should be included when you clone the repository.
3. If the `.env` file is missing, ask a teammate for the approved environment variable values before creating one.
4. Make sure the file contains both `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_KEY`.
5. Save the file.
6. Restart the Expo development server if it is already running.

**Important:**
- Use the team's shared Supabase project credentials.
- The publishable key is intended for use in the client application.
- Never use the Supabase `service_role` key or secret key in the app.

### 4. Start the App

Run the following command:

```bash
pnpm start
```

Expo will start the development server. Follow the instructions in the terminal to open the app in an emulator or on your mobile device.

## Shared UI Components
 
- **Button:** A reusable button used for different actions in the app. It supports light and dark modes and keeps the same style across screens.
 - **DestinationCard:** Shows a destination's image, name, and basic information. It helps users explore destinations and open the Destination Details screen.
- **EmptyState:** Shows a message when there is no content to display, like an empty Bucket List or no search results.
- **LoadingSkeleton:** Shows placeholder content while the app is loading information, so users know the content is coming.
- **ErrorMessage:** Shows a message when something goes wrong and can give users an option to try again.

## Shared State and Dummy Data

The app uses shared TypeScript types and seeded destination data for development.

- **Types:** Shared models (Destination, BucketItem, and Trip) are located in src/types/.
- **Seed Data:** Sample destination data is stored in src/data/destinations.ts.
- **Mock API:** Destination data is currently retrieved through mock API functions in src/data/destination-api.ts.
- **Data Hooks:** TanStack Query hooks and query keys are located in src/hooks/ and are used by screens to access destination data.

## Supabase Integration
In Sprint 2, the mock API functions will be replaced with Supabase database queries. The shared types and query hooks will be reused where possible, allowing the app to retrieve real destination data from Supabase instead of the local seeded data without requiring major changes to the screens.


## Git Workflow

To keep the repository organized and avoid conflicts, all team members should follow the same Git workflow.

### Branch Rules

- `main` is the stable branch and should contain the approved project version.
- `develop` is the branch used for ongoing development.
- Create a separate branch for each task or feature.
- Do not work directly on `main` or `develop`.
- Create branches from the latest `develop` branch.
- Open Pull Requests (PRs) into `develop` when your work is ready for review.

Use these branch naming conventions:

| **Branch Type** | **Naming Example** |
| --- | --- |
| Feature | `feature/short-description` |
| Bug fix | `fix/short-description` |
| Documentation | `docs/short-description` |
| Tests | `test/short-description` |
| Styling | `style/short-description` |

### Pull Request Rules

1. Pull the latest changes from `develop` before creating a new branch.
2. Create a separate branch for your task or feature.
3. Make and commit your changes on that branch.
4. Push your branch to GitHub.
5. Open a Pull Request into `develop`.
6. Include a clear title, description and issue #. Use the agreed commit message style for the PR title (such as `feat: add destination search`) and explain the changes in the description.
7. Request a review from at least one teammate who did not create the PR.
8. Make sure the required checks pass before merging.
9. Address any feedback from the reviewer before merging.
10. After approval, squash and merge the PR into `develop`.

Reviewer assignments will rotate weekly so that all team members have opportunities to review each other's work.

### Merge Policy

We will use **squash merging** for Pull Requests into `develop`. This combines the commits from a feature branch into one commit, keeping the `develop` branch history easier to follow.

Pull Requests should only be merged after the required review and checks are complete.

### Commit Message Style

Use short, clear commit messages that describe what changed. We will use the following prefixes:

| **Prefix** | **Purpose** | **Example** |
| --- | --- | --- |
| `feat:` | Add a new feature | `feat: add destination search` |
| `fix:` | Fix a bug | `fix: correct bucket list display` |
| `docs:` | Update documentation | `docs: update README setup steps` |
| `test:` | Add or update tests | `test: add destination screen tests` |
| `style:` | Formatting or styling changes | `style: format explore screen` |
