import * as dotenv from 'dotenv';
import { Client } from 'node-scp';

dotenv.config();

const USERNAME = process.env.SSH_USERNAME;
const PASSWORD = process.env.SSH_PASSWORD;
const HOST_OR_IP_ADDRESS = process.env.SSH_HOSTNAME;
const PORT = 22;
const REMOTE_FOLDER_NAME = 'react-dashboard'; // the folder name you want to copy the files to
const LOCAL_DIRECTORY = './dist'; // the pathname to your output files from your react project.

const REMOTE_PATH = `/config/www/${REMOTE_FOLDER_NAME}`;

async function deploy() {
  try {
    const client = await Client({
      host: HOST_OR_IP_ADDRESS,
      port: PORT,
      username: USERNAME,
      password: PASSWORD,
      // if you have extra security, here's how you can use the privateKey / passphrase
      // privateKey: fs.readFileSync('./key.pem'),
      // passphrase: 'your key passphrase',
    });
    // empty the directory initially so we remove anything that doesn't need to be there
    try {
      await client.rmdir(REMOTE_PATH);
    } catch (e) {
      // directory may not exist, ignore
    }
    // upload the folder to your home assistant server
    await client.uploadDir(LOCAL_DIRECTORY, REMOTE_PATH);
    client.close(); // remember to close connection after you finish
    console.log('Successfully deployed!');
  } catch (e) {
    console.log('Error:', e.message);
  }
}

deploy();
