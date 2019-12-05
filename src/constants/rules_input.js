export const TRANSACTION_RULES = {
  code: [
    {required: true, message: 'Mã giao dịch không được để trống', trigger: 'blur'}
  ],
  money: [
    {required: true, message: 'Số tiền không được để trống', trigger: 'blur'}
  ],
  bankAccountId: [
    {required: true, message: 'Ngân hàng không được để trống', trigger: 'change'}
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
