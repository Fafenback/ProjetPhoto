const dynamoose = require('dynamoose');
const UsersModel = require('../models/Users');
const { apiRes } = require('../lib/apiResponse');

class Users {
  constructor() {
    this.Users = UsersModel;
  }

  /**
   * @api {post} users/create Create
   * @apiName Create User
   * @apiGroup Users
   *
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   * @apiSuccess {String} pseudo  Psuedo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {Boolean} isAdmin   Admin or classic user.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":{
   *        "firstname": "John",
   *        "lastname": "Doe",
   *        "createdAt": "2019-03-09T17:10:39.475Z"
   *        "updatedAt": "2019-03-09T17:10:39.475Z",
   *        "fullname": "John_Doe",
   *        "isAdmin": false,
   *        "likes": 2,
   *        "lastname": "Bob",
   *        "userId": "21781907-ed6a-4594-9239-35561a352b62",
   *      }
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "User not created",
   *        "success": false
   *     }
   */
  async setNewUser(req, res, next) {
    const { body } = req;

    try {
      // create user
      const newUser = new this.Users(body);

      // set user fullname (<firstName_lastName> to lowercase)
      newUser.setFullName();

      // Put user in dynamodb table
      await newUser.save();

      // const users = await this.Users.scan().all().exec();
      res.status(200).json(apiRes.success(newUser));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  /**
   * @api {post} users/get/:name  Get
   * @apiName GetUser
   * @apiGroup Users
   *
   * @apiParam {String} pseudo  Pseudo of the User.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   * @apiSuccess {String} pseudo  Psuedo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {Boolean} isAdmin   Admin or classic user.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":{
   *        "firstname": "John",
   *        "lastname": "Doe",
   *        "createdAt": "2019-03-09T17:10:39.475Z"
   *        "updatedAt": "2019-03-09T17:10:39.475Z",
   *        "fullname": "John_Doe",
   *        "isAdmin": false,
   *        "likes": 2,
   *        "lastname": "Bob",
   *        "userId": "21781907-ed6a-4594-9239-35561a352b62",
   *      }
   *    }
   *
   * @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "UserNotFound",
   *        "success": false
   *     }
   */
  async getUser(req, res, next) {
    try {
      const { name } = req.params;
      if (!name) {
        throw new Error('Missing params id in request');
      }
      const user = await this.Users.query('pseudo').eq(name).exec();
      res.status(200).json(apiRes.success(user));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }


  /**
   * @api {post} users/update/:name Update
   * @apiName Update User
   * @apiGroup Users
   *
   *
   * @apiParam {String} pseudo  Pseudo of the User.
   *
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   * @apiSuccess {String} pseudo  Psuedo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {Boolean} isAdmin   Admin or classic user.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":{
   *        "firstname": "John",
   *        "lastname": "Doe",
   *        "createdAt": "2019-03-09T17:10:39.475Z"
   *        "updatedAt": "2019-03-09T17:10:39.475Z",
   *        "fullname": "John_Doe",
   *        "isAdmin": false,
   *        "likes": 2,
   *        "lastname": "Bob",
   *        "userId": "21781907-ed6a-4594-9239-35561a352b62",
   *      }
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "User not updated",
   *        "success": false
   *     }
   */
  async updateUser(req, res, next) {
    try {
      const { params, body } = req.params;
      if (!params.name) {
        throw new Error('Missing params id in request');
      }
      const user = await this.Users.query('pseudo').eq(params.name).exec();
      const updatedUser = await this.Users.update(user, body, { returnValues: 'ALL_NEW' });

      res.status(200).json(apiRes.success(updatedUser));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  /**
   * @api {post} users/all Get All
   * @apiName GetAll Users
   * @apiGroup Users
   *
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   * @apiSuccess {String} pseudo  Psuedo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {Boolean} isAdmin   Admin or classic user.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":[
   *        {
   *          "firstname": "John",
   *          "lastname": "Doe",
   *          "createdAt": "2019-03-09T17:10:39.475Z"
   *          "updatedAt": "2019-03-09T17:10:39.475Z",
   *          "fullname": "John_Doe",
   *          "isAdmin": false,
   *          "likes": 2,
   *          "lastname": "Bob",
   *          "userId": "21781907-ed6a-4594-9239-35561a352b62",
   *        },
   *        {
   *          "firstname": "John",
   *          "lastname": "Doe",
   *          "createdAt": "2019-03-09T17:10:39.475Z"
   *          "updatedAt": "2019-03-09T17:10:39.475Z",
   *          "fullname": "John_Doe",
   *          "isAdmin": false,
   *          "likes": 2,
   *          "lastname": "Bob",
   *          "userId": "21781907-ed6a-4594-9239-35561a352b62",
   *        }
   *      ]
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "Could not return users",
   *        "success": false
   *     }
   */
  async getAllUsers(req, res, next) {
    try {
      const users = await this.Users.scan().all().exec();
      res.status(200).json(apiRes.success(users));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  /**
   * @api {post} users/delete/:name Delete
   * @apiName Delete User
   * @apiGroup Users
   *
   *
   * @apiParam {String} pseudo  Pseudo of the User.
   *
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   * @apiSuccess {String} pseudo  Psuedo of the User.
   * @apiSuccess {Number} likes  Number of the Likes.
   * @apiSuccess {Boolean} isAdmin   Admin or classic user.
   * @apiSuccess {String} updatedAt  Last update date.
   * @apiSuccess {String} createdAt  Created date.
   * @apiSuccess {String} userId  User unique key.
   * * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *    {
   *      "success": true,
   *      "data":{
   *        "firstname": "John",
   *        "lastname": "Doe",
   *        "createdAt": "2019-03-09T17:10:39.475Z"
   *        "updatedAt": "2019-03-09T17:10:39.475Z",
   *        "fullname": "John_Doe",
   *        "isAdmin": false,
   *        "likes": 2,
   *        "lastname": "Bob",
   *        "userId": "21781907-ed6a-4594-9239-35561a352b62",
   *      }
   *    }
   *
   *    @apiErrorExample {json} Error-Response:
   *      HTTP/1.1 200 OK
   *      HTTP/1.1 401 Not Authorized
   *      HTTP/1.1 500 Internal error
   *     {
   *        "error": "User not deleted",
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

module.exports = Users;
