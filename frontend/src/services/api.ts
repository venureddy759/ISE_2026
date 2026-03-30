const BASE_URL = "http://localhost:3000";

export const fetchStats = async () => {
  const res = await fetch(`${BASE_URL}/stats`);
  return res.json();
};

export const fetchRecentPolicies = async () => {
  const res = await fetch(`${BASE_URL}/policies/recent`);
  return res.json();
};

export const fetchUserPolicies = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/policies/user/${userId}`);
  return res.json();
};