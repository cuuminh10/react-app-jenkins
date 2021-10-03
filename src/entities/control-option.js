class ControlOption {
  constructor({ key, header = '', type = 'text', grid = 12, forApprove = false, transform, isShow = true, autoFillFrom, required }) {
    this.key = key;
    this.header = header;
    this.type = type;
    this.grid = grid;
    this.forApprove = forApprove;
    this.transform = transform;
    this.isShow = isShow;
    this.autoFillFrom = autoFillFrom;
    this.required = required;
  }

  get foreignKey() {
    return /^fk_/.test(this.key);
  }

  get foreignName() {
    return this.foreignKey ? this.key.replace('fk_', '').split('_').shift() : '';
  }

  get dependentKey() {
    if (this.foreignKey) {
      const [fk,, dependent] = this.key.split('_');
      return dependent ? `${fk}_${dependent}` : '';
    }
    return '';
  }

  get localKey() {
    return /^lc_/.test(this.key);
  }

  get localName() {
    return this.localKey ? this.key.replace('lc_', '') : '';
  }

  get typeControl() {
    const [main, sub, option] = this.type.split('-');
    return { main, sub, option };
  }
}

export default ControlOption;
