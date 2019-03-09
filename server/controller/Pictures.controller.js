const PicturesModel = require('../models/Pictures');
const { apiRes } = require('../lib/apiResponse');

class Pictures {
  constructor() {
    this.Users = PicturesModel;
  }

  async setNewPicture(req, res, next) {
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

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Missing params id in request');
      }
      const user = await this.Users.query('userId').eq(id).exec();
      res.status(200).json(apiRes.success(user));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  async updateUser(req, res, next) {
    try {
      const { params, body } = req.params;
      if (!params.id) {
        throw new Error('Missing params id in request');
      }
      const user = await this.Users.query('userId').eq(params.id).exec();
      const updatedUser = await this.Users.update(user, body, { returnValues: 'ALL_NEW' });

      res.status(200).json(apiRes.success(updatedUser));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.Users.scan().all().exec();
      res.status(200).json(apiRes.success(users));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Missing params id in request');
      }
      const user = await this.Users.delete({ userId: id }, { update: true });
      res.status(200).json(apiRes.success(user));
    } catch (e) {
      res.status(400).json(apiRes.failed(e.message));
    }
  }
}

module.exports = Pictures;
