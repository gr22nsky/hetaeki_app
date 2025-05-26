import instance from './instance';

export async function getProfile() {
  const res = await instance.get('/accounts/me/');
  return res.data;
}

export async function updateProfile(profile: { age?: number; region?: string; subregion?: string }) {
  const res = await instance.put('/accounts/me/', profile);
  return res.data;
} 

export async function emailLogin(email: string, password: string) {
  // JWT 로그인 (TokenObtainPairView)
  const res = await instance.post('/accounts/login/', { email, password });
  return res.data;
}

export async function emailSignup(data: { email: string; password: string; age: string; region: string; subregion: string }) {
  const res = await instance.post('/accounts/signup/', data);
  return res.data;
}

export async function refreshAccessToken(refresh: string) {
  const res = await instance.post('/accounts/token/refresh/', { refresh });
  return res.data; // { access, refresh }
}