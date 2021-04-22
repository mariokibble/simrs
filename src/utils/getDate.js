const getDate = () => {
  const dt = new Date()
  const hours = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours()
  const minutes = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes()
  const getMonth = dt.getMonth() + 1
  const month = getMonth < 10 ? `0${getMonth}` : getMonth
  const date = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate()
  return `${dt.getFullYear()}-${month}-${date} ${hours}:${minutes}`
}

export const getDateWithoutHours = () => {
  const dt = new Date()
  const getMonth = dt.getMonth() + 1
  const month = getMonth < 10 ? `0${getMonth}` : getMonth
  const date = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate()
  return `${dt.getFullYear()}-${month}-${date}`
}

export default getDate
