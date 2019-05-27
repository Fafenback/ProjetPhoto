const PicturesModel = require('../models/Pictures');
const { apiRes } = require('../lib/apiResponse');

class Pictures {
  constructor() {
    this.Pictures = PicturesModel;
  }

  /**
   * @api {post} pictures/create Create
   * @apiName Create Picture
   * @apiGroup Pictures
   *
   * @apiParam {String} pseudo  Pseudo of the User.
   * @apiParam {String} title   Title.
   * @apiParam {String} comment   My comment.
   *
   * @apiSuccess {String} link Link Resized picture .
   * @apiSuccess {String} downloadLink  original Picture.
   * @apiSuccess {String} pseudo  Pseudo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {String} title   Title.
   * @apiSuccess {String} comment   My comment.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * @apiSuccess {String} pictureId  Picture unique key.
   * @apiSuccess {String} fullname Fullname of the User.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":{
   *        "pseudo": "Bobby",
   *        "comment": "Champ Battle",
   *        "createdAt": "2019-03-09T17:10:39.475Z"
   *        "updatedAt": "2019-03-09T17:10:39.475Z",
   *        "fullname": "John_Doe",
   *        "title": "Fiesta",
   *        "likes": 2,
   *        "link": "http://storage/images/XXXXX.png",
   *        "downloadLink": "http://storage/images/resizes/XXXXX.png",
   *        "pictureId": "21781907-ed6a-4594-9239-35561a352b62",
   *        "userId": "21781907-ed7a-4594-9239-89061a352b62",
   *      }
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "Picture not created",
   *        "success": false
   *     }
   */
  async setNewPicture(req, res, next) {
    const { body } = req;

    try {
      // create a picture
      const newUser = new this.Pictures(body);

      // Put picture in dynamodb table
      await newUser.save();

      // const users = await this.Users.scan().all().exec();
      res.status(200).json(apiRes.success(newUser));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  /**
   * @api {post} pictures/get/:id Get
   * @apiName Get Picture
   * @apiGroup Pictures
   *
   * @apiParam {String} pictureId  Picture unique key.
   *
   * @apiSuccess {String} link Link Resized picture .
   * @apiSuccess {String} downloadLink  original Picture.
   * @apiSuccess {String} pseudo  Pseudo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {String} title   Title.
   * @apiSuccess {String} comment   My comment.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * @apiSuccess {String} pictureId  Picture unique key.
   * @apiSuccess {String} fullname Fullname of the User.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":{
   *        "pseudo": "Bobby",
   *        "comment": "Champ Battle",
   *        "createdAt": "2019-03-09T17:10:39.475Z"
   *        "updatedAt": "2019-03-09T17:10:39.475Z",
   *        "fullname": "John_Doe",
   *        "title": "Fiesta",
   *        "likes": 2,
   *        "link": "http://storage/images/XXXXX.png",
   *        "downloadLink": "http://storage/images/resizes/XXXXX.png",
   *        "pictureId": "21781907-ed6a-4594-9239-35561a352b62",
   *        "userId": "21781907-ed7a-4594-9239-89061a352b62",
   *      }
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "Picture not created",
   *        "success": false
   *     }
   */
  async getPicture(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Missing params id in request');
      }
      const picture = await this.Pictures.query('pictureId')
        .eq(id)
        .exec();
      res.status(200).json(apiRes.success(picture));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  /**
   * @api {post} pictures/update/:id Update
   * @apiName Update Picture
   * @apiGroup Pictures
   *
   * @apiParam {String} pictureId  Picture unique key.
   *
   * @apiSuccess {String} link Link Resized picture .
   * @apiSuccess {String} downloadLink  original Picture.
   * @apiSuccess {String} pseudo  Pseudo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {String} title   Title.
   * @apiSuccess {String} comment   My comment.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * @apiSuccess {String} pictureId  Picture unique key.
   * @apiSuccess {String} fullname Fullname of the User.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":{
   *        "pseudo": "Bobby",
   *        "comment": "Champ Battle",
   *        "createdAt": "2019-03-09T17:10:39.475Z"
   *        "updatedAt": "2019-03-09T17:10:39.475Z",
   *        "fullname": "John_Doe",
   *        "title": "Fiesta",
   *        "likes": 2,
   *        "link": "http://storage/images/XXXXX.png",
   *        "downloadLink": "http://storage/images/resizes/XXXXX.png",
   *        "pictureId": "21781907-ed6a-4594-9239-35561a352b62",
   *        "userId": "21781907-ed7a-4594-9239-89061a352b62",
   *      }
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "Picture not updated",
   *        "success": false
   *     }
   */
  async updatePicture(req, res, next) {
    try {
      const { params, body } = req.params;
      if (!params.id) {
        throw new Error('Missing params id in request');
      }
      const picture = await this.Pictures.query('pictureId')
        .eq(params.id)
        .exec();
      const updatedPicture = await this.Pictures.update(picture, body, { returnValues: 'ALL_NEW' });

      res.status(200).json(apiRes.success(updatedPicture));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  /**
   * @api {post} pictures/all Get All
   * @apiName GetAll Pictures
   * @apiGroup Pictures
   *
   *
   * @apiSuccess {String} link Link Resized picture .
   * @apiSuccess {String} downloadLink  original Picture.
   * @apiSuccess {String} pseudo  Pseudo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {String} title   Title.
   * @apiSuccess {String} comment   My comment.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * @apiSuccess {String} pictureId  Picture unique key.
   * @apiSuccess {String} fullname Fullname of the User.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":[
   *        {
   *          "pseudo": "Bobby",
   *          "comment": "Champ Battle",
   *          "createdAt": "2019-03-09T17:10:39.475Z"
   *          "updatedAt": "2019-03-09T17:10:39.475Z",
   *          "fullname": "John_Doe",
   *          "title": "Fiesta",
   *          "likes": 2,
   *          "link": "http://storage/images/XXXXX.png",
   *          "downloadLink": "http://storage/images/resizes/XXXXX.png",
   *          "pictureId": "21781907-ed6a-4594-9239-35561a352b62",
   *          "userId": "21781907-ed7a-4594-9239-89061a352b62",
   *        },
   *        {
   *          "pseudo": "Bobby",
   *          "comment": "Champ Battle",
   *          "createdAt": "2019-03-09T17:10:39.475Z"
   *          "updatedAt": "2019-03-09T17:10:39.475Z",
   *          "fullname": "John_Doe",
   *          "title": "Fiesta",
   *          "likes": 2,
   *          "link": "http://storage/images/XXXXX.png",
   *          "downloadLink": "http://storage/images/resizes/XXXXX.png",
   *          "pictureId": "21781907-ed6a-4594-9239-35561a352b62",
   *          "userId": "21781907-ed7a-4594-9239-89061a352b62",
   *        }
   *      ]
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "Could not return pictures",
   *        "success": false
   *     }
   */
  async getAllPictures(req, res, next) {
    try {
      const pictures = await this.Pictures.scan()
        .all()
        .exec();
      res.status(200).json(apiRes.success(pictures));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  /**
   * @api {post} pictures/delete/:id Delete
   * @apiName Delete Picture
   * @apiGroup Pictures
   *
   * @apiParam {String} pictureId  Picture unique key.
   *
   * @apiSuccess {String} link Link Resized picture .
   * @apiSuccess {String} downloadLink  original Picture.
   * @apiSuccess {String} pseudo  Pseudo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {String} title   Title.
   * @apiSuccess {String} comment   My comment.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * @apiSuccess {String} pictureId  Picture unique key.
   * @apiSuccess {String} fullname Fullname of the User.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":{
   *        "pseudo": "Bobby",
   *        "comment": "Champ Battle",
   *        "createdAt": "2019-03-09T17:10:39.475Z"
   *        "updatedAt": "2019-03-09T17:10:39.475Z",
   *        "fullname": "John_Doe",
   *        "title": "Fiesta",
   *        "likes": 2,
   *        "link": "http://storage/images/XXXXX.png",
   *        "downloadLink": "http://storage/images/resizes/XXXXX.png",
   *        "pictureId": "21781907-ed6a-4594-9239-35561a352b62",
   *        "userId": "21781907-ed7a-4594-9239-89061a352b62",
   *      }
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "Picture not deleted",
   *        "success": false
   *     }
   */
  async deleteUser(req, res, next) {
    try {
      const { name } = req.params;
      if (!name) {
        throw new Error('Missing params id in request');
      }
      const user = await this.Users.delete({ pseudo: name }, { update: true });
      res.status(200).json(apiRes.success(user));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }
}

module.exports = Pictures;
