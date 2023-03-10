// CONTROLLER
import Users from '../model/user';

// get : http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: 'Data not found' });
    // res.status(200).json({ user: 'get request success' });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'error while fetching data' });
    res.end();
  }
  // res.status(200).json(users);
}

// get : http://localhost:3000/api/users/1
export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: 'user not selected' });
  } catch (error) {
    res.status(404).json({ error: 'cannot get the user' });
  }
}

// post : http://localhost:3000/api/users
export async function postUser(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: 'Form Data Not Provided' });
    Users.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// put : http://localhost:3000/api/users/1
export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    return res.status(404).json({ error: ' user not selected !' });
  } catch (error) {
    return res.status(404).json({ error: ' error while updating the data !' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json(user);
    }
    res.status(404).json({ error: 'User Not Selected !' });
  } catch (error) {
    return res.status(404).json({ error: 'failed to delete user' });
  }
}
