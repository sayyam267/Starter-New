const pusher = require("../helpers/pusher");
const MessageModel = require("../models/Message");

const MessageService = {
  createMessage: async (data) => {
    try {
      const payload = req.body;
      //   console.log(payload);
      let newMessage = await MessageModel.create({
        roomID: req.body.roomID,
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
      });
      if (newMessage) {
        pusher.trigger(`${req.body.roomID}`, "message-received", {
          message: newMessage.message,
          from: newMessage.sender,
          to: newMessage.receiver,
          date: newMessage.createdAt,
        });
        return newMessage;
      }
      // res.send({ message: req.body.message, from: req.body.from, to: req.body.to });
      //   res.json(newMessage);
    } catch (e) {
      throw e;
    }
  },
  getAllMessagesByConversationID: async (data) => {
    try {
      let messages = await MessageModel.find({
        roomID: data.conversationID,
      });
      if (messages) {
        return messages;
      } else {
        let e = new Error("No Messages in the Conversation");
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
};

module.exports = MessageService;
