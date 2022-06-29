const ChatRoomService = require("../services/ChatRoom");
const ConversationService = require("../services/ChatRoom");

const ConversationController = {
  initializeChat: async (req, res) => {
    try {
      let user = req.user;
      if (!req.body?.receiver) {
        let e = new Error("RECEIVER Person missing in req.body");
        throw e;
      }
      let data = { sender: user.id, receiver: req.body?.receiver };

      let chatroom = await ChatRoomService.getorCreate(data);
      return res.send({ data: chatroom.data, message: chatroom.message });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
  getMyConversations: async (req, res) => {
    try {
      let user = req.user;
      let conversations = await ChatRoomService.getMyConversations(user);
      return res.send({ data: conversations, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
};

module.exports = ConversationController;
