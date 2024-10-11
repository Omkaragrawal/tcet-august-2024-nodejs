import express, { Response } from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(_, res: Response) {
  res.render('index', { title1: 'WORKSHOP' });
});


export default router;
