
const { CronJob } = require('cron');

const { getUsersByPage } = require('./requests');
const { changeUsersInFile } = require('./fileSystem');
const getUsers = new CronJob({
  // cronTime: '* 01 * * * *',
  cronTime: '0 * * * * *',
  async onTick() {
    try {
      const users = await getUsersByPage(1);
      const {data} = JSON.parse(users.body);
      await changeUsersInFile(data)
    } catch (error) {
      console.error(error);
    }
  },
  start: false,
  timeZone: 'Europe/Kiev',
});
getUsers.start();
