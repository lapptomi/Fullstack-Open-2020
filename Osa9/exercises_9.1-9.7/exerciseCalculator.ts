
interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Rating {
  rating: 1 | 2 | 3
  description: string
}

const calculateRating = (average: number, target: number): Rating => {
    if (average >= target) 
      return { rating: 3, description: 'you reached target value' } 
    else if (average < (target * 0.75)) 
      return { rating: 1, description: 'try harder next time' } 
    else 
      return { rating: 2, description: 'not too bad but could be better' } 
}

const calculateExercises = (days: Array<number>, target: number): Result => {

    const average = days.reduce((total, hours) => total + hours) / days.length
    const ratingResult = calculateRating(average, target)

    return {
      periodLength: days.length,
      trainingDays: days.filter(hours => hours <= 0).length,
      success: average >= target,
      rating: ratingResult.rating,
      ratingDescription: ratingResult.description,
      target: target,
      average: average
    }
}

calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)
