const NotificationService = require("../services/NotificationService");

const NotificationController = {
  getNotificationByID: async (req, res) => {
    try {
      let id = req?.params?.id;
      let notification = await NotificationService.getNotificationByID(id);
      return res.send({ data: notification, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
  getMyNotifications: async (req, res) => {
    try {
      let user = req.user;
      let notifications = await NotificationService.getNotificationsByUserID(
        user
      );
      return res.send({ data: notifications, message: "Fetched Notificaions" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
  markAsread: async (req, res) => {
    try {
      let notificationID = req.body.notificationID;
      let status = await NotificationService.markAsread(notificationID);
      return res.send({
        data: status,
        message: `${status} Notifications Marked As Read!`,
      });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
  markAllAsRead: async (req, res) => {
    try {
      let user = req.user;
      let status = await NotificationService.markAllAsRead(user);
      return res.send({
        data: status,
        message: `${status} Notifications Marked As Read!`,
      });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
};

module.exports = NotificationController;
