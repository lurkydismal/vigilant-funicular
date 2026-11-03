# vigilant-funicular

> A writing-focused social network built around following authors, not engagement metrics.

## Table of Contents

- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## General Information

vigilant-funicular is an in-progress social network focused on publishing, discovering, and reading blog posts.

Unlike conventional social networks, vigilant-funicular focuses on following authors rather than engagement metrics. Users can build their own reading feed by following writers whose content interests them.

The platform deliberately excludes likes, reposts, and comments, keeping the focus on writing and reading rather than social engagement.

## Technologies Used

- Next.js 16
- React 19
- TypeScript
- Material UI
- PostgreSQL
- Drizzle ORM
- Better Auth
- Zod
- React Hook Form
- CodeMirror
- React Markdown
- Remark GFM
- Remark Math / KaTeX
- Mermaid
- React Syntax Highlighter
- Docker
- Docker Compose
- Vitest
- Playwright

## Features

### Implemented

- User registration and authentication with Better Auth.
- User profiles and author pages.
- Follow and unfollow functionality.
- Feeds featuring posts from followed authors and the latest publications.
- Blog post creation through a multi-step publishing workflow.
- Markdown editor with live preview.
- Automatic local draft saving and restoration using localStorage.
- Optional co-author attribution.
- Categorization of posts.
- Content warnings.
- Post visibility settings: public, unlisted, and private.
- Automatic reading-time estimation.
- Search across post titles, descriptions, and content.
- Advanced post filtering by category, author/co-author, visibility, content warning, reading time, and publication date.
- Rich Markdown rendering with GitHub Flavored Markdown, tables, task lists, LaTeX equations, Mermaid diagrams, and syntax-highlighted code blocks.
- Responsive interface for desktop and mobile devices.

### Planned

- Complete access-control rules for public, unlisted, and private publications.
- Scheduled post publication.
- Editing and deleting existing posts.
- A chronological, paginated feed containing all publications from followed authors.
- Image uploads and media attachments.
- Extended user profiles with biographies and additional customization options.
- Persistent server-side draft storage and cross-device synchronization.
- Improved content discovery and search.
- Automated unit and end-to-end test coverage.

## Screenshots

Application screenshots will be added as the interface develops.

## Setup

### Prerequisites

- Node.js
- pnpm
- PostgreSQL (or Docker with Docker Compose)

### Installation

Clone the repository:

```bash
git clone https://github.com/lurkydismal/vigilant-funicular.git
cd vigilant-funicular
```

Install dependencies:

```bash
just packages-install
```

Create an environment configuration file:

```bash
cp env.example .env
```

Configure the database connection and authentication secret in `.env`:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=appdb

DB_HOST=localhost
DB_PORT=5432

BETTER_AUTH_SECRET=your_secret
```

Start PostgreSQL using Docker Compose (optional):

```bash
docker compose up -d postgres
```

Apply the database schema:

```bash
pnpm push
```

Start the development server:

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

## Usage

1. Register an account or sign in.
2. Browse the latest blog posts.
3. Follow authors whose publications interest you.
4. Explore posts from followed authors.
5. Create publications using the Markdown editor.
6. Organize posts using categories and configure their visibility.
7. Discover publications using search and advanced filters.

Additional development commands:

```bash
# Build the production application
just build-release

# Start the production server
just run-release

# Run unit tests
just run-unit-tests

# Generate database migrations
just generate-migration

# Apply database migrations
just migrate

# Run fallow static analysis
just lint

# Run tsc static analysis
just hard-lint
```

## Project Status

Project is: _in progress_.

The core application architecture, authentication, user profiles, follow relationships, post publishing workflow, and post discovery functionality are under development.

## Room for Improvement

To do:

- Implement complete publication visibility and authorization rules.
- Implement scheduled publishing.
- Add post editing and deletion.
- Expand the following feed into a complete chronological timeline.
- Add image and media upload support.
- Improve user profile customization.
- Implement persistent drafts.
- Add comprehensive automated tests.
- Improve deployment configuration and documentation.

## Acknowledgements

- [Next.js](https://github.com/vercel/next.js)
- [React](https://github.com/facebook/react)
- [Material UI](https://github.com/mui/material-ui)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [Better Auth](https://github.com/better-auth/better-auth)
- [CodeMirror](https://github.com/codemirror/dev)
- [Mermaid](https://github.com/mermaid-js/mermaid)

## License

This project is open source and available under the [GNU Affero General Public License v3.0](LICENSE).
