# GitCalm 🌊

GitCalm is your daily sanctuary for GitHub activity. It cuts through the noise of endless notifications by intelligently summarizing your repository events into a clean, visual dashboard. Focus on what matters: outcomes, blockers, and essential updates.

## ✨ Features

*   **🔌 Seamless Repo Connection**: Connect your GitHub account and select exactly which repositories you want to track.
*   **📊 Visual Pulse Dashboard**: An interactive "Bubble Chart" gives you an instant health check of your projects:
    *   **💛 Outcomes**: See merged PRs and completed work.
    *   **🔴 Attention**: Identify failed builds and critical issues immediately.
    *   **💜 Updates**: Track general activity without the clutter.
*   **🧠 Intelligent Summarization**: Categorizes complex GitHub events (PRs, Issues, CI/CD) into human-readable summaries using smart keyword classification.
*   **🗓️ Time-Travel Filtering**: View activity by "Today", "Last 7 Days", or custom ranges to zoom in on specific sprints or historical data.
*   **📋 Daily Digest**: A simplified feed that prioritizes "Outcomes" and "Attention Items" over mundane logs.
*   **📤 One-Click Reporting**: Generate and copy a Markdown summary of your day - perfect for daily standups or work logs.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: CSS Modules (Custom Design System) & Tailwind CSS
*   **Database**: PostgreSQL (via [Neon](https://neon.tech/) & Prisma ORM)
*   **Auth**: [Auth.js (NextAuth)](https://authjs.dev/)
*   **Integration**: GitHub REST API

## 🚀 Getting Started

### Prerequisites

*   Node.js 18+
*   A GitHub OAuth App (for authentication)
*   A PostgreSQL Database (e.g., local or Neon/Vercel Postgres)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/git-calm.git
    cd git-calm
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://..."
    AUTH_SECRET="your-random-secret"
    GITHUB_ID="your-github-client-id"
    GITHUB_SECRET="your-github-client-secret"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Initialize Database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) to start using GitCalm.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
