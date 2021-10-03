import { PAGE_TYPE } from 'src/constants';
import { transformMultiply, transformDivide } from 'src/helpers';
import BaseEntity from './base.entity';
import ControlOption from './control-option';
import SubTableEntity from './sub-table.entity';

class LeaveEntity extends BaseEntity {
  constructor() {
    super();
    this.mainTable = 'travel';
    this.mainType = PAGE_TYPE.WORKING_SCHEDULE;
    this.path = 'working-schedule';
    this.navTitle = 'Lịch công tác';
    this.subTables = [
      new SubTableEntity({
        navTitle: 'Lịch sử phê duyệt',
        mainTable: 'common/getProcessApprove/TravelCalendar',
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
      new ControlOption({ key: 'employeeName', header: 'Tên NV', type: 'text', forApprove: true }),
      new ControlOption({ key: 'calendarDate', header: 'Ngày tạo', type: 'date' }),
      new ControlOption({ key: 'fromDate', header: 'Từ ngày', type: 'dateTime' }),
      new ControlOption({ key: 'toDate', header: 'Đến ngày', type: 'dateTime' }),
      new ControlOption({ key: 'realDay', header: 'Số ngày thực tế', type: 'text' }),
      new ControlOption({ key: 'description', header: 'Diễn giải', type: 'text' }),
      new ControlOption({ key: 'fk_travelType', header: 'Loại công tác', type: 'select', isShow: false }),
      new ControlOption({ key: 'fk_province_travelType', header: 'Nơi công tác', type: 'select' }),
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip' })
    ];
    this.detailControls = [
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip-disabled', grid: 12 }),
      new ControlOption({ key: 'employeeNo', header: 'Mã NV', type: 'text', grid: 6, forApprove: true }),
      new ControlOption({ key: 'employeeName', header: 'Họ tên NV', type: 'text', grid: 6, forApprove: true }),
      new ControlOption({ key: 'name', header: 'Tên phiếu', type: 'input', grid: 6 }),
      new ControlOption({ key: 'calendarDate', header: 'Ngày tạo', type: 'date', grid: 6, required: true }),
      new ControlOption({ key: 'fromDate', header: 'Từ ngày', type: 'dateTime-max-toDate', grid: 6, required: true }),
      new ControlOption({ key: 'toDate', header: 'Đến ngày', type: 'dateTime-min-fromDate', grid: 6, required: true }),
      new ControlOption({ key: 'fk_travelType', header: 'Loại công tác', type: 'select', grid: 6, required: true }),
      new ControlOption({ key: 'fk_province_travelType', header: 'Nơi công tác', type: 'select', grid: 6, required: true }),
      new ControlOption({ key: 'sunDay', header: 'Tính chủ nhật', type: 'checkbox', grid: 6 }),
      new ControlOption({ key: 'feeCaculator', header: 'Không tính công tác phí', type: 'checkbox', grid: 6 }),
      new ControlOption({ key: 'description', header: 'Diễn giải', type: 'input', grid: 12, required: true }),
    ];
  }
}

export default LeaveEntity;
