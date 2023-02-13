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

  createFormat = async data => {
    return this.sendRequest({
      path: `/api/ProductFormat`,
      method: 'POST',
      data,
    });
  };

  updateFormat = async (id, data) => {
    return this.sendRequest({
      path: `/api/ProductFormat/${id}`,
      method: 'PUT',
      data,
    });
  };

  deleteFormat = async (id) => {
    return this.sendRequest({
      path: `/api/ProductFormat/${id}`,
      method: 'DELETE'
    })
  }


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
