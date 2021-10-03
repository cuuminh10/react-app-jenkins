import BaseEntity from './base.entity';
import ControlOption from './control-option';

class ExampleEntity extends BaseEntity {
  constructor() {
    super();
    this.path = 'example';
    this.navTitle = 'Example';
    this.mainTable = 'example';
    this.subTables = ['exampleInfo', 'exampleNotify'];
    this.tableControls = [
      new ControlOption('no', 'No', 'text', 12, true),
      new ControlOption('subject', 'Subject', 'input', 6, true),
      new ControlOption('description', 'Description', 'input', 6, true),
      new ControlOption('createDate', 'Create Date', 'date', 6, true),
      new ControlOption('fk_statusId', 'Status', 'select', 6, true),
      new ControlOption('fk_locationId', 'Location', 'select', 12, true),
      new ControlOption('isPublic', 'Make public', 'checkbox', 6, false)
    ];
    this.detailControls = [
      new ControlOption('no', 'No', 'text', 12),
      new ControlOption('subject', 'Subject', 'text', 12),
      new ControlOption('description', 'Description', 'text', 12),
      new ControlOption('createDate', 'Create Date', 'text', 12),
      new ControlOption('fk_statusId', 'Status', 'text', 12),
      new ControlOption('fk_locationId', 'Location', 'text', 12),
      new ControlOption('isPublic', 'Make public', 'text', 12)
    ];
  }
}

export default ExampleEntity;
