import dbClient from '../utils/db';
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';

const userQueue = new Queue('email sending');

export default class UsersController {
  static async postNew(requ, resp) {
    const email = requ.body ? requ.body.email : null;
    const password = requ.body ? requ.body.password : null;

    if (!email) {
      resp.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      resp.status(400).json({ error: 'Missing password' });
      return;
    }
    const user = await (await dbClient.usersCollection()).findOne({ email });

    if (user) {
      resp.status(400).json({ error: 'Already exist' });
      return;
    }
    const insertionInfo = await (await dbClient.usersCollection())
      .insertOne({ email, password: sha1(password) });
    const uId = insertionInfo.insertedId.toString();

    userQueue.add({ uId });
    res.status(201).json({ email, id: uId });
  }

  static async getMe(requ, resp) {
    const { user } = requ;

    resp.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
