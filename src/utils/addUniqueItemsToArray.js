export const addUniqueItemsToArray = (array, items) =>
  [...array, ...items].filter(
    (value, index, self) => self.indexOf(value) === index,
  )
