## Project: Travel App Roovia

**Platform:** React Native with Expo  
**Timeline:** Sprint 0 (November 3–10, 2026) followed by four one-week development sprints (November 11–December 8, 2026).
**Team Members:** 
-NikoleDixon: Scrum, DevOps, primary QA; Profile/Sign In, Bucket List, reviews and releases
-izbethgarcia: Back-End and Front-End; Supabase, authentication, TanStack Query hooks, Create Trip
-JaquelineNavarro: Front-End and UI; theme, shared components, Explore, Destination Details, Plan, Trip Details, accessibility
All three members help with coding, testing, pull-request reviews, and QA as needed.

---

## Project Overview

People discover travel ideas across websites and social platforms but struggle to keep track of places they want to visit and turn those ideas into a trip. Our target users are travelers who want to discover destinations, save favorites in one place, and organize travel ideas into a plan. Sharing favorites with other users is a possible future feature, not part of this MVP.
So, the purpose of this app is to help travelers find trip ideas, save them to a bucket list, and turn them into a real trip plan.

---

## Objectives

- Develop a functional mobile proof of concept that helps travelers discover destinations, save favorites in a personal bucket list, and organize destinations into trips.
- Provide a simple, accessible user experience with clear navigation, reusable components, and consistent Light/Dark Mode styling.
- Demonstrate the mobile development skills learned in DEV272 through remote data, validated forms, navigation, testing, and team collaboration.
- Deliver an app that can be demonstrated reliably at the end of the four development sprints.


### Required Features

- Navigation: Expo Router will be used with tab navigation for Explore, Bucket List, Plan, and Profile, and stack navigation for Destination Details and Trip Details. Dynamic routes will display details for individual destinations and trips.
- 7 Screens
  -Explore
    -Destination details
  -Bucket list
  -Plan
    -Create trip
    -Trip details
  -Profile
    -Sign up 
    -Sign in 
- 2 Forms with validation
  - Authentication
    - Sign in (Validate name, validate email and validate password)
    - Sign up (Validate email and password)
  - Create trip
    - validate the trip name.
    - validate the destination.
    - start/end dates
    - optional notes
- Remote data storage: Use Supabase Auth plus five application tables (destinations, profiles, bucket_items, trips, trip_destinations).
- Data fetching: TanStack Query will be used to fetch, cache, destinations, bucket items, and trips and to manage save/remove/create operations.
- Local persistence: AsyncStorage will be used to save the user's light or dark mode preference.
- Advanced feature: Search & Filter. Users will be able to search for destinations by name and filter them by category, such as beaches, mountains, or cities.
- Testing and quality tools: Use Jest, React Native Testing Library, ESLint, Prettier, Husky, and reviewed pull requests. Target at least 12 passing automated tests with at least three written by each team member.
- Accesibility: Check color contrast against WCAG AA guidance.

---

## MVP Scope

**In Scope:**

- Explore: Browse manually seeded destinations; search by name and filter by category.
- Bucket List: Save and remove destinations in the signed-in user's personal list; show an empty state.
- Profile: Sign In, Sign Up, Sign Out, and Light/Dark Mode toggle. Authentication uses Supabase Auth.
- Plan Trip: Create a trip with title, dates, and optional notes; add saved destinations to a trip; view the trip in Plan and Trip Details.

**Out of Scope:**

- Setting for user except light and dark coloring
- Bookings
- Blog
- Users adding videos
- AI agent
- Comments from user
- Notifications

---

## Week-by-Week Plan

### Week 1: Planning and Setup (Sprint 0) — Nov 3–10

- Define the project problem, target users, objectives, and MVP scope.
- Identify required features and out-of-scope functionality.
- Assign team roles and responsibilities.
- Set up the GitHub repository, protected branches, and GitHub Projects board.
- Choose the technology stack and development tools.
- Create and review wireframes for the main screens and UI states.
- Create a user flow diagram showing tab navigation, stack navigation, and dynamic routes.
- Define the five Supabase tables and organize tasks for the four development sprints.
- Complete and review the Software Development Plan.

**Deliverables:**

- GitHub repository and project board.
- Completed Software Development Plan.
- Wireframes covering the approved screens and UI states.
- User flow diagram.
- MVP scope, database design, sprint schedule, and assigned responsibilities.

### Week 2: Navigation and State (Sprint 1) — Nov 11–17

- ND: Configure Expo Router with four tabs and the required stack routes.
- ND: Set up Jest and React Native Testing Library and write three initial tests.
- LG: Configure Supabase, TanStack Query, authentication state, and environment variables.
- LG: Create the five Supabase tables, configure authentication and Row Level Security, and seed 20–30 destinations.
- JN: Implement light and dark themes, AsyncStorage persistence, and a reusable accessible Button component.
- JN: Build DestinationCard, EmptyState, LoadingSkeleton, and ErrorMessage components.

**Deliverables:**

- ND: Working navigation and three passing tests.
- LG: Supabase connection, authentication setup, five database tables, and seeded destination data.
- JN: Theme system and reusable UI components.

### Week 3: Core Features and Remote Data (Sprint 2) — Nov 18–24

- ND: Implement Sign In, Sign Up, and Profile with form validation and error messages.
- ND: Build the Bucket List screen with saved destinations, an empty state, and remove functionality.
- LG: Implement TanStack Query hooks for destinations, destination details, and bucket list items.
- LG: Create mutations to save and remove destinations and handle authentication requirements.
- JN: Build Explore using FlatList, search by name, category filters, and loading states.
- JN: Build Destination Details using a dynamic route and Supabase data.

**Deliverables:**

- ND: Working Profile authentication and Bucket List screens.
- LG: Functional destination and bucket list queries and mutations.
- JN: Explore and Destination Details screens with remote data.

### Week 4: Advanced Features and Screens (Sprint 3) — Nov 25–Dec 1

- LG: Create trip-related TanStack Query hooks and mutations.
- LG: Build the Create Trip form using React Hook Form and Zod, validating title, travel dates, and notes as appropriate.
- LG: Save trips to Supabase and support adding multiple destinations.
- JN: Build the Plan screen with saved trips and an empty state.
- JN: Build Trip Details with dynamic routing and destination management.
- ND: Add Sign Out and the theme toggle to Profile.
- ND: Implement error and retry states and write four automated tests.

**Deliverables:**

- LG: Validated Create Trip form and working trip database operations.
- JN: Plan and Trip Details screens supporting multiple destinations.
- ND: Sign Out, theme controls, error/retry handling, and four tests.

### Week 5: Testing, Polish and Presentation (Sprint 4) — Dec 2–8

- JN: Test Explore at 200% text size on a real phone, perform accessibility checks, and write three component tests.
- JN: Fix accessibility issues involving touch targets, color contrast, and screen reader labels.
- LG: Optimize FlatList, TanStack Query settings, and image loading.
- LG: Write four tests covering search, filters, and Bucket List mutations.
- ND: Write four tests covering Create Trip and Plan, and verify the complete user flow.
- ND: Finalize the README, demo build, and presentation script.

All team members: Fix remaining bugs, review the application, and practice the final demonstration.

**Deliverables:**

- JN: Accessibility audit, verified text scaling, and passing component tests.
- LG: Performance improvements, passing data-related tests, and integration fixes.
- ND: Passing trip-related tests, final documentation, and demo preparation.

All team members: Completed proof-of-concept application ready for presentation.

---

## Success Criteria

- Final agreed wireframe screens/states implemented.
- Explore fetches remote data and filters correctly.
- Authentication form validation works.
- Bucket List persists.
- Create Trip validates and saves.
- Automated tests pass.
- Accessibility checks pass

**How will you measure success for each criterion?**  
- Screen and State Completion: Walk through every approved screen and state against the running app.
- Explore Performance: Initial results load in under 2 seconds in 4 out of 5 Wi-Fi trials, and all 10 search/filter checks pass.
- Form Validation: Invalid inputs display errors, and no invalid submission reaches Supabase in 10 negative tests.
- Bucket List Persistence: Saved destinations remain in the Bucket List after restarting the app in 5 out of 5 trials.
- Trip Creation: Invalid dates are rejected, and valid trips appear in the Plan screen in 5 out of 5 trials.
- Automated Testing: At least 12 tests pass, with at least 3 tests authored by each team member and zero failures.
- Accessibility: All checked touch targets are at least 48 × 48, and the Explore screen has no clipped text at 200% text size on one real phone.

**How will you assign ownership?**
Each team member will be responsible for verifying the success criteria related to their assigned tasks. Nikole Dixon will lead the screen and state completion review, Bucket List persistence testing, and overall automated test verification. Lizbeth Garcia will be responsible for form validation, Supabase integration, and verifying that trip information is correctly saved and retrieved. Jaqueline Navarro will be responsible for Explore performance, search and filter functionality, and accessibility checks, including touch target sizes and text scaling. All three team members will contribute at least three automated tests and collaborate on final testing, bug fixes, and quality assurance to ensure the app meets the agreed success criteria.
---

## Tools & Libraries

- **React Native / Expo** – Mobile development
- **GitHub Projects** – Task management
- **TypeScript** 
- **Expo Router** - To navegate between screens.
- **Supabase** – To use it as a remote database and authentication.
- **TanStack Query** – to do the data fetching and caching.
- **React Hook Form** – We will us this one for form management.
- **Zod** – To validate all the sections of our forms.
- **AsyncStorage** – To save locally the preference of the user light mode or dark mode.
- **Jest** – To automate the testing.
- **React Native Testing Library** – Component to testing.
- **ESLint** – To check the quality of the code.
- **Prettier** – To format all the code.
- **Husky**– Check the code before sending to git. 
---

## Data

|Table or API Resource|               Fields                          | Screens That Use It |
|---------------------|-----------------------------------------------|---------------------|
| destinations        |id, name, country, region, category, description, image_url, best_season, cost_level, created_at |    Explore, Destination Details  |
| profiles     |id (matches Auth user ID), display_name, theme, created_at    |    Profile  |
| bucket_items       |	id, user_id, destination_id, created_at  |    Bucket List, Destination Details  |
| trips        |id, user_id, title, start_date, end_date, notes, created_at  |    Plan, Trip Details  |
| trip_destinations  |id, trip_id, destination_id, sort_order |  Create Trip, Trip Details  |
| Supabase Auth       |id (UUID), email (text)  |    Profile and sign in  |
| AsyncStorage       |theme (string: light or dark)  |    Theme settings across the app  |




---

## Sprint Planning & Team Meetings

- **Sprint Duration:** 1 Week
- **Kickoff Meeting:** Every Monday at 11:00am – Plan sprint goals, assign tasks, review feedback from previous week.
- **Stand-Up Meetings:** Every Monday and Wednesday at 11:00 AM. Meetings are scheduled for 30 minutes but can be extended if needed. We will share our progress, discuss any problems, and ask for help when necessary.
Our stand-up meetings will be held online through Microsoft Teams. We will also use our Teams group chat to share updates, ask questions, and request help between meetings. We have also exchanged phone numbers and created an iMessage group chat for emergencies or urgent situations.
- **Midweek Sync:** Every Wednesday at 11:00 AM. We will review our progress, discuss any blockers, and work together to solve problems.
- **Sprint Review & Retrospective:** During our Monday meeting, we will review the previous sprint, discuss what went well, what could be improved, and plan the next sprint.

**Task Management:**  
We will use GitHub Projects to organize our tasks. Each task will have a description, a team member, and clear goals. We will use Backlog, Ready, In Progress, In Review, and Done to see our progress. During our Monday and Wednesday meetings, we will talk about our tasks and any problems.

**Communication Tools:**  
We will use Microsoft Teams as our main communication tool. We have a group chat to share updates, ask questions, and help each other. We also have an iMessage group chat and each other's phone numbers for emergencies.

---

## Team Roles

### Project Manager – Oversees timeline and deliverables

- Nikole Dixon: NikoleDixon
- Jaqueline Navarro: JaquelineNavarro

### Frontend Developer(s) – UI implementation and styling

- Jaqueline Navarro: JaquelineNavarro
- Lizbeth Garcia: izbethgarcia

### Backend Integrator – API and state management

- Lizbeth Garcia: izbethgarcia
- Jaqueline Navarro: JaquelineNavarro

### QA/Tester – Testing, bug tracking, and CI

- Nikole Dixon: NikoleDixon
- Lizbeth Garcia: izbethgarcia

### UI/UX Designer – Wireframes, prototypes, and polish

- Jaqueline Navarro: JaquelineNavarro
- Nikole Dixon: NikoleDixon

All team members will help with coding, testing, and reviewing the app when needed.

---

## Version Control Workflow (Required)

- **Main Branch:** Stable releases
  - https://github.com/NikoleDixon/DEV272-TravelApp/tree/main

- **Dev Branch:** Ongoing development
  - https://github.com/NikoleDixon/DEV272-TravelApp/tree/develop

- **Feature Branches:** One per issue/feature, created from develop (e.g. feature/software-development-plan-6 or feature/wireframes-7). Do not commit directly to main or develop.

- **Pull Requests:** Open a PR into develop; another teammate reviews; tests/lint and agreed checks pass before merging. Protect main and develop according to repository settings.

