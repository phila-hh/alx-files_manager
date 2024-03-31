import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController {
  static async getConnect(requ, resp) {
    const { user } = requ;
    const token = uuidv4();

    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    resp.status(200).json({ token });
  }

  static async getDisconnect(requ, resp) {
    const token = requ.headers['x-token'];

    await redisClient.del(`auth_${token}`);
    resp.status(204).send();
  }
}
