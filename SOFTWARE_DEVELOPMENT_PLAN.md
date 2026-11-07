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
- 4 Screens
  -Explore
    -Destination details
  -Bucket list
  -Plan
    -Trip details
  -Profile
- 2 Forms with validation
  -Create account
    -validate name
    -validate email
    -validate password
  -Sign in
    -validate email 
    -validate password
- Remote data storage: Supabase will be used for user authentication and to store user profiles, travel     destinations, bucket list items, and trip planning information.
- Data fetching: TanStack Query will be used to fetch, cache, and update travel destinations, bucket list
  items, and trip information from Supabase.

- Validate app viability through prototyping and testing.
- Demonstrate understanding of mobile development principles, project management, and teamwork.

---

## MVP Scope

**In Scope:**

- Explore: trip ideas with a section to filter by type of destination.
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

**Deliverables:**

- Project proposal document
- Wireframes and flowcharts
- Initial GitHub repository with project structure

### Week 2: Navigation and UI

- Set up navigation using Expo Router (tabs and stack).
- Create the main screens: Explore, Bucket List, Plan, and Profile.
- Create a Destination Details screen using a dynamic route.
- Create a reusable component to display destinations.
- Add colors and styles based on our wireframes.

**Deliverables:**

- Working navigation between screens 
- Main screens created (Explore, Bucket List, Plan, and Profile)
- Destination Details screen and reusable destination card component

### Week 3: Data & Authentication

- [List out specific focus areas / minor tasks]

**Deliverables:**

- [Deliverable 1] – [Assigned person]
- [Deliverable 2] – [Assigned person]
- [Deliverable 3] – [Assigned person]

### Week 4: Trip Planning

- [List out specific focus areas / minor tasks]
- Note: Thanksgiving (Nov 26–27) falls in this sprint. Plan lighter and decide who is available.

**Deliverables:**

- [Deliverable 1] – [Assigned person]
- [Deliverable 2] – [Assigned person]
- [Deliverable 3] – [Assigned person]

### Week 5: Testing & Integration

- [List out specific focus areas / minor tasks]

**Deliverables:**

- [Deliverable 1] – [Assigned person]
- [Deliverable 2] – [Assigned person]
- [Deliverable 3] – [Assigned person]

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

- [Success Criterion 1]
- [Success Criterion 2]
- [Success Criterion 3]
- [Success Criterion 4]
- [Success Criterion 5]

**How will you measure success for each criterion?**  
**How will you assign ownership?**

---

## Tools & Libraries

- **React Native / Expo** – Mobile development
- **GitHub Projects** – Task management
- [Add tools and libraries you intend to use for this project]

---

## Data

| Table or API Resource | Fields | Screens That Use It |
|-----------------------|--------|---------------------|
| [Name] | [Field names and types] | [Screen names] |

---

## Sprint Planning & Team Meetings

- **Sprint Duration:** 1 Week
- **Kickoff Meeting:** Every [Pick a day of week] – Plan sprint goals, assign tasks, review feedback from previous week.
- **Stand-Up Meetings:** 15-minute daily check-ins to share progress, blockers, and updates.
  - [List details about how your team will conduct their daily standup] (async, in-person, Discord)
- **Midweek Sync:** Optional working session/check-in to support collaboration.
- **Sprint Review & Retrospective:** Every [Pick a day of week] – Demo completed features, gather feedback, and identify improvements for next sprint.

**Task Management:**  
All tasks tracked using GitHub Projects. Tasks are assigned with clear descriptions, deadlines, and review requirements.

**Communication Tools:**  
Teams are encouraged to use Slack, Discord, or similar tools for real-time communication.

---

## Team Roles

### Project Manager – Oversees timeline and deliverables

- [Primary Student's name]
- [Secondary Student's name]

### Frontend Developer(s) – UI implementation and styling

- [Primary Student's name]
- [Secondary Student's name]

### Backend Integrator – API and state management

- [Primary Student's name]
- [Secondary Student's name]

### QA/Tester – Testing, bug tracking, and CI

- [Primary Student's name]
- [Secondary Student's name]

### UI/UX Designer – Wireframes, prototypes, and polish

- [Primary Student's name]
- [Secondary Student's name]

---

## Version Control Workflow (Required)

- **Main Branch:** Stable releases
  - [linkto](githublink)

- **Dev Branch:** Ongoing development
  - [linkto](githublink)

- **Feature Branches:** One per task/feature

- **Pull Requests:** Code reviews and testing before merge


