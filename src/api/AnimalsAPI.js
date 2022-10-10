import Base from './Base';

export default class Auth extends Base {
  animals = async data => {
    return this.sendRequest({
      path: `/api/PetType`,
      method: 'GET',
    });
  };

  createAnimal = async data => {
    return this.sendRequest({
      path: `/api/PetType`,
      method: 'POST',
      data,
    });
  };

  updateAnimal = async (id, data) => {
    return this.sendRequest({
      path: `/api/PetType/${id}`,
      method: 'PUT',
      data,
    });
  };

  deleteAnimal = async (id) => {
    return this.sendRequest({
      path: `/api/PetType/${id}`,
      method: 'DELETE'
    })
  }
}
