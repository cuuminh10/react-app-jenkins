const resources = {
  locations: ['Tầng 1', 'Tầng 2', 'Tầng 3', 'Tầng 4'],
  roles: ['Leader', 'Dev'],
  public: {
    false: 'Private',
    true: 'Public'
  },
  leaveTypeOptions: [
    {
      id: 1,
      name: 'Nghỉ việc riêng'
    },
    {
      id: 2,
      name: 'Nghỉ ốm'
    },
    {
      id: 3,
      name: 'Phép năm'
    },
    {
      id: 4,
      name: 'Nghỉ kết hôn'
    },
    {
      id: 5,
      name: 'Nghỉ thai sản'
    },
    {
      id: 6,
      name: 'Nghỉ tang chế'
    },
    {
      id: 7,
      name: 'Nghỉ không hưởng lương'
    },
    {
      id: 8,
      name: 'Nghỉ không phép'
    },
    {
      id: 9,
      name: 'Nghỉ tai nạn'
    },
    {
      id: 10,
      name: 'Nghỉ con kết hôn'
    },
  ],
  typeCombox: [
    { id: 'Permision', name: 'Có đơn' },
    { id: 'UnPermision', name: 'Không đơn' },
  ],
  status: [
    { id: 'New', name: 'Mới', color: 'info' },
    { id: 'InProgress', name: 'Đang xử lý', color: 'warning' },
    { id: 'Approved', name: 'Đã duyệt', color: 'success' },
    { id: 'Approving', name: 'Đang duyệt', color: 'warning' },
    { id: 'Rejected', name: 'Từ chối', color: 'error' }
  ],
  approveStatus: [
    { id: 'InProgress', name: 'Đang xử lý', color: 'warning' },
    { id: 'Approved', name: 'Đã duyệt', color: 'success' },
    { id: 'Rejected', name: 'Từ chối', color: 'error' }
  ],
  mailTypes: [
    { id: 'EmployeeOffWork', name: 'Báo phép' },
    { id: 'EmployeeOvertime', name: 'Tăng ca' },
    { id: 'TravelCalendar', name: 'Lịch công tác' },
    { id: 'PR', name: 'Purchase request' },
    { id: 'PO', name: 'Purchase order' },
    { id: 'PmtReq', name: 'Payment request' },
    { id: 'SO', name: 'Sale Order' }
  ]
};

export default resources;
