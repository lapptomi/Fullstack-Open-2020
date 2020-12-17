

const calculateBmi = (height: number, weight: number): string => {
    const result: number = weight / (Math.pow(height / 100, 2))

    if (result < 15) return 'Very severely underweight'
    else if (result < 16) return 'Severely underweight'
    else if (result < 18.5) return 'Underweight'
    else if (result < 25) return 'Normal (healthy weight)'
    else if (result < 30) return 'Overweight'
    else if (result < 35) return 'Obese Class I (Moderately obese)'
    else if (result < 40) return 'Obese Class II (Severely obese)'
    else return 'Obese Class III (Very severely obese)'
}

console.log(calculateBmi(180, 74))
