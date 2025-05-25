import instance from './instance';

export async function getHotTopics(ageGroup: string) {
  const res = await instance.get('/hottopic/', { params: { age_group: ageGroup } });
  return res.data; // { age_group, topics, created_at }
} 