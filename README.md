# GitHub Profile Viewer

A modern, responsive React application built with TypeScript, Vite, and Tailwind CSS that allows you to explore GitHub profiles, repositories, and recent activities.

![GitHub Profile Viewer](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)

## ✨ Features

- **🔍 User Search**: Search for any GitHub user by username
- **👤 Profile Display**: View comprehensive user profile information including avatar, bio, location, company, website, and join date
- **📊 Repository Listing**: Browse paginated public repositories with sorting options
- **🌟 Repository Details**: See repository names, descriptions, languages, stars, forks, and last update times
- **📈 Activity Feed**: View recent public activities and contributions
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **🎯 Quick Actions**: Try sample users with one-click buttons
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **♿ Accessibility**: Keyboard navigation, screen reader support, and semantic HTML
- **🔒 Rate Limit Friendly**: Optional GitHub Personal Access Token support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables (optional)**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GITHUB_TOKEN=your_github_personal_access_token_here
   ```
   
   > **Note**: Adding a GitHub token increases your API rate limit from 60 to 5,000 requests per hour.

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🔑 GitHub Personal Access Token (Optional)

To avoid rate limiting, you can create a GitHub Personal Access Token:

### Creating a Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "GitHub Profile Viewer")
4. Select the following scopes:
   - `public_repo` (for accessing public repository information)
   - `read:user` (for reading public user profile information)
5. Click "Generate token"
6. Copy the token immediately (you won't be able to see it again)

### Using the Token

1. Create a `.env` file in the project root
2. Add your token:
   ```env
   VITE_GITHUB_TOKEN=ghp_your_token_here
   ```
3. Restart the development server

> ⚠️ **Security Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## 📝 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run test`** - Run unit tests
- **`npm run lint`** - Lint code with ESLint

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library
- **API**: GitHub REST API v3

## 🧪 Testing

Run tests with:
```bash
npm test                # Run all tests
npm run test:coverage   # Run with coverage report
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: GitHub Personal Access Token (increases rate limits)
VITE_GITHUB_TOKEN=your_github_token_here
```

## 🐛 Troubleshooting

### Common Issues

**Rate limit errors**
- Add a GitHub Personal Access Token to increase rate limits
- Wait for the rate limit to reset (shown in error messages)

**Network errors**
- Check your internet connection
- Verify GitHub API is accessible from your network

**Build errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**