## Project: Travel App (Still working on the name)

**Platform:** React Native with Expo  
**Timeline:** 6 Weeks  
**Team Members:** 
-NikoleDixon:Scrum, DevOps QA prime
-izbethgarcia:Back-End & Front-End
-JaquelineNavarro:Front-End & UI
 QA - everyone/as needed

---

## Project Overview

This project aims to develop a proof-of-concept mobile application using React Native and Expo. The goal is to demonstrate key functionality, technical feasibility, and user experience for a targeted use case.
People often find travel destinations through different websites and social media platforms, but it can be difficult to keep track of places they want to visit and organize their ideas into an actual trip.

---

## Objectives

- Develop a mobile app with core features to solve a specific problem or fulfill a user need. Our app will allow users to discover travel destinations, save their favorite places in a bucket list, and organize their travel ideas into personalized trip plans.


### Required Features

- Navigation: Expo Router will be used with tab navigation for Explore, Bucket List, Plan, and Profile, and stack navigation for Destination Details and Trip Details. Dynamic routes will display details for individual destinations and trips.
- 6 Screens
  -Explore
    -Destination details
  -Bucket list
  -Plan
    -Trip details
  -Profile
- 2 Forms with validation
  - Sign in
    - validate email. 
    - validate password.
  - Plan trip 
    - validate the trip name.
    - validate the destination.
- Remote data storage: Supabase will be used for user authentication and to store user profiles, travel     destinations, bucket list items, and trip planning information.
- Data fetching: TanStack Query will be used to fetch, cache, and update travel destinations, bucket list
  items, and trip information from Supabase.
- Local persistence: AsyncStorage will be used to save the user's light or dark mode preference.
- Advanced feature: Search & Filter. Users will be able to search for destinations by name and filter them by category, such as beaches, mountains, or cities.
- Testing and quality tools: Jest and React Native Testing Library will be used for testing. ESLint, Prettier, and Husky will help maintain code quality.
- Validate app viability through prototyping and testing.
- Demonstrate understanding of mobile development principles, project management, and teamwork.

---

## MVP Scope

**In Scope:**

- Explore: Users can discover travel destinations, search by name, and filter by destination type.
- Bucket List: the user will save trip ideas.
- Profile: this will be a log in screen.
- Plan Trip: start planning a new trip with data provided by the user

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

### Week 1: Planning and Setup

- Define project scope and goals.
- Research target users and competitors.
- Assign team roles and responsibilities.
- Create wireframes and user flow diagrams.
- Set up project repository (GitHub).
- Choose tech stack, libraries, and tools (course stack: Expo Router, Supabase, TanStack Query, AsyncStorage; list anything extra and why).
- Verify that ESLint, Prettier, Jest, and Husky are correctly configured in the project repository.

**Deliverables:**

- Project proposal document
- Wireframes and flowcharts
- Initial GitHub repository with project structure

### Week 2: Navigation and UI

- Set up navigation using Expo Router (tabs and stack).
- Create the main screens: Explore, Bucket List, Plan, and Profile.
- Create a Destination Details screen using a dynamic route.
- Create a basic Trip Details screen using a dynamic route.
- Create a reusable component to display destinations.
- Add colors and styles based on our wireframes.
- Set up basic shared state for the app.

**Deliverables:**

- Working navigation between screens 
- Main screens created (Explore, Bucket List, Plan, and Profile)
- Destination Details screen and reusable destination card component

### Week 3: Data & Authentication

- Set up Supabase for our app.
- Create tables to store destinations and saved places.
- Connect the Explore screen to Supabase using TanStack Query.
- Set up user authentication with Supabase Auth.
- Allow users to save destinations to their Bucket List.

**Deliverables:**

- Supabase database connected to the app. – who?
- Explore screen displaying destinations from Supabase. – who?
- Users can save destinations to their Bucket List. - who?
- Basic Sign In form with validation. – who?

### Week 4: Trip Planning

- Create the plan trip form (trip name, destinations, travel dates).
- Add form validations using react hook form and zod.
- Save trip information to Supabase.
- Display saved trip information on the Trip Details screen.
- Test the plan trip form.
- Add search by name and category filters to the Explore screen.
- Note: Thanksgiving (Nov 26–27) falls in this sprint. Plan lighter and decide who is available.

**Deliverables:**

- Plan Trip form with validation. - who?
- Trip information saved and displayed. - who?
- Search & Filter working on the Explore screen. - who?

### Week 5: Testing & Integration

- Connect and review all main app features.
- Use AsyncStorage to save the user's light or dark mode preference.
- Test the screens and forms using jest and react native testing library.
- Check navigation, forms, and Supabase integration.
- Fix bugs and improve accessibility.
- Check that the navigation and Supabase work correctly. 
- Fix bugs and check accesibility. 

**Deliverables:**

- The main app features is connected and working. - who?
- Theme preference saved locally. - who?
- Automated tests and quality checks passing. - who?
- Bug fixes and accesibility - who?

### Week 6: Presentation

- Fix outstanding bugs.
- Polish UI and user experience.
- Create project documentation.
- Prepare a final demo and presentation.

**Deliverables:**

- Fully functional proof-of-concept app
- README with setup instructions
- Team presentation/demonstration

---

## Success Criteria

- The user can navigate between the main screens without errors.
- The Explore screen displays destinations from Supabase.
- The user can sign in and save destinations to the bucket list.
- The user can create a trip and view their saved trip details.
- The app passes the required tests and has no major bugs.

**How will you measure success for each criterion?**  
We will measure success by testing navigation between all main screens and checking that destinations load correctly from Supabase. We will also test if users can sign in, save destinations to their Bucket List, and create trips. We will check that trip information is saved and displayed correctly. Finally, we will run automated tests and check for major bugs.

**How will you assign ownership?**
We will assign one team member to each success criterion based on their role and responsibilities. All team members will help with testing and reviewing the app to make sure everything works correctly. We will discuss and confirm ownership during our team meetings.
---

## Tools & Libraries

- **React Native / Expo** – Mobile development
- **GitHub Projects** – Task management
- React Native / Expo – Mobile app development.
- TypeScript.  
- Expo Router. - To navegate between screens.
- Supabase – To use it as a remote database and authentication.
- TanStack Query – to do the data fetching and caching.
- React Hook Form – We will us this one for form management.
- Zod – To validate all the sections of our forms.
- AsyncStorage – To save locally the preference of the user light mode or dark mode.
- Jest – To automate the testing.
- React Native Testing Library – Component to testing.
- ESLint – To check the quality of the code.
- Prettier – To format all the code.
- Husky – Check the code before sending to git. 
- GitHub Projects – For task management.
---

## Data

|Table or API Resource|               Fields                          | Screens That Use It |
|---------------------|-----------------------------------------------|---------------------|
| destinations        |id (UUID), name (text), category (text), description (text), image_url (text)     |    Explore, Destination Details  |
| bucket_list        |id (UUID), user_id (UUID), destination_id (UUID)  |    Bucket List, Destination Details  |
| trips        |id (UUID), user_id (UUID), name (text), destination_id (UUID), start_date (date), end_date (date)  |    Plan, Trip Details  |
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

- **Feature Branches:** One per task/feature
Each team member will create a new branch for each task or feature. We will not work directly on main or develop.

- **Pull Requests:** Code reviews and testing before merge
 When a task is finished, we will create a Pull Request to merge the changes into develop. Another team member will review the code, and the required tests and checks must pass before merging.

