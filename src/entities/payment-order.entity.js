import { PAGE_TYPE } from 'src/constants';
import BaseEntity from './base.entity';
import ControlOption from './control-option';
import SubTableEntity from './sub-table.entity';

class PaymentOrderEntity extends BaseEntity {
  constructor() {
    super();
    this.mainTable = 'voucherPay';
    this.mainType = PAGE_TYPE.PAYMENT_REQUEST;
    this.path = 'payment-order';
    this.navTitle = 'payment request';
    this.subTables = [
      new SubTableEntity({
        navTitle: 'Chi tiết chứng từ',
        mainTable: 'voucherPay/detail',
        tableControls: [
          new ControlOption({ key: 'objectType', header: 'Loại đối tượng', type: 'text' }),
          new ControlOption({ key: 'objectNo', header: 'Mã đối tượng', type: 'text' }),
          new ControlOption({ key: 'objectName', header: 'Tên đối tượng', type: 'text' }),
          new ControlOption({ key: 'summaryF', header: 'Tổng tiền (NT)', type: 'number' }),
          new ControlOption({ key: 'summary', header: 'Tổng tiền (VND)', type: 'number' }),
          new ControlOption({ key: 'description', header: 'Diễn giải', type: 'text' })
        ],
        summaries: ['summaryF', 'summary'],
        summaryColSpan: 3
      }),
      new SubTableEntity({
        navTitle: 'Lịch sử phê duyệt',
        mainTable: 'common/getProcessApprove/PmtReq',
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
        mainTable: 'common/getComment/PmtReq'
      })
    ];
    this.tableControls = [
      new ControlOption({ key: 'no', header: 'Mã chứng từ', type: 'text' }),
      new ControlOption({ key: 'employeeName', header: 'Người đề nghị', type: 'text', forApprove: true }),
      new ControlOption({ key: 'sendDate', header: 'Ngày lập DNTT', type: 'date' }),
      new ControlOption({ key: 'description', header: 'Diễn giải', type: 'text' }),
      new ControlOption({ key: 'nccName', header: 'Nhà cung cấp', type: 'text' }),
      new ControlOption({ key: 'customerName', header: 'Khách hàng', type: 'text' }),
      new ControlOption({ key: 'payEmployeeName', header: 'Nhân viên', type: 'text' }),
      new ControlOption({ key: 'summaryF', header: 'Tổng tiền (NT)', type: 'number' }),
      new ControlOption({ key: 'summary', header: 'Tổng tiền (VND)', type: 'number' }),
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip' })
    ];
    this.detailControls = [
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip-disabled' }),
      new ControlOption({ key: 'no', header: 'Mã chứng từ', type: 'text' }),
      new ControlOption({ key: 'sendDate', header: 'Ngày lập DNTT', type: 'date' }),
      new ControlOption({ key: 'employeeName', header: 'Người đề nghị', type: 'text' }),
      new ControlOption({ key: 'description', header: 'Diễn giải', type: 'text' }),
    ];
  }
}

export default PaymentOrderEntity;
