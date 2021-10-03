import { PAGE_TYPE } from 'src/constants';
import BaseEntity from './base.entity';
import ControlOption from './control-option';
import SubTableEntity from './sub-table.entity';

class LeaveEntity extends BaseEntity {
  constructor() {
    super();
    this.mainTable = 'offWork';
    this.mainType = PAGE_TYPE.OFF_WORK;
    this.path = 'offWork';
    this.navTitle = 'Báo phép';
    this.subTables = [
      new SubTableEntity({
        navTitle: 'Lịch sử phê duyệt',
        mainTable: 'common/getProcessApprove/EmployeeOffWork',
        tableControls: [
          new ControlOption({ key: 'approveNo', header: 'Mã ký duyệt', type: 'text' }),
          new ControlOption({ key: 'approveStatus', header: 'Trạng thái ký duyệt', type: 'text' }),
          new ControlOption({ key: 'approveUser', header: 'Người thực hiện', type: 'text' }),
          new ControlOption({ key: 'remark', header: 'Lý do', type: 'text' }),
          new ControlOption({ key: 'approveDate', header: 'Thời gian thực hiện', type: 'date' })
        ]
      }),
      new SubTableEntity({
        type: 'comment',
        navTitle: 'Lịch sử comment',
        mainTable: 'common/getComment/EmployeeOffWork'
      })
    ];
    this.tableControls = [
      new ControlOption({ key: 'no', header: 'Mã chứng từ', type: 'text' }),
      new ControlOption({ key: 'employeeNo', header: 'Mã NV', type: 'text', forApprove: true }),
      new ControlOption({ key: 'employeeName', header: 'Họ tên NV', type: 'text', forApprove: true }),
      new ControlOption({ key: 'fk_employeeLeaveTypes', header: 'Loại phép', type: 'select' }),
      new ControlOption({ key: 'lc_typeCombox', header: 'Diện nghỉ', type: 'select', isShow: false }),
      new ControlOption({ key: 'fromDate', header: 'Từ ngày', type: 'date' }),
      new ControlOption({ key: 'toDate', header: 'Đến ngày', type: 'date' }),
      new ControlOption({ key: 'regDays', header: 'Số ngày', type: 'number' }),
      new ControlOption({ key: 'reason', header: 'Lý do nghỉ', type: 'text' }),
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip' })
    ];
    this.detailControls = [
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip-disabled', grid: 12 }),
      new ControlOption({ key: 'employeeNo', header: 'Mã NV', type: 'text', grid: 6, forApprove: true }),
      new ControlOption({ key: 'employeeName', header: 'Họ tên NV', type: 'text', grid: 6, forApprove: true }),
      new ControlOption({ key: 'fromDate', header: 'Từ ngày', type: 'date-max-toDate', grid: 6, required: true }),
      new ControlOption({ key: 'toDate', header: 'Đến ngày', type: 'date-min-fromDate', grid: 6, required: true }),
      new ControlOption({ key: 'fk_employeeLeaveTypes', header: 'Loại phép', type: 'select', grid: 6, required: true }),
      new ControlOption({ key: 'lc_typeCombox', header: 'Diện nghỉ', type: 'select', grid: 6, required: true }),
      new ControlOption({ key: 'regDays', header: 'Số ngày ', type: 'input-number', grid: 12, autoFillFrom: ['fromDate', 'toDate'], required: true }),
      new ControlOption({ key: 'reason', header: 'Lý do nghỉ', type: 'input', grid: 12, required: true }),
    ];
  }
}

export default LeaveEntity;
