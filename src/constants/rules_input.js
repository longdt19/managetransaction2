export const TRANSACTION_RULES = {
  code: [
    {required: true, message: 'Mã giao dịch không được để trống', trigger: 'blur'}
  ],
  money: [
    {required: true, message: 'Số tiền không được để trống', trigger: 'blur'}
  ],
  bankAccountId: [
    {required: true, message: 'Ngân hàng không được để trống', trigger: 'change'}
  ],
  traders: [
    {required: true, message: 'Người giao dịch không được để trống', trigger: 'blur'}
  ]
}

export const ORDER_RULES = {
  customerId: [
    {required: true, message: 'Khách hàng không được để trống', trigger: 'change'}
  ],
  productId: [
    {required: true, message: 'Sản phẩm không được để trống', trigger: 'change'}
  ]
}

export const CUSTOMER_RULES = {
  groupId: [
    {required: true, message: 'Nhóm khách hàng không được để trống', trigger: 'change'}
  ],
  azAccount: [
    {required: true, message: 'Tài khoản không được để trống', trigger: 'change'}
  ],
  name: [
    {required: true, message: 'Tên không được để trống', trigger: 'change'}
  ]
}

export const TRANSFER_RULES = {
  fromBankAccountId: [
    {required: true, message: 'Ngân hàng chuyển không được để trống', trigger: 'change'}
  ],
  toBankAccountId: [
    {required: true, message: 'Ngân hàng nhận không được để trống', trigger: 'change'}
  ],
  code: [
    {required: true, message: 'Mã giao dịch không được để trống', trigger: 'blur'}
  ],
  money: [
    {required: true, message: 'Số tiền không được để trống', trigger: 'blur'}
  ],
  traders: [
    {required: true, message: 'Người giao dịch không được để trống', trigger: 'blur'}
  ]
}
