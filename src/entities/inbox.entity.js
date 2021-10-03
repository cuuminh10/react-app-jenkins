import { PAGE_TYPE } from 'src/constants';
import BaseEntity from './base.entity';
import ControlOption from './control-option';
import LeaveEntity from './leave.entity';
import OvertimeEntity from './overtime.entity';
import WorkingScheduleEntity from './working-schedule.entity';
import PurchaseRequestEntity from './purchase-request.entity';
import PurchaseOrderEntity from './purchase-order.entity';
import PaymentOrderEntity from './payment-order.entity';
import SaleOrderEntity from './sale-order.entity';

class InboxEntity extends BaseEntity {
  constructor() {
    super();
    this.mainTable = 'mailBox/inbox';
    this.mainDetail = 'mailBox/detail';
    this.mainType = '';
    this.path = 'inbox';
    this.navTitle = 'inbox';
    this.tableControls = [
      new ControlOption({ key: 'employeeName', header: 'Từ', type: 'text' }),
      new ControlOption({ key: 'subject', header: 'Chủ đề', type: 'text' }),
      new ControlOption({ key: 'protocol', header: 'Phương thức', type: 'select' }),
      new ControlOption({ key: 'docType', header: 'Loại phiếu', type: 'select' }),
      new ControlOption({ key: 'objectNo', header: 'Mã phiếu', type: 'text' }),
      new ControlOption({ key: 'content', header: 'Nội dung', type: 'text' }),
      new ControlOption({ key: 'reciveDate', header: 'Ngày tạo', type: 'dateTime' }),
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip', isShow: false })
    ];
    this.mailControls = [
      new LeaveEntity(),
      new OvertimeEntity(),
      new WorkingScheduleEntity(),
      new PurchaseRequestEntity(),
      new PurchaseOrderEntity(),
      new PaymentOrderEntity(),
      new SaleOrderEntity()
    ];
  }
}

export default InboxEntity;
