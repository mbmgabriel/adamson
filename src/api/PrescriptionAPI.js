import Base from './Base';

export default class Auth extends Base {
  prescriptions = async data => {
    return this.sendRequest({
      path: `/api/Prescription`,
      method: 'GET',
    });
  };

  createPrescriptions = async data => {
    return this.sendRequest({
      path: `/api/Prescription`,
      method: 'POST',
      data,
    });
  };

  updateDispenser = async (id, data) => {
    return this.sendRequest({
      path: `/api/Prescription/${id}`,
      method: 'PUT',
      data,
    });
  };

  deleteDispenser = async (id) => {
    return this.sendRequest({
      path: `/api/Prescription/${id}`,
      method: 'DELETE'
    })
  }
}
