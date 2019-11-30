export default function date_from_timestamp (stamp) {
  let date = new Date(stamp)
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}
