# Sprint 1 Closeout — Team Roovia / Roovia
- **Sprint dates:** Wed 11-11 – Tue 11-17, 2026
- **Closeout commit:** 
- **Board:** https://github.com/users/NikoleDixon/projects/5
- **Attendees at closeout:** <Nikole, Lizbeth, Jaqueline>

## 1. Sprint goal and outcome
- **Goal (from planning):** Build the foundation of the app, including navigation, shared destination data, themes, and reusable components.
- **Outcome:**Remaining functionality and unfinished issues should be reviewed on the board and carried into Sprint 2.

## 2. Completed
| Issue | Title | Owner | PR | Reviewer |
| ----- | ----- | ----- | --- | -------- |
| #17 | Theme, Color Modes, and Button | Jaqueline | #54 | Approved — Lizbeth |
| #49 | Shared destination data and navigation | Lizbeth | #55 | Approved — Jaqueline |
| #13 | Roovia Logo Add | Nikole | #56 | Approved — Jaqueline |
| #18 | Shared components | Jaqueline | #57 | Approved — Nikole |
|     | WIP local changes | Nikole | #58 | Approved — Lizbeth |
|     | Update README and fix TanStack | Nikole | #59 | Approved — Jaqueline |
| #24 | Destination details screen | Jaqueline | #62 | Approved — Nikole |
| #23 | Explore screen | Lizbeth | # | Approved — Nikole |
| #50 | Quality Checks | Nikole | #62 | Approved —  |
| #53 | Final PR and Merge from develop to main | Nikole | #62 | Approved —  |
| #61 | Add Utils folder with tripSchema Placeholder | Nikole | #61 | Approved — Jaqueline |
| #52 | Closeout Sprint 1 Document | Jaqueline | #62 | Approved —  |

*The PRs above were shown as merged in the team's GitHub screenshot. Confirm issue links and reviewers before finalizing.*

## 3. Unfinished or carried over
- **Jaqueline 
    - Destination Details styling: The Destination Details screen displays the correct information and images, but the design is still very basic. More styling is needed to improve the layout and match our wireframes.
- **Lizbeth 
    - Change this button to show all the time so that even though something shows up the user can still clear the search box. Add to the right of the search box like we did in the individual apps. To be completed in a future sprint.
    - Have all of the categories show the same height in a future sprint.
    - Adjust the spacing between the cards in a future sprint.

## 4. Bugs and blockers
- Expo startup issues (Jaqueline): Running pnpm start sometimes takes more than one hour to display the QR code, making it difficult to test the app and slowing down development.
- Husky and testing issues (Jaqueline): Running Husky and the automated checks sometimes takes more than 30 minutes. Sometimes the process gets stuck or only displays an error message.
- Troubleshooting: Nikole and Lizbeth helped me review my code and investigate the issues. I also researched possible solutions, including using HUSKY=0 to skip Husky hooks temporarily.
-Instructor's recommendation: I asked my instructor about the Husky issues during class, and he recommended using git commit -m "message" --no-verify to complete commits without running the hooks.
- Extra commit in new branch (Nikole): Nikole had a commit that was stuck from the prior week and was in 2 of the new commit and branches. Contacted professor for how to fix the issue.


## 5. Retrospective
**What worked well**
- We had a team call today from 11 AM to 5 PM (Seattle time). Working together for several hours was very helpful because we could ask questions, review our code, troubleshoot issues, and help each other. Being on the call together made it easier to solve problems and make progress on our tasks.
- The app now has shared destination data, reusable components, and light and dark modes.
- Our coordination, and communication was top notch, we all were available to help each others, make a call share screen. 
- We also work from the end of the class until almost 10:30.

**What did not work well**
- We didn't divided the work properly this sprint and that make us have some overlaping code.
- We were kind of lost with the git commands. (But we learned a lot of new commands)

**Kudos**
- **Jaqueline** 
    — Worked on the theme colors, and the light and dark feature.
    - Good time managment despite travel. 
    - Commited to the project, working until late. 
- **Lizbeth** 
    — Worked on shared destination data and navigation.
    - Helped review Jaqueline's code and identify possible issues when technical problems made testing difficult.
    - Commited to the project, working until late. 

- **Nikole** 
    — Worked on the app logo, README updates, and project fixes.
    - Helped review Jaqueline's code and troubleshoot issues when the development environment was not working properly.
    - Commited to the project, working until late. 


**Action items for next sprint**
| Action | Owner | Done by |
| ------ | ----- | ------- |
| We are going to use the git commands that we learned| All | 11/17/2026 |
| Fixing formating and styles | Jaqueline and Lizbeth | 11/17/2026 |
| Have are weekly meeting and divide our work properly so we are not going to overlap again | All | 11/17/2026 |

## 6. Next sprint priorities
-Nikole (ND): Bucket list tab, Profile and sign in screen.

-Lizbeth (LG):Supabase client, Query provider, sign in state, and .env guide

-Jaqueline (JN): Query hooks.

## 7. Hours (team total, approximate)
| Member | Hours | Focus |
| ------ | ----- | ----- |
| Nikole | 21 | Logo, README updates, project fixes, and team coordination |
| Lizbeth | 22 | Shared destination data and navigation |
| Jaqueline | 28 | Themes, color modes, Button, shared components, and Destination Details work |
