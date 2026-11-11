Roovia ✈️

**Discover. Save. Explore.**

Roovia is a travel app that helps people discover new destinations, save places they would like to visit, and organize their travel ideas into personalized trip plans. Users can explore destinations, search by name, filter places by category, and save destinations to their bucket list. The app is designed to make it easier for travelers to keep track of places they want to visit and organize them into trips.

## Team Members

| **Team Member** | **GitHub Username** | **Primary Role** | **Secondary Role** |
| --- | --- | --- | --- |
| Nikole Dixon | NikoleDixon | Project Management / Scrum Master | DevOps and QA |
| Jaqueline Navarro | JaquelineNavarro | Front-End Development | UI Design and QA |
| Lizbeth Garcia | izbethgarcia | Back-End Development | Front-End Development |

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

Roovia uses Supabase for authentication and remote data. Create a `.env` file in the root of the project and add the following variables:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_KEY=
```

Replace the empty values with the Supabase project URL and public key provided for the project.

**Important:** Do not commit your actual `.env` file or private credentials to GitHub.

### 4. Start the App

Run the following command:

```bash
pnpm start
```

Expo will start the development server. Follow the instructions in the terminal to open the app in an emulator or on your mobile device.

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
