const rooms = (roomId?: string, propName?: string) => {
  const prefix = "/rooms";
  if (!roomId) {
    return prefix;
  }
  if (roomId.includes("/")) {
    throw new Error();
  }
  if (!propName) {
    return `${prefix}/${roomId}`;
  }
  return `${prefix}/${roomId}/${propName}`;
};

const room = (prefix: string | null, roomId: string) => {
  if (!prefix) {
    throw new Error();
  }
  if (roomId.includes("/")) {
    throw new Error();
  }
  return `${prefix}/${roomId}`;
};

const sheets = (sheetId?: string) => {
  const prefix = "/sheets";
  if (!sheetId) {
    return prefix;
  }
  if (sheetId.includes("/")) {
    throw new Error();
  }
  return `${prefix}/${sheetId}`;
};

const sheet = (prefix: string | null, sheetId: string) => {
  if (!prefix) {
    throw new Error();
  }
  if (sheetId.includes("/")) {
    throw new Error();
  }
  return `${prefix}/${sheetId}`;
};

const users = (userId?: string, propName?: string) => {
  const prefix = "/users";
  if (!userId) {
    return prefix;
  }
  if (userId.includes("/")) {
    throw new Error();
  }
  if (!propName) {
    return `${prefix}/${userId}`;
  }
  return `${prefix}/${userId}/${propName}`;
};

export const rtdbRoutes = {
  rooms: {
    root: rooms(),
    room: {
      root: (roomId: string) => rooms(roomId),
      info: (roomId: string) => rooms(roomId, "info"),
      messages: (roomId: string) => rooms(roomId, "messages"),
      sheets: {
        root: (roomId: string) => rooms(roomId, "sheets"),
        sheet: (roomId: string, sheetId: string) =>
          sheet(rtdbRoutes.rooms.room.sheets.root(roomId), sheetId),
      },
      story: (roomId: string) => rooms(roomId, "story"),
    },
  },
  sheets: {
    root: sheets(),
    sheet: (sheetId: string) => sheets(sheetId),
  },
  users: {
    root: users(),
    user: {
      root: (userId: string) => users(userId),
      info: (userId: string) => users(userId, "info"),
      rooms: {
        root: (userId: string) => users(userId, "rooms"),
        room: (userId: string, roomId: string) =>
          room(rtdbRoutes.users.user.rooms.root(userId), roomId),
      },
      // sheets: (userId: string) => users(userId, "sheets"),
      sheets: {
        root: (userId: string) => users(userId, "sheets"),
        sheet: (userId: string, sheetId: string) =>
          sheet(rtdbRoutes.users.user.sheets.root(userId), sheetId),
      },
    },
  },
};
