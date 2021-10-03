import { PAGE_TYPE } from 'src/constants';
import { transformMultiply, transformDivide } from 'src/helpers';
import BaseEntity from './base.entity';
import ControlOption from './control-option';
import SubTableEntity from './sub-table.entity';

class LeaveEntity extends BaseEntity {
  constructor() {
    super();
    this.mainTable = 'OT';
    this.mainType = PAGE_TYPE.OVERTIME;
    this.path = 'overtime';
    this.navTitle = 'Tăng ca';
    this.subTables = [
      new SubTableEntity({
        navTitle: 'Lịch sử phê duyệt',
        mainTable: 'common/getProcessApprove/EmployeeOvertime',
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
        mainTable: 'common/getComment/EmployeeOvertime'
      })
    ];
    this.tableControls = [
      new ControlOption({ key: 'no', header: 'Mã chứng từ', type: 'text' }),
      new ControlOption({ key: 'employeeNo', header: 'Mã NV', type: 'text', forApprove: true }),
      new ControlOption({ key: 'employeeName', header: 'Họ tên NV', type: 'text', forApprove: true }),
      new ControlOption({ key: 'fromDate', header: 'Từ ngày', type: 'dateTime' }),
      new ControlOption({ key: 'toDate', header: 'Đến ngày', type: 'dateTime' }),
      new ControlOption({ key: 'fk_shifts', header: 'Ca làm viêc', type: 'select' }),
      new ControlOption({ key: 'fk_overtimeRate', header: 'Tỷ lệ hưởng', type: 'select' }),
      new ControlOption({ key: 'reason', header: 'Lý do', type: 'text' }),
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip' })
    ];
    this.detailControls = [
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip-disabled', grid: 12 }),
      new ControlOption({ key: 'employeeNo', header: 'Mã NV', type: 'text', grid: 6, forApprove: true }),
      new ControlOption({ key: 'employeeName', header: 'Họ tên NV', type: 'text', grid: 6, forApprove: true }),
      new ControlOption({ key: 'fromDate', header: 'Từ ngày', type: 'dateTime-max-toDate', grid: 6, required: true }),
      new ControlOption({ key: 'toDate', header: 'Đến ngày', type: 'dateTime-min-fromDate', grid: 6, required: true }),
      new ControlOption({ key: 'fk_shifts', header: 'Ca làm viêc', type: 'select', grid: 6, required: true }),
      new ControlOption({ key: 'fk_overtimeRate', header: 'Tỷ lệ hưởng', type: 'select', grid: 6, required: true }),
      new ControlOption({ key: 'breakHour', header: 'Thời gian nghỉ giữa giờ (phút)', type: 'input-number', grid: 12, transform: [transformMultiply, transformDivide, 60] }),
      new ControlOption({ key: 'reason', header: 'Lý do', type: 'input', grid: 12, required: true }),
      new ControlOption({ key: 'CTCheck', header: 'Tăng ca theo công tác', type: 'checkbox', grid: 6 }),
    ];
  }
}

export default LeaveEntity;
