import chalk from 'chalk';
import getIpAddress from 'utils/getIpAddress';
import app from 'app';
import config from 'config/config.default';

const { APP_PORT } = config;

app.listen(APP_PORT, () => {
  console.log(chalk.green(`http://localhost:${APP_PORT}`));
  console.log(chalk.green(`http://${getIpAddress()}:${APP_PORT}`));
});
