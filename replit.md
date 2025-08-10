# Overview

This project is an Interactive Creativity Atlas for Polish watercolor artist Zbigniew Jan Rutkowski. It's a modern Single Page Application (SPA) that serves as a dynamic gallery and portfolio, showcasing the artist's nearly 50 years of artistic work since graduating from the State Art Center in Radom with a diploma "For Outstanding Achievements". The application allows users to explore artworks through filtering by time, themes, and exhibition contexts, presented in a storytelling format that educates visitors about the artist's creative evolution through watercolor techniques.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React SPA** with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent design system
- **State Management**: React Query (TanStack Query) for server state and React Context for theme management
- **Internationalization**: react-i18next supporting Polish (default), English, and French languages
- **Animations**: Framer Motion for smooth transitions and watercolor-inspired effects
- **Theme System**: Dark/light mode with CSS variables and localStorage persistence

## Backend Architecture  
- **Node.js/Express** server handling API routes and static file serving
- **Development Setup**: Vite middleware integration for hot reloading
- **API Design**: RESTful endpoints for contact form submissions and artwork data
- **Error Handling**: Centralized middleware with proper HTTP status codes
- **Storage Interface**: Abstract storage layer supporting both in-memory (development) and database implementations

## Data Layer
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Separate tables for artworks and contact messages with multilingual content support
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Migrations**: Drizzle Kit for schema management and database migrations

## Styling and Design System
- **Design Theme**: Watercolor-inspired palette with custom CSS variables
- **Typography**: Poppins and Inter fonts for modern, accessible text
- **Color System**: Custom watercolor colors (blues, lavenders, peaches, sage) supporting both light and dark themes
- **Component Architecture**: shadcn/ui components customized with watercolor aesthetics
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

## Authentication and Security
- **Contact Forms**: Zod validation for type-safe form handling
- **CORS**: Configured for secure cross-origin requests
- **Input Sanitization**: React Hook Form with Zod schema validation
- **Error Boundaries**: Comprehensive error handling throughout the application

# External Dependencies

## Core Framework Dependencies
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type safety throughout the application
- **Vite**: Fast development server and build tool
- **Express**: Backend server framework

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: React component library built on Radix UI primitives
- **Radix UI**: Accessible component primitives for complex UI patterns
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Icon library for consistent iconography

## Database and Data Management
- **Drizzle ORM**: Type-safe PostgreSQL ORM with schema validation
- **Neon Database**: Serverless PostgreSQL hosting
- **Zod**: Runtime type validation and schema definition
- **TanStack Query**: Server state management and caching

## Development and Build Tools
- **PostCSS**: CSS processing with Autoprefixer
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server

## Internationalization and Forms
- **react-i18next**: Internationalization framework
- **React Hook Form**: Performant form library with validation
- **React Helmet Async**: SEO and meta tag management

## Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development debugging tools