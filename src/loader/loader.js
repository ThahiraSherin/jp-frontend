// src/loaders/jobLoaders.js
export async function jobLoader({ params }) {
  try {
    const res = await fetch(`/api/jobs/${params.id}`);
    if (res.status === 404) return null; // return null if job not found
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
