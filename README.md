# 🏋️‍♂️ FitFusion AI (Wellnex)

A modern, AI-powered fitness and wellness app built with Next.js, TypeScript, Prisma, and Tailwind CSS. FitFusion AI helps you achieve your health goals with personalized meal plans, smart workout routines, progress tracking, and more—all in a beautiful, glassmorphic UI.

---

![FitFusion AI Banner](public/hero_img.avif)

## 🚀 Overview
FitFusion AI is your all-in-one fitness companion. Whether you're a beginner or a pro, our app uses AI to generate meal and workout plans tailored to your profile, helps you track your progress, and keeps you motivated on your wellness journey.

---

## ✨ Features
- **Modern Glassmorphic UI**: Stunning, responsive design with gradients, icons, and smooth animations.
- **Profile Management**: Securely store your personal data and upload a profile image (with Clerk authentication).
- **AI Meal & Workout Plans**: Generate, save, and load personalized plans that persist across sessions.
- **Progress Tracking**: Log daily fitness progress and view your stats on a beautiful dashboard.
- **Contact & Feedback**: Modern contact form with database storage and beautiful completion messages.
- **Seamless Navigation**: Smooth hash-link navigation and quick access submenu.
- **Error Handling**: Robust error and loading states for a smooth user experience.

---

## 🛠️ Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: MySQL (via [Prisma ORM](https://www.prisma.io/))
- **Authentication**: [Clerk](https://clerk.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI/UX**: Framer Motion, React Icons, Glassmorphism
- **AI Integration**: (Pluggable, e.g., Gemini, OpenAI, etc.)

---

## 📸 Screenshots
| Dashboard | Profile | Meals & Workouts | Contact |
|-----------|---------|------------------|---------|
| ![Dashboard](public/hero_img.avif) | ![Profile](public/about.avif) | ![Meals](public/fitness.avif) | ![Contact](public/window.svg) |

---

## ⚡ Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/yourusername/wellnex.git
cd wellnex
```

### 2. **Install dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Set up environment variables**
Create a `.env` file in the root directory and add your database and Clerk credentials:
```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/wellnex"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. **Run database migrations**
```bash
npx prisma migrate dev
```

### 5. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📝 Usage
- **Sign Up / Sign In**: Use Clerk authentication to create your account.
- **Complete Your Profile**: Fill in your personal details and upload a profile image.
- **Generate Plans**: Use the Meals and Workouts pages to generate and save AI-powered plans.
- **Track Progress**: Log your daily fitness progress in the Test section.
- **Dashboard**: View your stats, avatar, and quick navigation.
- **Contact**: Send feedback or questions via the modern contact form.

---

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 🧑‍💻 Credits
- **Design & Development**: [Vivek Nath Tiwari](https://github.com/Viveknathtiwari01)
- **UI Inspiration**: Glassmorphism, Tailwind UI, Framer Motion
- **Special Thanks**: All open-source contributors and the fitness community!

---

## 📄 License
[MIT](LICENSE)

---

> Made with ❤️ by Vivek Nath Tiwari | FitFusion AI
