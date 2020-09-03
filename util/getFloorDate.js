const getFloorDate = (date) => {
  let floorDate = date ? new Date(date) : new Date();
  floorDate.setHours(0, 0, 0, 0);
  return floorDate;
};

export default getFloorDate;
