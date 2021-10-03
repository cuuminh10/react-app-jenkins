import BaseEntity from './base.entity';

class SubTableEntity extends BaseEntity {
  constructor({ type = 'table', navTitle, mainTable, tableControls = [], summaries = [], summaryColSpan, formatDataFunc }) {
    super();
    this.type = type;
    this.navTitle = navTitle;
    this.mainTable = mainTable;
    this.tableControls = tableControls;
    this.summaries = summaries;
    this.summaryColSpan = summaryColSpan;
    this.formatDataFunc = formatDataFunc;
  }
}

export default SubTableEntity;
