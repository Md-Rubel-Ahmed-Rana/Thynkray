# Thynkray: Blogging or Articles Website

## Overview

**Thynkray** is a modern, full-stack blogging platform that provides a seamless experience for both writers and readers. Built with **Next.js** and **NestJS**, it offers robust features like rich text editing and advanced full-text search capabilities with **Meilisearch**.

### Live links

- [Frontend](https://thynkray.vercel.app)
- [Backend](https://thynkray.onrender.com/api/v1/health)
- [Swagger : API Documentation](https://thynkray.onrender.com/api-docs)

### Clone repository

```bash
git clone https://github.com/Md-Rubel-Ahmed-Rana/Thynkray.git
```

## Key Features

1. **OpenAI:** OpenAI is integrated to chat only (Limited features for free). The main thought is that when the user gets bored reading posts/discussions, this feature will give a fresh perspective with chit-chat.
2. **User Auth-authorization:** Secure login and registration using NextAuth.js with Google OAuth integration. Also secured mutatabled endpoints (update/delete), only the data owner can do the operation.
3. **Posts:** Writing, reading, and give opinion(comments) to a post. Similar to **Medium**
4. **Article Management:** Create, edit, and delete articles with a rich text editor.
5. **Advanced Search:** Fast and relevant search results powered by **Meilisearch**.
6. **Discussions:** Discussion is  the best feature for this website, where users can collaborate on a discussion. It's similar to **Stack Overflow**. Anyone can open/create a discussion based on a topic (like "Authentication with Zustand and Next.js" ), and other users can answer the question/discussion.
7. **File Uploads:** Upload images and files directly to **Google Drive** using the **Google Drive API**.
8. **Responsive Design:** Optimized for all devices with **Material UI** components.
9. **State Management:** Efficient state handling using **TanStack Query**.

## Tech Stack and Third-Party Libraries

### Frontend:
- **TypeScript**: Strongly typed superset of JavaScript used across both frontend and backend for better developer experience, type safety, and tooling.
- **Next.js**: React-based full-stack framework used on the frontend. Enables file-based routing, SSR/SSG, API routes, and tight integration with NextAuth.
- **NextAuth.js**: Authentication framework for Next.js. Supports OAuth providers like Google OAuth session management.
- **Material UI (MUI)**: UI component library for React. Provides modern, accessible design components and icons.
- **TanStack Query**: TanStack Query is configurable down to each observer instance of a query with knobs and options to fit every use-case. Simpler and lighter than Redux.
- **React Hook Form**: Lightweight, performant library for managing form state and validation.
- **React Quill**: Rich text editor used for writing and editing blog posts with formatting.


### Backend:
- **NestJS**: Modular, scalable Node.js framework on the backend. Used to build the REST API with features like validation, logging, scheduling, and event-driven architecture
- **PostgreSQL**: Reliable, open-source relational database for storing structured app data including users, articles, and metadata.
- **MongoDB Atlas**: MongoDB/Mongoose used as feature based to store **OpenAI** chats and messages.
- **Prisma**: Modern, type-safe ORM for querying PostgreSQL. Handles migrations, schema definitions, and database interaction in NestJS.
- **Redis**: In-memory data store used for caching responses and improving app performance (e.g., caching articles or search queries).
- **Meilisearch**: A powerful, ultra-fast full-text search engine used for searching blog articles with typo tolerance and relevance-based results.
- **JWT (JSON Web Tokens)**: Used server-side for stateless authentication and secure API access.
- **Multer**: Middleware used in NestJS to handle file uploads (images, etc.) from the frontend.
- **Google Drive API**: Used to store uploaded images (user profile pictures or blog banners) securely in Google Drive. URLs are stored in the database.
- **Event Emitter (nestjs/event-emitter)**: Adds support for an event-driven architecture, where parts of the app can listen for and respond to specific events—like Adding articles/posts on **Redis** and **Meilisearch**, Delete images from **Google Drive** when a post deleted or updated or user profile image updated.
- **Cron Job (nestjs/schedule)**: Allows scheduling of cron jobs or interval-based background tasks. Ideal for tracking and keeping data consistency** on **PostgreSQL**, **Redis**, and **Meilisearch**.
- **Class Validator**: Validates incoming data using decorators in NestJS DTOs.
- **Class Transformer**: Transforms raw data into class instances and helps with serialization/deserialization.
- **Swagger**: Auto-generates interactive API docs for backend routes and DTOs in NestJS.
- **Pino + Pino Pretty**: High-speed JSON logger used in NestJS. Pino-pretty formats logs nicely during development.
- **NewsAPI**: Third-party news aggregator API. Optionally used to fetch and display trending external content.
- **Quote API**: Third-party quote generator API. Daily quotes to motivate visitors.
- **Axios**: A promise-based HTTP client is used on both frontend and backend to make API requests and integrations.


## Contribution
Contributions to the **Thynkray** project are advanced welcome. Whether you're fixing a bug, implementing a new feature, improving documents, or you have an awesome idea for this project, your contributions help me to enhance projects acceptability to others.

### Contributors

- [Md Rubel Ahmed Rana](https://github.com/Md-Rubel-Ahmed-Rana)

## License

This project has not been licensed yet.
