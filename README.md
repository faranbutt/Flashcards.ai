# Flashcards AI

Flashcards AI is an intelligent, cloud-based flashcards application that uses AI to help users study and retain information more effectively. Built using modern web technologies, this SaaS app allows users to create, manage, and review flashcards, all while leveraging AI-driven insights for enhanced learning.

## Visit
[Visit the deployed site](https://flashcards-ai-eight.vercel.app/)
## Features

- **AI-Generated Flashcards**: Automatically generate flashcards from provided content using AI.
- **Custom Flashcard Sets**: Create and manage personalized flashcard sets.
- **Learning Insights**: Receive AI-driven insights on your learning progress and recommendations for improvement.
- **Interactive UI**: Enjoy a seamless user experience with an intuitive and responsive interface.
- **Secure Authentication**: Secure sign-ups and logins with Clerk authentication.
- **Subscription Plans**: Monetize the app with Stripe-integrated subscription plans.
- **Scalable Infrastructure**: Hosted on AWS for reliable and scalable performance.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Payment Processing**: [Stripe](https://stripe.com/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Cloud Hosting**: [AWS](https://aws.amazon.com/)
- **UI Components**: [shadcn/ui](https://shadcn.dev/) and [Aceternity UI](https://aceternityui.com/)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later)
- AWS CLI (configured with your credentials)

### Clone the Repository

```bash
1. git clone https://github.com/your-username/flashcards-ai.git
2. cd flashcards-ai
3. npm install

```
# Create a Environement File
- Create a .env.local file and replace keys inside as 
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-api-key
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
```

# Run the APP:
```bash
npm run dev
```

# Contributing
I welcome contributions! Please fork the repository and submit a pull request.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

# Contact
For questions, suggestions, or support, please contact us at faranbutt789@gmail.com.