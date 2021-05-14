const room = (path?: string) => {
  const prefix = "/room";
  return path ? `${prefix}/${path}` : prefix;
};

export const routes = {
  root: "/",
  signup: "/signup",
  signin: "/signin",
  sheetList: "/sheet-list",
  createRoom: "/create-room",
  joinRoom: "/join-room",
  roomList: "/room-list",
  createSheet: "/create-sheet",
  room: {
    root: room(),
    memberList: room("member-list"),
    chat: room("chat"),
    roll: room("roll"),
    story: room("story"),
    others: room("others"),
  },
};
