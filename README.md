# Mealy - Recipe Finder

**Live Web Application:** [https://mealy-three.vercel.app/](https://mealy-three.vercel.app/)

Mealy is a React + TypeScript app for searching meals from TheMealDB, viewing recipe details, and managing favorite recipes with persistence.

## Local Setup

### 1. Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm 9+

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Create a `.env` file in the project root:

```env
VITE_MEAL_DB_BASE_URL=https://www.themealdb.com/api/json/v1
VITE_MEAL_DB_SECRET=1
```

You can also copy from `.env.example`.

### 4. Run the app
```bash
npm run dev
```

App runs at the Vite local URL shown in terminal (usually `http://localhost:5173`).

### 5. Build for production
```bash
npm run build
```

### 6. Lint
```bash
npm run lint
```

### 7. Run unit tests
```bash
npm run test
```

## Implemented Features

- Search recipes by recipe name and/or main ingredient.
- Filter recipes by category and cuisine.
- Combined filtering logic (search + filters applied together).
- Reset action to clear inputs, filters, results, and selection state.
- Responsive recipe list with pagination.
- Recipe detail modal:
  - Name, image, instructions
  - Ingredients and measurements
  - Category and cuisine/area
  - Source and video links (when available)
- Favorite recipes:
  - Heart toggle on recipe cards
  - Add/remove favorite directly from cards
  - Favorites persisted to localStorage via Redux store subscription
  - Favorites page displaying saved recipes
- Loading states:
  - Reusable Loader component
  - Loader in search requests, detail requests, and submit button

## Design Choices (Brief)

- **Component separation:** Search form, filters, reset button, list, card, pagination, modal, and detail are split into separate components for maintainability.
- **Service layer:** API calls and response mapping live in `src/services/mealDb.ts` to keep UI components focused on rendering/state.
- **Composable query strategy:** Search + ingredient/category/cuisine filters are combined by intersecting recipe IDs from each API result set.
- **State management:** React local state is used for page/UI flow; Redux is used for cross-page favorites with localStorage persistence.
- **Responsive UX:** Card layout and pagination are tuned by viewport breakpoints to keep pages visually filled and predictable.
