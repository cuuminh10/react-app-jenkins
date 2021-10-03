import { PAGE_TYPE } from 'src/constants';
import BaseEntity from './base.entity';
import ControlOption from './control-option';
import SubTableEntity from './sub-table.entity';

class PurchaseRequestEntity extends BaseEntity {
  constructor() {
    super();
    this.mainTable = 'pr';
    this.mainType = PAGE_TYPE.PURCHASE_REQUEST;
    this.path = 'purchase-request';
    this.navTitle = 'purchase request';
    this.subTables = [
      new SubTableEntity({
        type: 'table',
        navTitle: 'Chi tiết chứng từ',
        mainTable: 'pr/detail',
        tableControls: [
          new ControlOption({ key: 'no', header: 'Mã NVL', type: 'text' }),
          new ControlOption({ key: 'name', header: 'Tên NVL', type: 'text' }),
          new ControlOption({ key: 'itemQty', header: 'Số lượng', type: 'number' }),
          new ControlOption({ key: 'units', header: 'ĐVT', type: 'text' }),
          new ControlOption({ key: 'stkQty', header: 'Số lượng (kho)', type: 'number' }),
          new ControlOption({ key: 'unitStk', header: 'ĐVT (kho)', type: 'text' }),
          new ControlOption({ key: 'arrivalDate', header: 'Ngày yêu cầu giao', type: 'date' }),
        ]
      }),
      new SubTableEntity({
        type: 'table',
        navTitle: 'Lịch sử phê duyệt',
        mainTable: 'common/getProcessApprove/PR',
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
        mainTable: 'common/getComment/PR'
      })
    ];
    this.tableControls = [
      new ControlOption({ key: 'no', header: 'Mã chứng từ', type: 'text' }),
      new ControlOption({ key: 'employeeName', header: 'Họ tên NV', type: 'text', forApprove: true }),
      new ControlOption({ key: 'apprDate', header: 'Ngày lập PR', type: 'date' }),
      new ControlOption({ key: 'description', header: 'Diễn giải', type: 'text' }),
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip' })
    ];
    this.detailControls = [
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip-disabled' }),
      new ControlOption({ key: 'no', header: 'Mã chứng từ', type: 'text' }),
      new ControlOption({ key: 'apprDate', header: 'Ngày lập PR', type: 'date' }),
    ];
  }
}

export default PurchaseRequestEntity;
