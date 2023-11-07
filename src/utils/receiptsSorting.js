export const getNextSortValue = (value) => {
  if (value) {
    switch (value) {
      case 'asc':
        return 'desc'
      case 'desc':
      default:
        return null
    }
  }
  return 'asc'
}

export const getSortsArr = (sortsArr) =>
  sortsArr
    .map((sortObj) => sortObj.keys.map((key) => `${key},${sortObj.sortValue}`))
    .filter((item) => item)
    .flat(1)
