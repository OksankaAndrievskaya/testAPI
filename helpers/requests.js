// const request = require('request');
let request = require('async-request'),
  response;

const getUsers = async () => {
  try {
    const users = await request('https://reqres.in/api/users', {
      method: 'GET',
    });
    return users;
  } catch (e) {
    throw e;
  }
};

const getOneUser = async (userId) => {
  try {
    const user = await request(`https://reqres.in/api/users/${userId}`, {
      method: 'GET',
    });
    return user;
  } catch (e) {
    throw e;
  }
};

const getUsersByPage = async (page) => {
  try {
    const users = await request(`https://reqres.in/api/users?page=${page}`, {
      method: 'GET',
    });
    return users;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  getUsers,
  getOneUser,
  getUsersByPage
}
