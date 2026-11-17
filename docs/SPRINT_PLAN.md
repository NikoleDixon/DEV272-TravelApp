# Week-by-week plan

All 6 weeks are filled in: 2 weeks of Sprint 0 (planning, already done or in progress) and 4 one-week sprints. Thanksgiving week is a short week.

| Week | Dates            | Sprint                                  | Focus                                                                                                                 | Check at end of week                                                           |
| ---- | ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1    | Oct 28 to Nov 3  | Sprint 0                                | Problem, target users, purpose, core features, out of scope list                                                      | Written down (done)                                                            |
| 2    | Nov 4 to Nov 10  | Sprint 0                                | 12 wireframes, user flow diagram, roles, this sprint plan                                                             | Wireframes updated Nov 9. Plan agreed by all 3                                 |
| 3    | Nov 11 to Nov 17 | Sprint 1: Navigation and State          | Expo project, all routes, Supabase and Query setup, tables, seed data, theme state, shared components, first tests    | All routes open. Seed data is in Supabase. Due Tue Nov 17                      |
| 4    | Nov 18 to Nov 24 | Sprint 2: Core Features and Remote Data | Explore, Destination details, Sign in, Bucket list, query hooks, add-to-bucket mutation                               | A user can sign in, save a place, and see it in Bucket list. Due Tue Nov 24    |
| 5    | Nov 25 to Dec 1  | Sprint 3: Advanced Features and Screens | Short week. Work Wed Nov 25 and Mon Nov 30 to Tue Dec 1. Off Thu Nov 26 and Fri Nov 27. Optional weekend, not planned | Create trip saves a trip and the Plan tab and Trip details work. Due Tue Dec 1 |
| 6    | Dec 2 to Dec 8   | Sprint 4: Finalize and Debug            | Large text and accessibility, performance, tests, bug fixes, README and demo build                                    | 12 or more tests pass. Code freeze Sun Dec 6. Final due Tue Dec 8              |

## Sprint 1: Navigation and State (Week 3, Nov 11 to Nov 17)

Goal: Every route opens, and the app knows who is signed in and which color mode is on. Due Tue Nov 17.

### 1. Expo project, Git repo, and Expo Router skeleton (ND)

## Steps:

1.  Create the Expo app with the TypeScript template and push it to a shared GitHub repo.
2.  Add LG and JN as collaborators and protect the main branch so nobody pushes to it directly.
3.  Write the branch and pull request rules in the README: branch names like feature/explore-screen, one review before merge, and small pull requests.
4.  Add a pull request template with 3 checkboxes: it runs, tests pass, screenshot added.
5.  Build the 4 tabs (Explore, Bucket list, Plan, Profile) with Expo Router.
6.  Add 3 stack routes with placeholder screens: destination/[id], trip/new, trip/[id].
7.  Link the placeholders together so each one can be reached by tapping.

## Acceptance Criteria:

- [ ] All 3 teammates clone the repo and run the app on their phone with no errors.
- [ ] All 4 tabs and 3 stack routes open, and the back button works on each stack screen.
- [ ] Pushing straight to main is blocked, and the first pull request from LG or JN is merged through review.
- [ ] The README has the rules and the setup steps, and a new teammate could follow them alone.

### 2. Test setup and 3 first tests (ND)

## Steps:

1.  Install jest-expo and React Native Testing Library.
2.  Add an npm test script and check that it runs.
3.  Write a first test that a placeholder screen renders.
4.  Write 2 more small tests (for example, a tab label shows and a route file exists).
5.  Add a line to the pull request template: run npm test before asking for review.

## Acceptance Criteria:

- [ ] npm test finishes with 3 passing tests and 0 failures on all 3 laptops.
- [ ] Each teammate has run it once and confirmed.

### 3. Supabase client, Query provider, sign in state, and .env guide (LG)

## Steps:

1.  Create the Supabase project and copy the URL and anon key into a local .env file.
2.  Add .env to .gitignore so keys are never pushed, and add a .env.example file with empty values.
3.  Install supabase-js and AsyncStorage, then write one supabase.ts file that creates the client.
4.  Install TanStack Query and wrap the app in a QueryClientProvider.
5.  Write an auth provider that reads the current user and says if someone is signed in.
6.  Write the .env setup steps in the README.

## Acceptance Criteria:

- [ ] A test query returns rows on all 3 laptops using their own .env files.
- [ ] Any screen can read signed in or signed out through one hook.
- [ ] No keys appear in the Git history.

### 4. Tables, Auth, security rules, and seeded destinations (LG)

## Steps:

1.  Create the 5 tables from the Data section with the listed fields.
2.  Turn on email sign in in Supabase Auth.
3.  Turn on Row Level Security for profiles, bucket_items, trips and trip_destinations.
4.  Write rules so a user can only read and change their own rows, and everyone can read destinations.
5.  Pick 20 to 30 places, with ND and JN suggesting a few, across at least 4 categories.
6.  Add each place with a description, best season, cost level, and a photo URL you are allowed to use (for example, Unsplash).
7.  Check the rules by testing with 2 different test users.

## Acceptance Criteria:

- [ ] All 5 tables exist and 20 or more destinations show up with photos.
- [ ] User A cannot see User B's bucket items or trips in a test.
- [ ] The table setup is saved as a SQL file in the repo so it can be rebuilt.

### 5. Theme, color modes, and Button (JN)

## Steps:

1.  Write a theme file with colors, spacing and text sizes for light and dark.
2.  Check each text and background pair for 4.5 to 1 contrast, or 3 to 1 for large text.
3.  Write a theme provider and a useTheme hook, and save the chosen mode with AsyncStorage.
4.  Build a Button component with a minimum size of 48 x 48 and a label for screen readers.
5.  Show the theme and Button on one test screen in both modes.

## Acceptance Criteria:

- [ ] Switching the mode in code changes the colors on all 4 tabs.
- [ ] Every color pair passes the contrast check, and the check is written in the README.
- [ ] The Button measures at least 48 x 48 and works with a screen reader.

### 6. Shared components (JN)

## Steps:

1.  Build DestinationCard from wireframe 1 (photo, name, country, add button).
2.  Build EmptyState with a message and a button, from wireframes 4 and 5.
3.  Build LoadingSkeleton from wireframe 9.
4.  Build ErrorMessage with a retry button, from wireframes 7 and 11.
5.  Make every component use the theme and a text size that grows with the phone setting.
6.  Show all 4 on a test screen with sample data.

## Acceptance Criteria:

- [ ] All 4 match their wireframes when placed side by side.
- [ ] Each one looks right in light and dark mode.
- [ ] Each one has no cut-off text at 200% text size.

## Sprint 2: Core Features and Remote Data (Week 4, Nov 18 to Nov 24)

Goal: A user can browse, sign in, save a destination, and find it in the bucket list, all with real Supabase data.

### 1. Profile and Sign in screen (ND)

## Steps:

1.  Write a zod rule for sign in: email must be valid, password must be at least 8 characters.
2.  Build the form with react-hook-form, matching wireframe 10.
3.  Add a switch between Sign in and Sign up.
4.  Connect the form to Supabase Auth.
5.  Show the error messages from wireframe 11 (bad email, short password, wrong password, no network).
6.  After sign in, show the signed in view with the user's email and a sign out button.

## Acceptance Criteria:

- [ ] A new user can sign up, sign out, and sign in again.
- [ ] Each of the 4 error cases in wireframe 11 shows the right message.
- [ ] In 10 bad-input tests, 0 invalid forms reach Supabase.

### 2. Bucket list tab (ND)

## Steps:

1.  Build the list with FlatList using useBucketItems and DestinationCard.
2.  Add a remove button on each card, with a 48 x 48 touch area.
3.  Show EmptyState from wireframe 4 when the list has no items.
4.  Show LoadingSkeleton while the data loads.
5.  Tapping a card opens Destination details.
6.  If the user is signed out, show a message with a button to Profile.

## Acceptance Criteria:

- [ ] A saved destination shows up in the list, and removing it makes it disappear.
- [ ] The empty state shows for a new user.
- [ ] The list is still there after closing and reopening the app, 5 of 5 times.

### 3. Query hooks (LG)

## Steps:

1.  Agree on the query key names with JN and ND (destinations, destination, bucket-items).
2.  Write useDestinations(search, category), which filters in Supabase.
3.  Write useDestination(id).
4.  Write useBucketItems, which also loads the destination for each item.
5.  Return loading, error and refetch from every hook.
6.  Share the hooks with a short usage note in the README by Fri Nov 20.

## Acceptance Criteria:

- [ ] Each hook returns the right rows in a test with the seeded data.
- [ ] A search for a place name and a category filter both give correct results in 10 of 10 tests.
- [ ] JN and ND can connect their screens without asking LG for changes.

### 4. Add and remove mutations (LG)

## Steps:

1.  Write useAddBucketItem with useMutation, which saves a bucket_items row.
2.  Write useRemoveBucketItem.
3.  Update the screen right away (a quick update), and put it back if the save fails.
4.  Refresh the bucket-items query after each change.
5.  If the user is signed out, send them to Profile instead of saving.
6.  Block duplicate saves with a unique rule on user and destination.

## Acceptance Criteria:

- [ ] Tapping the add button saves a row and the button changes to saved.
- [ ] Tapping again removes it.
- [ ] If the network is off, the button goes back to its old state and shows an error.
- [ ] No duplicate rows appear after 10 fast taps.

### 5. Explore screen (JN)

## Steps:

1.  Build the header, search box and category chips from wireframe 1.
2.  Show results in a FlatList with DestinationCard, using useDestinations.
3.  Wait about 300 milliseconds after typing before searching.
4.  Show LoadingSkeleton (wireframe 9), ErrorMessage, and an empty results message.
5.  Tapping a card opens Destination details.
6.  Connect the add button to the mutation from LG.

## Acceptance Criteria:

- [ ] Searching and filtering by category work on the seeded data.
- [ ] Loading, error and empty results states each show when forced.
- [ ] The first results show in under 2 seconds on Wi-Fi.

### 6. Destination details screen (JN)

## Steps:

1.  Create app/destination/[id].tsx and read the id from the route.
2.  Load the place with useDestination.
3.  Lay out the photo, name, country, season, cost level and description from wireframe 2.
4.  Add the save button, using the same mutations as Explore.
5.  Show loading and error states, and a message if the id does not exist.

## Acceptance Criteria:

- [ ] Opening a card from Explore or Bucket list shows the right place.
- [ ] The save button state matches the Bucket list.
- [ ] A bad id shows a message instead of crashing.

Plan note: LG finishes the query hooks by Fri Nov 20 so JN and ND can connect their screens. ND's sign in is needed to test the mutations, so it is the first thing ND builds. Aim to be done before class and use the evening for fixes.

## Sprint 3: Advanced Features and Screens (Week 5, Nov 25 to Dec 1)

Goal: A user can create a trip and see it in the Plan tab, even with a short Thanksgiving week. Due Tue Dec 1

Thanksgiving: Thu Nov 26 and Fri Nov 27 are no-work days, so the sprint has 3 real work days: Wed Nov 25, Mon Nov 30 and Tue Dec 1. The first task for each person is on Wed Nov 25 and needs nothing from a teammate. Nobody reviews or merges over the holiday. pull request reviews on Mon Nov 30, and Mon and Tue are for connecting the pieces. If we fall behind, the Trip details add-destinations action is cut first and the Plan tab and Create trip form are protected.

1. Trips hooks (LG), Wed Nov 25

## Steps:

1.  Write useTrips and useTrip(id).
2.  Write useCreateTrip with useMutation.
3.  Write useAddDestinationToTrip, which saves to trip_destinations.
4.  Refresh the trips query after each change.
5.  Test each hook with a hand-made row in Supabase.
6.  Open a pull request by the end of Wed Nov 25 so reviewers can start Mon Nov 30.

## Acceptance Criteria:

- [ ] Each hook returns or saves the right data against Supabase.
- [ ] The pull request is open and has a short note on how to use the hooks.

2. Create trip form (LG), Mon Nov 30

## Steps:

1.  Write the zod rules: title is required, the end date must be after the start date, notes are at most 500 characters.
2.  Build the form with react-hook-form from wireframe 6.
3.  Add date pickers for the start and end dates.
4.  Show the error messages from wireframe 7.
5.  Save with useCreateTrip, then go to Trip details.
6.  Disable the Save button while saving to stop double taps.

## Acceptance Criteria:

- [ ] A valid trip saves and appears in the Plan tab in 5 of 5 tries.
- [ ] Each error case in wireframe 7 shows its message.
- [ ] 0 invalid forms reach Supabase in 10 bad-input tests.

3. Plan tab (JN), Wed Nov 25

## Steps:

1.  Build the screen with sample data first, so no teammate is needed.
2.  Show trips in a FlatList with title and dates, from wireframe 5.
3.  Add EmptyState with a button to Create trip.
4.  Add LoadingSkeleton and ErrorMessage.
5.  On Mon Nov 30, switch from sample data to useTrips.

## Acceptance Criteria:

- [ ] With sample data, the list and the empty state match wireframe 5.
- [ ] With real data, a trip created in Create trip shows up.
- [ ] Tapping a trip opens Trip details.

4. Trip details screen (JN), Mon Nov 30 to Tue Dec 1

## Steps:

1.  Create app/trip/[id].tsx and load the trip with useTrip.
2.  Show the title, dates, notes and the list of saved places from wireframe 8.
3.  Add an add-destinations button that lets the user pick from their bucket list.
4.  Save the picks with useAddDestinationToTrip.
5.  Show loading, error, and a message for a bad id.

## Acceptance Criteria:

- [ ] A trip shows its dates, notes and places.
- [ ] Adding a place from the bucket list shows it on the trip right away.
- [ ] If we run short on time, the first 3 items work and the add button is moved to the backlog.

5. Light and dark toggle and sign out (ND), Wed Nov 25

## Steps:

1.  Add a light and dark switch to the Profile tab.
2.  Save the choice with AsyncStorage and also in the profiles table.
3.  Load the saved choice when the app starts.
4.  Add a sign out button and clear the screens that show user data.
5.  Open a pull request by the end of Wed Nov 25.

## Acceptance Criteria:

- [ ] The chosen mode is still there after closing and reopening the app.
- [ ] Signing out returns to the signed out Profile and empties the Bucket list.

6. Error and retry states, plus 4 tests (ND), Mon Nov 30 to Tue Dec 1

## Steps:

1.  Add ErrorMessage with a retry button to Bucket list and Profile.
2.  Connect the retry button to refetch.
3.  Turn the network off on a phone and check each screen.
4.  Write 2 tests for the sign in rules (bad email, short password).
5.  Write 2 tests for the Bucket list (list shows, empty state shows).

## Acceptance Criteria:

- [ ] With the network off, each screen shows an error and a retry button, and retry works when the network is back.
- [ ] 4 new tests pass, and the total test count reaches at least 7.

### Thanksgiving check (ND)

On Wed Nov 25, each person posts a short note that says their pull request is open. On Mon Nov 30 at the start of the day, ND checks that all 3 are open and sets the review order.

## Sprint 4: Finalize and Debug (Week 6, Dec 2 to Dec 8)

Goal: Every success criterion passes and we can show the app without surprises. Code freeze Sun Dec 6, final due Tue Dec 8

### 1. Large text screen and 3 component tests (JN)

## Steps:

1.  Set the phone text size to 200% and open every screen.
2.  Write down each place where text is cut off or overlaps.
3.  Fix the layout so text wraps and buttons grow (wireframe 12 is the guide for Explore).
4.  Write 3 tests: DestinationCard, EmptyState, and Button render with the right text.
5.  Take before and after screenshots and add them to the README.

## Acceptance Criteria:

- [ ] Explore and Destination details have no cut-off text at 200% on 1 real phone.
- [ ] 3 new tests pass.

### 2. Accessibility check and fixes (JN)

## Steps:

1.  List every tappable item on every screen.
2.  Measure each one and make sure it is at least 48 x 48.
3.  Add accessibility labels to icons and buttons.
4.  Check contrast in light and dark mode again.
5.  Turn on a screen reader (TalkBack or VoiceOver) and go through the sign in and save flow.
6.  Fix what you find and open a pull request.

## Acceptance Criteria:

- [ ] 100% of touch targets are at least 48 x 48.
- [ ] All icons and buttons have labels, and the main flow works with a screen reader.
- [ ] Every color pair passes contrast in both modes.

### 3. 4 tests and data bug fixes (LG)

## Steps:

1.  Write 2 tests for the search and filter hooks.
2.  Write 2 tests for the add and remove bucket mutations.
3.  Test what happens when a sign in expires, and make the app send the user back to Profile.
4.  Retest the security rules with 2 test users.
5.  Fix every bug found and close it on the bug list.

## Acceptance Criteria:

- [ ] 4 new tests pass.
- [ ] An expired sign in does not crash the app.
- [ ] The bug list is empty by code freeze on Sun Dec 6.

### 4. 4 tests and full flow check (ND)

## Steps:

1.  Write 2 tests for the Create trip rules (missing title, end date before start date).
2.  Write 2 tests for the Plan tab (list shows, empty state shows).
3.  Walk through the user flow diagram, one path at a time, on a real phone.
4.  Write each bug found on the bug list with the owner's name.
5.  Run all tests and check the total.

## Acceptance Criteria:

- [ ] The total across the team is 12 or more passing tests, with at least 3 from each person.
- [ ] Every path in the user flow diagram works.
- [ ] All 12 wireframe screens and states match the app (success check 1).

### 5. README, demo build, and demo practice (ND)

## Steps:

1.  Write the README: what the app does, how to run it, how to set up .env, and how to run tests.
2.  Ask the instructor how the demo will work (live on a phone, a recording, or a screen share) and what to bring.
3.  Prepare a demo path: sign in, explore, save, bucket list, create a trip.
4.  Divide the demo parts so each person speaks.
5.  Do one full practice run with a timer, and fix anything that breaks.
6.  Make sure the Supabase test account and seed data are ready.

## Acceptance Criteria:

- [ ] A person who has never seen the app can run it from the README alone.
- [ ] The practice run finishes in the time given with no crashes.
- [ ] All 3 teammates know their part.

Test count: ND writes 11 (3 + 4 + 4), LG writes 4, and JN writes 3, so we reach 18, above the goal of 12.
