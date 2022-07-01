const NotificationsModel = require("../models/Notifications");

const NotificationService = {
  getNotificationByID: async (notificationID) => {
    try {
      let notification = await NotificationsModel.findById(notificationID);
      if (notification) {
        return notification;
      } else {
        let e = new Error("No Notifications Found!");
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
  getNotificationsByUserID: async (user) => {
    try {
      let notifications = await NotificationsModel.find({ userID: user.id });
      if (notifications) {
        return notifications;
      } else {
        let e = new Error("No Notifications Found!");
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
  markAsread: async (notificationID) => {
    try {
      let notification = await NotificationsModel.updateOne(
        { _id: notificationID },
        { $set: { isRead: true } }
      );
      if (notification.modifiedCount) {
        // notification.isRead = true;
        // await notification.save();
        // let status = await notification.updateOne({ isRead: true });
        return notification.modifiedCount;
      } else {
        let e = new Error("No Notifications Found!");
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
  markAllAsRead: async (user) => {
    try {
      let notification = await NotificationsModel.updateMany(
        { userID: user.id },
        { $set: { isRead: true } }
      );
      if (notification.modifiedCount) {
        return notification.modifiedCount;
      } else {
        let e = new Error("Something Went Wrong!");
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
};

module.exports = NotificationService;
