const orderModel = require("../model/order.model");

const response = require("../helper/response.helper");
const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const orderController = {
  insertOrder: async (req, res, next) => {
    try {
      const id = uuid();
      const { id: bid } = req.decoded;
      const { cid, total, payment } = req.body;

      const data = {
        id,
        cid,
        bid,
        total,
        payment,
      };

      await orderModel.insertOrder(data);

      // delete cart

      const {
        rows: [order],
      } = await orderModel.getOrderDetail(id);

      response(res, order, 200, "Insert Order success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getOrder: async (req, res, next) => {
    try {
      const { id } = req.decoded;

      const { rows: order } = await orderModel.getOrder(id);

      response(res, order, 200, "Get Order success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  getOrderDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [order],
      } = await orderModel.getOrderDetail(id);

      response(res, order, 200, "Get Order Detail success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  updateOrder: async (req, res, next) => {
    try {
      const { id } = req.params;

      await orderModel.updateOrder(id);

      const {
        rows: [order],
      } = await orderModel.getOrderDetail(id);

      response(res, order, 200, "Update Order success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [order],
      } = await orderModel.getOrderDetail(id);

      await orderModel.deleteOrder(id);

      response(res, order, 200, "Delete Order success");
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = orderController;
