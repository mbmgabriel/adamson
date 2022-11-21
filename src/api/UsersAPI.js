import Base from './Base';

export default class Auth extends Base {
  users = async data => {
    return this.sendRequest({
      path: `/api/User`,
      method: 'GET',
    });
  };

  userregister = async data => {
    return this.sendRequest({
      path: `/api/User/register`,
      method: 'POST',
      data,
    });
  };

  userfile = async (id) => {
    return this.sendRequest({
      path: `/api/User/${id}/file`,
      method: 'GET',
    });
  };

  createUser = async data => {
    return this.sendRequest({
      path: `/api/User`,
      method: 'POST',
      data,
    });
  };

  updateUser = async (id, data) => {
    return this.sendRequest({
      path: `/api/User/${id}`,
      method: 'PUT',
      data,
    });
  };

  deleteUser = async (id) => {
    return this.sendRequest({
      path: `/api/User/${id}`,
      method: 'DELETE'
    })
  }

  uploadFile = async (id, data) => {
    return this.sendRequest({
      path: `/api/User/${id}/file/upload`,
      method: 'POST',
      data,
    })
  }

  uploadSignature = async (id, data) => {
    return this.sendRequest({
      path: `/api/User/${id}/file/upload/signature`,
      method: 'POST',
      data,
    })
  }

  uploadPRC = async (id, data) => {
    return this.sendRequest({
      path: `/api/User/${id}/file/upload/id`,
      method: 'POST',
      data,
    })
  }

  uploadPic = async (id, data) => {
    return this.sendRequest({
      path: `/api/User/${id}/file/upload/profilepic`,
      method: 'POST',
      data,
    })
  }

  
}
