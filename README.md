# FamilyFund - Family Financial Management Platform

FamilyFund is a modern web application designed to help families manage their finances effectively and collaboratively. Built with React, TypeScript, and Firebase, it provides a secure and user-friendly platform for financial planning and resource management.

## Key Features

- **Secure Authentication**: Email/password and Google sign-in options
- **Resource Management**: Access and manage financial resources and educational materials
- **Profile Management**: Personalized user profiles with customizable settings
- **Interactive Dashboard**: Easy-to-use interface for managing financial activities
- **Real-time Updates**: Instant updates using Firebase real-time database
- **Responsive Design**: Seamless experience across all devices

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Styling**: CSS Modules for component-based styling
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/family-fund.git
cd family-fund
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── pages/         # Application pages/routes
├── services/      # Firebase and API services
├── styles/        # Global styles and CSS modules
└── config/        # Configuration files
```

## Contact

For any queries, please reach out to us:
- Email: support@familyfund.com

## License

This project is licensed under the MIT License - see the LICENSE file for details.
