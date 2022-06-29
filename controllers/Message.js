const MessageService = require("../services/Message");

const MessageController = {
  getMessagesInConversation: async (req, res) => {
    try {
      // if (!req.body?.conversationID) {
      //   let e = new Error("Please add Conversation ID in req.body");
      //   throw e;
      // }
      // let { conversationID } = req.body;

      // let messages = await MessageService.getAllMessagesByConversationID(
      //   conversationID
      // );
      let messages = await MessageService.getAllMessagesByConversationID(
        req.params.id
      );
      return res.send({ data: messages, message: "Fetched" });
    } catch (e) {
      res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
  sendMessage: async (req, res) => {
    try {
      let user = req?.user;
      let message = await MessageService.createMessage(req.body, user);
      return res.send({ data: true, message: "Created" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
};

module.exports = MessageController;
