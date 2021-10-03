import BaseEntity from './base.entity';
import ControlOption from './control-option';

class MemberEntity extends BaseEntity {
  constructor() {
    super();
    this.mainTable = 'members';
    this.title = 'Tăng ca';
    this.navTitle = 'Đăng ký tăng ca';
    this.subTables = ['membersInfo', 'membersNotify'];
    this.tableControls = [
      new ControlOption('id', 'ID', 'read', 12, true),
      new ControlOption('name', 'Name', 'input', 6, true),
      new ControlOption('fk_roleId', 'Role', 'select', 6, true),
      new ControlOption('description', 'Description', 'input', 12, true)
    ];
  }
}

export default MemberEntity;
