import User from "../models/usermodel.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers: ", error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage",
      );
    res.status(200).json(user.friends);
  } catch (error) {}
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    //prevent sending req to yourself
    if (myId == recipientId) {
      return res
        .status(400)
        .json({ error: "Cannot send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({ error: "User not found" });
    }
    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ error: "Already friends" });
    }

    // check if a req already exist
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    const friendRequset = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequset);
  } catch (error) {
    console.error("Error in sendFriendRequest: ", error.message);
    res.status(400).json({ error: error.message });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(400).json({ error: "Friend request not found" });
    }

    //verify the current user in the recipient
    if (friendRequest.recipient.toString() !== req.user.id.toString()) {
      return res
        .status(400)
        .json({ error: "Unauthorize to accept this request" });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    //add each user to the other's friend
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error in acceptFriendRequest: ", error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs  = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");
    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage",
    );

    res.status(200).json({ outgoingRequests });
  } catch (error) {
    console.log("error  in getOutgoingRequests: ", error.message);  
    res.status(500).json({ message: "Internal server error " })
  }
}