import moment from 'moment';
import resources from 'src/resources';
import { cloneDeep as _cloneDeep } from 'lodash';
import GMCService from 'src/services/gmc.service';

class BaseEntity {
  constructor() {
    this.mainTable = '';
    this.subTables = [];
    this.dataTable = [];
    this.dataChart = {
      opens: 0,
      inprocess: 0,
      reject: 0,
      approved: 0
    };
    this.isModeApprove = false;
    this.optionEnum = {};
    this.tableControls = [];
    this.detailControls = [];
    this.mailControls = [];
    this.currentDetail = {};
  }

  async fetchDataTable(opts = {}, callback) {
    try {
      const res = await GMCService.getDataByUrl(this.mainTable, opts);
      const { status, data } = res;
      if (status === 200) {
        this.setDataTable(data.map((item) => (item.lc_status ? item : { ...item, lc_status: 'New' })));
        if (callback) {
          callback(this);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async fetchDataChart(type, callback) {
    try {
      const url = `chart/approve/${type}/${this.mainType}`;
      const res = await GMCService.getDataByUrl(url);
      const { status, data } = res;
      if (status === 200) {
        this.setDataChart(data);
        if (callback) {
          callback(this);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async sentApprove(callback) {
    try {
      const url = `common/sendApprove/${this.mainType}/${this.currentDetail.id}`;
      const res = await GMCService.getDataByUrl(url);
      const { status, data } = res;
      if (status === 200) {
        const index = this.dataTable.findIndex((item) => item.id === this.currentDetail.id);
        this.dataTable[index] = Object.assign(this.dataTable[index], data);
        if (callback) {
          callback(this);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async doApprove(callback) {
    const url = `common/approve/${this.mainType}`;
    const requestData = {
      status: 'Approved',
      objectId: this.currentDetail.id,
      approveStepID: this.currentDetail.procStepId,
      inboxId: this.currentDetail.inboxId
    };
    const res = await GMCService.postDataByUrl(url, requestData);
    const { status, data } = res;
    if (status === 200) {
      const index = this.dataTable.findIndex((item) => item.id === this.currentDetail.id);
      this.dataTable[index].lc_status = 'Approved';
      this.dataTable.splice(index, 1);
      if (callback) {
        callback(this);
      }
    }
  }

  async doReject(reasion, callback) {
    const url = `common/approve/${this.mainType}`;
    const requestData = {
      status: 'Rejected',
      objectId: this.currentDetail.id,
      approveStepID: this.currentDetail.procStepId,
      inboxId: this.currentDetail.inboxId,
      reasion
    };
    const res = await GMCService.postDataByUrl(url, requestData);
    const { status, data } = res;
    if (status === 200) {
      const index = this.dataTable.findIndex((item) => item.id === this.currentDetail.id);
      this.dataTable[index].lc_status = 'Rejected';
      this.dataTable.splice(index, 1);
      if (callback) {
        callback(this);
      }
    }
  }

  async doComment(comment, callback) {
    const url = `common/comment/${this.mainType}`;
    const requestData = {
      comment
    };
    if (this.isModeApprove) {
      requestData.inboxId = this.currentDetail.inboxId;
    } else {
      requestData.objectId = this.currentDetail.id;
    }
    const res = await GMCService.postDataByUrl(url, requestData);
    const { status, data } = res;
    if (status === 200) {
      if (callback) {
        callback(this);
      }
    }
  }

  fetchDataLocal() {
    this.localSelects.forEach((item) => {
      this.addOptionEnum({
        key: item.localName,
        value: resources[item.localName]
      });
    });
  }

  async fetchDataForeign(callBack) {
    try {
      this.foreignSelects.forEach(async (item) => {
        const res = await GMCService.getDataByUrl(`common/${item.foreignName}`);
        const { status, data } = res;
        if (data && (status === 200 || status === 201)) {
          this.addOptionEnum({
            key: item.foreignName,
            value: res.data.map((d) => ({ ...d, name: d.no }))
          });
          if (callBack) {
            callBack(this);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async fetchDataTabs(id, callback) {
    try {
      this.subTables.forEach(async (item, index) => {
        const res = await GMCService.getDataByUrl(`${item.mainTable}/${id}`);
        const { status, data } = res;
        if (data && (status === 200 || status === 201)) {
          this.subTables[index].dataTable = data;
          callback(this);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async init(callback) {
    this.fetchDataLocal();
    await this.fetchDataForeign();
    await this.fetchDataTable();
    callback(this);
  }

  async editDataTable(requestData, callback) {
    try {
      const url = `${this.mainTable}/${this.currentDetail.id}`;
      const res = await GMCService.putDataByUrl(url, requestData);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        const index = this.dataTable.findIndex((item) => item.id === this.currentDetail.id);
        this.dataTable[index] = Object.assign(this.dataTable[index], data, { lc_status: 'New' });
        if (callback) {
          callback(this);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addDataTable(requestData, callback) {
    try {
      const res = await GMCService.postDataByUrl(this.mainTable, requestData);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        this.dataTable.unshift(data);
        // setTableData(mappingData.dataTable);
        callback(this);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDataTable(url, callback) {
    try {
      const res = await GMCService.deleteDataByUrl(url);
      const { status } = res;
      // const { status, data } = res;
      if (status === 200 || status === 201) {
        const index = this.dataTable.findIndex((item) => item.id === 4);
        this.dataTable.splice(index, 1);
        callback(this);
      }
    } catch (error) {
      console.log(error);
    }
  }

  addOptionEnum(option) {
    this.optionEnum[option.key] = option.value;
  }

  get foreignSelects() {
    let selects = this.tableControls.filter((item) => item.foreignKey);
    if (this.mailControls.length) {
      this.mailControls.forEach((item) => {
        if (item.foreignSelects.length) {
          selects = [...selects, ...item.foreignSelects];
        }
      });
    }
    return selects;
  }

  get localSelects() {
    let selects = this.tableControls.filter((item) => item.localKey);
    if (this.mailControls.length) {
      this.mailControls.forEach((item) => {
        const index = selects.find((select) => item.key === select.key);
        if (item.localSelects.length && !index) {
          selects = [...selects, ...item.localSelects];
        }
      });
    }
    return selects;
  }

  get textTableKeys() {
    return this.tableControls.filter((item) => item.typeControl.main === 'text').map((item) => item.key);
  }

  get emptyCurrentDetail() {
    const current = {};
    this.detailControls.forEach((item) => {
      if (item.type === 'checkbox') {
        current[item.key] = false;
      } else if (item.key === 'lc_status') {
        current[item.key] = 'New';
      } else if (item.type === 'date') {
        current[item.key] = moment(new Date()).toISOString();
      } else {
        current[item.key] = '';
      }
    });
    return current;
  }

  get primaryKey() {
    const control = this.tableControls.find((item) => item.primaryKey);
    return control ? control.key : 'id';
  }

  get keysAll() {
    return this.tableControls.map((item) => item.key);
  }

  get keys() {
    return this.keysAll.filter((item) => item.isShow);
  }

  get tableControlsObject() {
    const object = {};
    this.tableControls.forEach((item) => {
      object[item.key] = item;
    });
    return object;
  }

  get detailControlsObject() {
    const object = {};
    this.detailControls.forEach((item) => {
      object[item.key] = item;
    });
    return object;
  }

  getHeaders(isApprove) {
    const headersFilter = isApprove ? this.tableControls : this.tableControls.filter((item) => !item.forApprove);
    const headerShow = headersFilter.filter((item) => item.isShow);
    const headers = headerShow.map((item) => ({ id: item.key, label: item.header, typeControl: item.typeControl }));
    return headers;
  }

  get mappingCurrentDetail() {
    let controls = [];
    if (this.mailControls && this.mailControls.length) {
      const targetEntity = this.mailControls.find((item) => item.mainType === this.currentDetail.docType);
      controls = targetEntity ? targetEntity.tableControls : [];
      if (targetEntity) {
        const status = targetEntity.tableControls.find((item) => item.key === 'lc_status');
        const notStatus = targetEntity.tableControls.filter((item) => item.key !== 'lc_status');
        controls = [status, ...notStatus];
      }
    } else {
      controls = this.detailControls.length ? this.detailControls : this.tableControls;
    }
    return controls.map((item) => {
      const obj = { value: this.currentDetail[item.key] };
      if (item.typeControl.main === 'select') {
        const target = controls.find((control) => control.dependentKey === item.key);
        if (target) {
          obj.affectedKey = target.key;
        }
      }
      return Object.assign(_cloneDeep(item), obj);
    });
  }

  getControlByKey(key) {
    return this.tableControlsObject[key];
  }

  setDataTable(data) {
    this.dataTable = data;
  }

  setDataChart(data) {
    this.dataChart = data;
  }

  setModeApprove(data) {
    this.isModeApprove = data;
  }

  setValue(key, value) {
    const controlIndex = this.detailControls.findIndex((item) => item.key === key);
    this.tableControls[controlIndex] = { ...this.detailControls[controlIndex], value };
  }

  setCurrentDetail(object) {
    const target = this.dataTable.find((item) => item.id === object.id);
    this.currentDetail = this.preFormat(target || object);
    // this.currentDetailTemp = target || object;
  }

  preFormat(object) {
    const newObject = {};
    const controls = this.detailControls.length ? this.detailControlsObject : this.tableControlsObject;
    for (const [key, value] of Object.entries(object)) {
      const target = controls[key];
      if (target && target.transform) {
        const [fnStart, fnEnd, rate] = target.transform;
        newObject[key] = fnStart(value, rate);
      } else {
        newObject[key] = value;
      }
    }
    return newObject;
  }

  endFormat(object) {
    const newObject = {};
    const controls = this.detailControls.length ? this.detailControlsObject : this.tableControlsObject;
    for (const [key, value] of Object.entries(object)) {
      const target = controls[key];
      if (target && target.transform) {
        const [fnStart, fnEnd, rate] = target.transform;
        newObject[key] = fnEnd(value, rate);
      } else {
        newObject[key] = value;
      }
    }
    return newObject;
  }

  setValues(object) {
    for (const [key, value] of Object.entries(object)) {
      this.setValue(key, value);
    }
  }
}

export default BaseEntity;
