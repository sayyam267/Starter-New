const ConversationModel = require("../models/ChatRoom");
const pusher = require("../helpers/pusher");
const MessageModel = require("../models/Message");

const MessageService = {
  createMessage: async (data, user) => {
    try {
      const payload = data;
      console.log(payload);

      let conversation = await ConversationModel.findById(data.roomID);
      let receiver = conversation.people.filter((person) => person != user.id);
      receiver = receiver[0];
      let newMessage = await MessageModel.create({
        roomID: data.roomID,
        // sender: data.sender,
        sender: user.id,
        receiver: receiver,
        // receiver: data.receiver,
        message: data.message,
      });

      if (newMessage) {
        let conversation = await ConversationModel.findByIdAndUpdate(
          data.roomID,
          {
            lastMessage: newMessage,
          }
        );
        pusher.trigger(
          `${data.roomID}`,
          "message-received",
          newMessage
          // {
          //   message: newMessage.message,
          //   from: newMessage.sender,
          //   to: newMessage.receiver,
          //   date: newMessage.createdAt,
          // }
        );
        return newMessage;
      }
      // res.send({ message: req.body.message, from: req.body.from, to: req.body.to });
      //   res.json(newMessage);
    } catch (e) {
      throw e;
    }
  },
  getAllMessagesByConversationID: async (conversationID) => {
    try {
      let messages = await MessageModel.find({
        roomID: conversationID,
      })
        .sort("createdAt")
        .populate(["sender", "receiver"]);
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
