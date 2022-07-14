// Return first element that matches the param id
export const findById = (resources, id) => {
  if (!resources) return null;

  return resources.find((r) => r.id === id);
};

// Return index of element that matches the param id,
export const updateAndInsert = (resources, resource) => {
  const index = resources.findIndex((el) => el.id === resource.id);

  if (resource.id && index !== -1) {
    resource[index] = resource;
  } else {
    resources.push(resource);
  }
};
