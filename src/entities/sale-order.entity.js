import { PAGE_TYPE } from 'src/constants';
import BaseEntity from './base.entity';
import ControlOption from './control-option';
import SubTableEntity from './sub-table.entity';

class SaleOrderEntity extends BaseEntity {
  constructor() {
    super();
    this.mainTable = 'so';
    this.mainType = PAGE_TYPE.SALE_ORDER;
    this.path = 'sale-order';
    this.navTitle = 'sale order';
    this.subTables = [
      new SubTableEntity({
        navTitle: 'Chi tiết chứng từ',
        mainTable: 'so/detail',
        tableControls: [
          new ControlOption({ key: 'no', header: 'Mã sản phẩm', type: 'text' }),
          new ControlOption({ key: 'name', header: 'Tên sản phẩm', type: 'text' }),
          new ControlOption({ key: 'deliveryDate', header: 'Ngày giao', type: 'date' }),
          new ControlOption({ key: 'itemQty', header: 'Số lượng', type: 'number' }),
          new ControlOption({ key: 'units', header: 'Đơn vị tính', type: 'text' }),
          new ControlOption({ key: 'unitPriceF', header: 'Đơn giá (NT)', type: 'number' }),
          new ControlOption({ key: 'unitPrice', header: 'Đơn giá (VND)', type: 'number' }),
          new ControlOption({ key: 'priceF', header: 'Thành tiền (NT)', type: 'number' }),
          new ControlOption({ key: 'price', header: 'Thành tiền (VND)', type: 'number' }),
          new ControlOption({ key: 'taxPriceF', header: 'Tiền thuế (NT)', type: 'number' }),
          new ControlOption({ key: 'taxPrice', header: 'Tiền thuế (VND)', type: 'number' }),
          new ControlOption({ key: 'summaryF', header: 'Tổng cộng (NT)', type: 'number' }),
          new ControlOption({ key: 'summary', header: 'Tổng cộng (VND)', type: 'number' }),
        ],
        summaries: ['priceF', 'price', 'summaryF', 'summary'],
        summaryColSpan: 7
      }),
      new SubTableEntity({
        navTitle: 'Lịch sử phê duyệt',
        mainTable: 'common/getProcessApprove/SO',
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
        mainTable: 'common/getComment/SO'
      })
    ];
    this.tableControls = [
      new ControlOption({ key: 'no', header: 'Mã chứng từ', type: 'text' }),
      new ControlOption({ key: 'employeeName', header: 'Người đề nghị', type: 'text', forApprove: true }),
      new ControlOption({ key: 'sendDate', header: 'Ngày tạo', type: 'date' }),
      new ControlOption({ key: 'description', header: 'Diễn giải', type: 'text' }),
      new ControlOption({ key: 'summaryF', header: 'Tổng tiền (NT)', type: 'number' }),
      new ControlOption({ key: 'summary', header: 'Tổng tiền (VND)', type: 'number' }),
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip' })
    ];
    this.detailControls = [
      new ControlOption({ key: 'lc_status', header: 'Tình trạng', type: 'select-chip-disabled' }),
      new ControlOption({ key: 'no', header: 'Mã chứng từ', type: 'text' }),
      new ControlOption({ key: 'sendDate', header: 'Ngày lập', type: 'date' }),
      new ControlOption({ key: 'employeeName', header: 'Người đề nghị', type: 'text' }),
    ];
  }
}

export default SaleOrderEntity;
