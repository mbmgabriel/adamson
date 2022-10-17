import Base from './Base';

export default class Auth extends Base {
  patients = async data => {
    return this.sendRequest({
      path: `/api/Patient`,
      method: 'GET',
    });
  };

  createPatient = async data => {
    return this.sendRequest({
      path: `/api/Patient`,
      method: 'POST',
      data,
    });
  };

}
