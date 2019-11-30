export const NUMBER_VALIDATOR = /^-?\d*(\.\d+)?$/
export const PHONE_VALIDATOR = /^[0-9]{9,15}$/
export const STORE_KEY = 'Management-System-Store'

export const TYPE_LIST = [
  {
    type: 'XUAT',
    label: 'Xuất',
    type_label: 'success'
  },
  {
    type: 'NHAP',
    label: 'Nhập',
    type_label: 'warning'
  },
  {
    type: 'HOAN_TIEN',
    label: 'Hoàn tiền',
    type_label: 'danger'
  },
  {
    type: 'CHUYEN_TIEN_NOI_BO',
    label: 'Chuyển tiền',
    type_label: 'danger'
  }
]

export const TYPE_LIST_TRANSACTION = [
  {
    type: 'XUAT',
    label: 'Xuất',
    type_label: 'success'
  },
  {
    type: 'NHAP',
    label: 'Nhập',
    type_label: 'warning'
  },
  {
    type: 'HOAN_TIEN',
    label: 'Hoàn tiền',
    type_label: 'danger'
  }
]

export const STATUS_LIST = [
  {
    value: 'TAO_MOI',
    label: 'Đã tạo'
  },
  {
    value: 'DA_DUYET',
    label: 'Đã duyệt'
  }
]
