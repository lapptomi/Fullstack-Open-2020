
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

const parseExerciseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const target: number = Number(args[2])
  const hours: Array<number> = args.slice(3).map(h => Number(h))

  if (!isNaN(target) && !hours.includes(NaN)) {
    return { hours, target }
  } else {
    throw new Error('Provided values were not numbers')
  }
}

const calculateRating = (average: number, target: number): Rating => {
    if (average >= target) 
      return { rating: 3, description: 'you reached target value' } 
    else if (average < (target * 0.75)) 
      return { rating: 1, description: 'try harder next time' } 
    else 
      return { rating: 2, description: 'not too bad but could be better' } 
}

const calculateExercises = (hours: Array<number>, target: number): Result => {

    const average = hours.reduce((total, hours) => total + hours) / hours.length
    const ratingResult = calculateRating(average, target)
    const trainingDays = hours.filter(h => h != 0)

    return {
      periodLength: hours.length,
      trainingDays: trainingDays.length,
      success: average >= target,
      rating: ratingResult.rating,
      ratingDescription: ratingResult.description,
      target: target,
      average: average
    }
}

try {
  const { hours, target } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(hours, target))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}
