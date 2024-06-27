const fetchData = async <T>(resource: string): Promise<T> => {
  const response = await fetch(`http://localhost:8080/${resource}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}`);
  }
  const data: T = await response.json();
  return data;
};

export default fetchData;
