export default function getDays () {
  // return firt day of month and now day by timestamp
  let today = new Date()
  const dayjs = require('dayjs')
  let firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  today = new Date(dayjs(today).endOf('day'))
  return {
    to_date: today.getTime(),
    from_date: firstDay.getTime()
  }
}
