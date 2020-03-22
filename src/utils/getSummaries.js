export default function getSummaries (params) {
  const { columns, data } = params
  const sums = []

  if (columns.length > 0 && data.length > 0) {
    columns.forEach((column, index) => {
      if (column.property) {
        const values = data.map(item => { Number(item[column.property]) })
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0).toLocaleString()
        } else {
          sums[index] = ''
        }
      } else {
        sums[index] = ''
      }
    })
  }
  sums[0] = 'Tổng'
  return sums
}
