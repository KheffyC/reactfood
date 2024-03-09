import { useEffect, useState } from "react"
import MealItem from "./MealItem"


const Meals = () => {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3000/meals')
      
      if(!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      const meals = await response.json()
      setMeals(meals)
    })()
  }, [])

  const listOfMeals = meals.map(meal => {
    return <MealItem key={meal.id} meal={meal} />
  })

  return (
    <>
      <ul id="meals">
      {listOfMeals}
      </ul>
    </>
  )
}

export default Meals