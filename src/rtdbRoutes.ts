const rooms = (roomId?: string, propName?: string) => {
  const prefix = "/rooms";
  if (!roomId) {
    return prefix;
  }
  if (roomId.includes("/")) {
    return null;
  }
  if (!propName) {
    return `${prefix}/${roomId}`;
  }
  return `${prefix}/${roomId}/${propName}`;
};

const sheets = (sheetId?: string) => {
  const prefix = "/sheets";
  if (!sheetId) {
    return prefix;
  }
  if (sheetId.includes("/")) {
    return null;
  }
  return `${prefix}/${sheetId}`;
};

const users = (userId?: string, propName?: string) => {
  const prefix = "/users";
  if (!userId) {
    return prefix;
  }
  if (userId.includes("/")) {
    return null;
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
      sheets: (roomId: string) => rooms(roomId, "sheets"),
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
      rooms: (userId: string) => users(userId, "rooms"),
      sheets: (userId: string) => users(userId, "sheets"),
    },
  },
};
