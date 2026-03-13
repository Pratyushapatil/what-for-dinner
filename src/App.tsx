import { useState } from 'react'
import './App.css'
import MealForm from './Screens/mealform'
import RecipesScreen from './Screens/RecipesScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState<'planner' | 'recipes'>('planner')

  return (
    <div>
      {currentScreen === 'planner' ? (
        <MealForm onNavigate={setCurrentScreen} />
      ) : (
        <RecipesScreen onNavigate={setCurrentScreen} />
      )}
    </div>
  )
}

export default App
