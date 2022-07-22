// Return first element that matches the param id
export const findById = (resources, id) => {
  if (!resources) return null;

  return resources.find((r) => r.id === id);
};

// Replace the recource or add resource to array
export const updateAndInsert = (resources, resource) => {
  const index = resources.findIndex((el) => el.id === resource.id);

  if (resource.id && index !== -1) {
    resources[index] = resource;
  } else {
    resources.push(resource);
  }
};
// Use a document from firestore or a resource from Pinia store
export const docToResource = (doc) => {
  // check if doc local resource or from firebase
  if (typeof doc?.data !== 'function') return doc;
  return { ...doc.data(), id: doc.id };
};
