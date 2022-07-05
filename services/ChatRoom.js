const ChatRoomModel = require("../models/ChatRoom");

const ChatRoomService = {
  getorCreate: async (data) => {
    try {
      //   console.log(data);
      let existing = await ChatRoomModel.findOne({
        people: { $all: [data.sender, data.receiver] },
      })
        .populate({
          path: "lastMessage",
          model: "messages",
          select: ["message", "sender"],
        })
        .populate({
          path: "people",
          model: "users",
          select: ["fname", "lname", "email", "profilePicture"],
        })
        .populate({
          path: "lastMessage.sender",
          model: "users",
          select: ["fname", "lname"],
        });
      // .populate(["people", "lastMessage"]);
      if (existing) {
        // console.log(existing);
        return { data: existing, message: "Fetched" };
        // return res.status(200).json({ roomID: existing._id });
      } else {
        let people = [data.sender, data.receiver];
        let newConversation = await ChatRoomModel.create({
          people,
        });
        // .populate(["people", "lastMessage"]);
        // console.log(newConversation);
        if (newConversation)
          return { data: newConversation, message: "Created" };
        // res.json({ newConversation });
        else {
          throw new Error("Cannot create in DB");
        }
      }
    } catch (e) {
      throw e;
    }
  },
  getMyConversations: async (data) => {
    try {
      console.log(data);
      let room = await ChatRoomModel.find({
        people: { $all: [data.id] },
      })
        .sort("-updatedAt")
        .populate({
          path: "people",
          model: "users",
          select: ["fname", "lname", "email", "profilePicture"],
        })
        .populate({
          path: "lastMessage",
          model: "messages",
          select: ["message", "sender"],
        })
        .populate({
          path: "lastMessage",
          populate: {
            path: "sender",
            model: "users",
            select: ["fname", "lname"],
          },
        });

      if (room) return room;
      //   res.json(rooms);
      else {
        throw new Error("NOT FOUND");
      }
    } catch (e) {
      throw e;
      //   return res.status(400).json(e);
    }
  },
};

module.exports = ChatRoomService;
