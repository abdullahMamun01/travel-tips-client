
# Travel Tips & Destination Guides - Frontend

## Overview

The "Travel Tips & Destination Guides" frontend is built using **Next.js 14**, providing a smooth and interactive experience for users to explore travel tips and destination guides. It integrates several modern technologies to enhance the user experience, handle form validation, and manage global state efficiently.

## Features

- **Rich User Interface**: Designed for seamless navigation, content creation, and interaction.
- **State Management with Zustand**: Lightweight and simple state management for handling global state across the application.
- **Data Fetching with TanStack Query**: Handles server-state synchronization, caching, and background fetching to ensure efficient data management.
- **Form Validation with React Hook Form & Zod**: Ensures clean and validated form inputs with schema-based validation using Zod.
- **Rich Text Editor**: Allows users to create and edit travel tips and stories with the **React Quill** rich text editor.
- **Strong Type Safety**: The application is built using **TypeScript**, ensuring type safety and minimizing runtime errors.

## Frontend Folder Structure

```bash
src/
├── components/      # Reusable components (e.g., buttons, form inputs)
├── hooks/           # Custom React hooks
├── action/           # server action 
├── app/            # Next.js app router
├── stores/          # Zustand stores for global state management
├── services/        # API service functions (fetching, updating, etc.)
├── utils/           # Utility functions and helpers
└── schema/      # Zod schemas for form validation
```

## Key Technologies

- **Next.js 14**: Framework for building the frontend with server-side rendering (SSR) and static site generation (SSG).
- **TanStack Query**: Efficient server state management, caching, and background syncing.
- **Zustand**: A lightweight state management library that allows for global state handling.
- **React Hook Form**: Manages form state with great performance and flexibility.
- **Zod**: Schema validation to ensure that forms are validated before submission.
- **React Quill**: A rich text editor that allows users to format content as they create posts and travel stories.
- **TypeScript**: Ensures type safety, reducing the chance of runtime errors and improving the development experience.

## Installation Guide

### Prerequisites

Make sure you have the following installed:

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher

### Steps to Set Up the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/abdullahMamun01/travel-tips-client
   ```

2. **Navigate to the project directory**:

   ```bash
   cd travel-tips-frontend
   ```

3. **Install dependencies**:

   Run the following command to install all required dependencies:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env.local` file in the root directory of your project and add the following variables (adjust the values as per your setup):

   ```bash
   NEXT_PUBLIC_API_BASE_URL= https://triporio-api.vercel.app/api
 
   ```

5. **Run the development server**:

   Once everything is set up, start the development server with the following command:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Building for Production

To build the project for production, run:

```bash
npm run build
```

This will create an optimized production build in the `.next` directory.

To start the production build, use:

```bash
npm run start
```

### Additional Commands

- **Linting**: Run ESLint to check for code style issues:

  ```bash
  npm run lint
  ```

- **Format code**: Use Prettier to format the code:

  ```bash
  npm run format
  ```

## Password Recovery Process

1. **Forgot Password**: 
   - Users can initiate password recovery by requesting an OTP via their registered email.
   
2. **Email OTP Verification**: 
   - After receiving the OTP, users can reset their password by entering the OTP and their new password.

## Form Handling

- **React Hook Form**: Used to manage and validate forms.
- **Zod**: Provides schema-based validation to ensure that all form data adheres to predefined rules.

## State Management

- **Zustand**: Used to manage global application state, offering a lightweight and scalable solution for state handling.
- **TanStack Query**: Optimizes server-state management, handling data fetching, caching, and synchronization with minimal boilerplate.

## Rich Text Editing

- **React Quill**: Users can format and style their travel posts using a rich text editor.
