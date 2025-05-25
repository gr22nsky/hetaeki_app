import instance from './instance';

export async function postQuestion(question: string) {
  const res = await instance.post('/queries/', { question });
  return res.data; // { question, answer }
} 