import * as alt from "alt";
import * as chat from "chat";

// System id dla graczy.
const players = {};
alt.on("playerConnect", (pl) => {
  players.push(players.length + 1);
  console.log(players);
});
