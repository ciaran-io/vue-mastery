// Return first element that matches the param id
export const findById = (rescources, id) => rescources.find((r) => r.id === id);

// Return index of element that matches the param id,
export const updateAndInsert = (rescourses, rescourse) => {
  const index = rescourses.findIndex((el) => el.id === rescourse.id);

  if (rescourse.id && index !== -1) {
    rescourses[index] = rescourse;
  } else {
    rescourses.push(rescourse);
  }
};
