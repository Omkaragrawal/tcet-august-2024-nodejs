import express, { Request, Response } from 'express';

import { middleWareWrapper } from '../tools';

const router = express.Router();
import UserModel from '../Database/model/user';


/* GET users listing. */
router.get('/', middleWareWrapper( async function(_: Request, res: Response) {
  await setTimeout(function() {});
  res.send('respond with a resource');
}));

router.get('/omkaragrawal', middleWareWrapper(function(_: Request, response: Response) {
  response.render('omkaragrawal', { userName: 'Omkar Agrawal'});
}));

/**
 * Data to be consumed: https://jsonplaceholder.typicode.com/users
 * Our URL: http://localhost:3333/users/all-users
 */

router.get('/all-users', middleWareWrapper(async function(_: Request, response: Response) {
  const userData = await UserModel.find();

  response.render('all-users', { data: userData });
}));

/**
 * http://localhost:3334/users/find/Karianne
 */
router.get('/find/:userName', middleWareWrapper(async function (req: Request, res: Response) {
  const userData = await UserModel.findOne({ username: req.params.userName });

  if (!userData) {
    throw Error('No user Found');
  }

    res.render('user', userData);
}));

/** 
 * http://localhost:3334/users/search/?city=
 */
router.get('/search', middleWareWrapper(async function (req: Request, res: Response) {
  const userData = await UserModel.findOne({ 'address.city': req.query.city, });

  if (!userData) {
    throw Error('No user Found');
  }

  res.send(userData);
}));

router.post('/new', middleWareWrapper(async function(req: Request, res: Response) {
  const newUserData = req.body;

  if (typeof newUserData === 'object') {
    const [newUser] = await UserModel.insertMany([newUserData]);

    if (!newUser) {
      res.json({});
    }

    res.render('user', newUser);
  } else {
    res.json({});
  }

}));

router.get('/refresh-data', middleWareWrapper(async (_: Request, res: Response) => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users');
  let allUserData = await data.json();

  await UserModel.deleteMany({
    name: '*',
  });

  const insertData = await UserModel.insertMany(allUserData);

  res.send(insertData);
}));
/**
https://github.com/Omkaragrawal/tcet-august-2024-nodejs
 */
export default router;