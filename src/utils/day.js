export default function getDays () {
  // return firt day of month and now day by timestamp
  let today = new Date()
  let firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  return {
    to_date: today.getTime(),
    from_date: firstDay.getTime()
  }
}
