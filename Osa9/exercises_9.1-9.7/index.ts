import express, { NextFunction } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());


interface Exercises {
  daily_exercises: Array<number>
  target: number
}


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.json({ error: 'malformatted parameters' });
  }
  
  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as Exercises;

  if (!daily_exercises || !target) {
    return res.json({ error: 'parameters missing' });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});


const errorHandler = (
  error: Error,
  _req: express.Request, 
  res: express.Response, 
  _next: NextFunction
) => {
  if (error.name === 'SyntaxError') {
    return res.json({ error: 'malformatted parameters' });
  }
  
  return res.json({ error: 'error' });
};

app.use(errorHandler);


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});