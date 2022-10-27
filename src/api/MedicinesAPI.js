import Base from './Base';

export default class Auth extends Base {
  medicines = async data => {
    return this.sendRequest({
      path: `/api/Product`,
      method: 'GET',
    });
  };

  types = async data => {
    return this.sendRequest({
      path: `/api/ProductFormat`,
      method: 'GET',
    });
  };


  createMedicine = async data => {
    return this.sendRequest({
      path: `/api/Product`,
      method: 'POST',
      data,
    });
  };

  updateMedicine = async (id, data) => {
    return this.sendRequest({
      path: `/api/Product/${id}`,
      method: 'PUT',
      data,
    });
  };

  deleteMedicine = async (id) => {
    return this.sendRequest({
      path: `/api/Product/${id}`,
      method: 'DELETE'
    })
  }
}
