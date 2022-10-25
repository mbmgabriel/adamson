import Base from './Base';

export default class Auth extends Base {
  prescriptions = async data => {
    return this.sendRequest({
      path: `/api/Prescription`,
      method: 'GET',
    });
  };

  getPrescription = async (id) => {
    return this.sendRequest({
      path: `/api/Prescription/${id}`,
      method: 'GET',
    });
  };

  createPrescriptions = async (data) => {
    return this.sendRequest({
      path: `/api/Prescription`,
      method: 'POST',
      data,
    })
  };

  uploadHealthRecord = async (id, data) => {
    return this.sendRequest({
      path: `/api/Prescription/${id}/upload`,
      method: 'POST',
      data,
    });
  };

  getHealthRecord = async (id) => {
    return this.sendRequest({
      path: `/api/Prescription/${id}/upload`,
      method: 'GET',
    });
  };

  updatePrescriptions = async (id, data) => {
    return this.sendRequest({
      path: `/api/Prescription/${id}`,
      method: 'PUT',
      data,
    });
  };

  deletePrescriptions = async (id) => {
    return this.sendRequest({
      path: `/api/Prescription/${id}`,
      method: 'DELETE'
    })
  }
}
