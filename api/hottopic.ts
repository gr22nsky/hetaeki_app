import instance from './instance';

export async function getHotTopics(ageGroup: string) {
  const res = await instance.get('/queries/hottopics/', { params: { age_group: ageGroup } });
  return res.data; // { age_group, topics, created_at }
} 