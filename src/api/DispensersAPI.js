import Base from './Base';

export default class Auth extends Base {
  dispensers = async data => {
    return this.sendRequest({
      path: `/api/Store`,
      method: 'GET',
    });
  };

  getDispense = async data => {
    return this.sendRequest({
      path: `/api/Prescription/trackingno/${data}`,
      method: 'GET',
    });
  };

  getDispensed = async id => {
    return this.sendRequest({
      path: `/api/Store/${id}/product/disperse`,
      method: 'GET',
    });
  };

  createDispense = async data => {
    return this.sendRequest({
      path: `/api/Prescription/trackingno/${data}/dispense`,
      method: 'POST',
      data,
    });
  };

  

  createDispenser = async data => {
    return this.sendRequest({
      path: `/api/Store`,
      method: 'POST',
      data,
    });
  };

  updateDispenser = async (id, data) => {
    return this.sendRequest({
      path: `/api/Store/${id}`,
      method: 'PUT',
      data,
    });
  };

  deleteDispenser = async (id) => {
    return this.sendRequest({
      path: `/api/Store/${id}`,
      method: 'DELETE'
    })
  }

  
}
