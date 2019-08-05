const { getUsers, getOneUser } = require('../helpers/requests');
const { downloadFileAndSave, deleteAvatar } = require('../helpers/fileSystem');

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getUsers();
    const { data } = JSON.parse(allUsers.body);
    res.status(200).json({users: data})
  } catch (e) {
    res.status(400).json({message: e || 'Can\'t find users'})
  }
}
const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getOneUser(userId);
    const { data } = JSON.parse(user.body);
    res.status(200).json({user: data});
  } catch (e) {
    res.status(400).json({message: e || 'Can\'t find users'})
  }
};

const getUserAvatar = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getOneUser(userId);
    const { data } = JSON.parse(user.body);
    const fileInformation = await downloadFileAndSave(data.avatar, userId);
    res.status(200).json({fileInformation});
  } catch (e) {
    res.status(400).json({message: e || 'Can\'t find users'})
  }
};

const deleteUserAvatar = async (req, res) => {
  const { userId } = req.params;
  try {
    const fileInformation = await deleteAvatar(userId);
    res.status(200).json({message: 'file deleted successfully'});
  } catch (e) {
    res.status(400).json({message: e || 'Can\'t find users'})
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getUserAvatar,
  deleteUserAvatar,
}
