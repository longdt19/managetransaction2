export const NUMBER_VALIDATOR = /^-?\d*(\.\d+)?$/
export const PHONE_VALIDATOR = /^[0-9]{9,15}$/
export const STORE_KEY = 'Management-System-Store'

export const ORDER_TYPE_LIST = [
  {key: 'Xuất', value: 'XUAT', type: 'info'},
  {key: 'Nhập', value: 'NHAP', type: 'warning'}
]

export const TRANSACTION_TYPE_LIST = [
  {key: 'Chuyển', value: 'CHUYEN_TIEN', type: 'primary', tooltip: 'Chuyển tiền'},
  {key: 'Nhận', value: 'NHAN_TIEN', type: 'success', tooltip: 'Nhận tiền'}
]

export const ACCEPT_TYPE_LIST = [
  {value: 'MOI_TAO', type: '', tooltip: 'Mới tạo'},
  {value: 'DA_DUYET', type: 'success', tooltip: 'Đã duyệt'}
]
