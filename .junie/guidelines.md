# Project Guidelines - Bokivy

Bokivy is a React-based web application designed to display and manage game server data. It provides a clean, modern interface for gamers to track their favorite servers, view real-time statistics, and search for specific game instances.

## Tech Stack
- **Framework**: React 18+
- **Language**: TypeScript
- **UI Library**: Ant Design (v5)
- **Styling**: SCSS / CSS
- **Build Tool**: Vite
- **Icons**: Ant Design Icons

## Project Structure
- `src/components/`: Reusable UI components (e.g., `AppList`, `SearchApp`, `MainLayoutVy`).
- `src/pages/`: Main view components (e.g., `OverviewVy`).
- `src/services/`: Business logic and data management (e.g., `ServerService`, `UserService`).
- `src/data/`: Static data and mock datasets (e.g., `data.ts`).
- `src/models/`: TypeScript interfaces and type definitions (e.g., `gameServer.ts`).
- `src/utils/`: Helper functions and utilities (e.g., `Checker.tsx`).
- `src/App.tsx`: Entry point component that sets up global providers and the router.
- `src/routes/`: Router configuration (e.g., `index.tsx`).
- `src/contexts/`: Centralized state management (e.g., `DataProvider`, `MessageProvider`, `UserProvider`, `ThemeProvider`).
- `public/`: Static assets.

## Key Features
- **Server List**: Real-time display of game servers with search and filtering.
- **Overview Dashboard**: Aggregate statistics (Total Servers, Online/Offline, Player Capacity).
- **Centralized Messaging**: Application-wide message API via `MessageProvider`.
- **Data Management**: Global access to server data and statistics via `DataProvider`.
- **User Management**: Global access to user profile and login state via `UserProvider`.
- **Theme Management**: Centralized dark mode and Ant Design theme configuration via `ThemeProvider`.
- **Search & Filter**: Instant filtering of servers by name or IP address.
- **Interactive Tour**: Onboarding tool for new users (WIP).

## Coding Standards
- **Component Design**: Use functional components with hooks. Prefer Ant Design components for UI consistency.
- **Services**: Centralize data fetching and business logic in service classes to keep components lean.
- **State Management**: Use centralized contexts for global state (server data, user, theme, messages). Use `useDataVy`, `useUserVy`, `useThemeVy`, and `useMessageVy` hooks.
- **Styling**: Maintain the use of `App.scss` for global styles and specific component styles.
- **Documentation**: Provide JSDoc comments for services and complex components to explain intent and usage.
- **Consistency**: Follow the existing naming convention (e.g., components ending in `Vy`).

## Future Roadmap
- Integration with Steam API for real-time user and server data.
- Server creation and management interface.
- Enhanced analytics and historical data tracking.
