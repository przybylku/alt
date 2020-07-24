import * as alt from "alt";
import * as native from "natives";

alt.onServer("admin:newVeh", (newVeh) => {
  const localplayer = alt.Player.local.scriptID;

  alt.setTimeout(() => {
    native.setPedIntoVehicle(localplayer, newVeh.scriptID, -1);
  }, 100);
});
