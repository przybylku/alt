import * as alt from "alt";
import chat from "chat";
import { weapons } from "./weapons.mjs";
const spawnPos = {
  x: -2639.872,
  y: 1866.812,
  z: 160.135,
};
const players = [];
alt.on("playerConnect", (player) => {
  player.model = "mp_m_freemode_01";
  player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 0);
  players.push({ nazwa: player.name, id: players.length + 1 });
  console.log(players);
});
// Teleport do kogos
chat.registerCmd("tpto", (pl, arg) => {
  let target;
  if (!arg || arg.length <= 0) {
    return chat.send(pl, "{ff0000}Nie można znaleść takiego gracza.");
  } else {
    players.forEach((ele, indexa) => {
      console.log(ele);
      Object.keys(ele).forEach((elea, index) => {
        console.log(ele[elea], players[indexa]);
        if (ele[elea] === players[indexa].id) {
          target = players[indexa];
          let targetname = alt.getPlayersByName(target.nazwa);
          pl.pos = targetname[0].pos;
          chat.send(pl, `Przeteleportowałeś się do: ${targetname[0].name}`);
        }
      });
    });
  }
});
chat.registerCmd("tp", (pl, arg) => {
  if (!arg[0]) return pl.sendMessage("{FF0000}/tp [x] [y] [z]");

  if (arg.length !== 3) return pl.sendMessage("{FF0000}/tp [x] [y] [z]");

  pl.pos = { x: arg[0], y: arg[1], z: arg[2] };
});
chat.registerCmd("ulecz", (player, arg) => {
  // if (!arg || arg.lenght <= 0) {
  //     chat.send(player, '/ulecz')
  // }
  player.health = 1000;
});
chat.registerCmd("veh", (pl, arg) => {
  if (!arg || arg.lenght <= 0) {
    chat.send(player, "/veh (model)");
  }
  try {
    const newVehicle = new alt.Vehicle(
      arg[0],
      pl.pos.x,
      pl.pos.y,
      pl.pos.z,
      0,
      0,
      0
    );
    alt.emitClient(pl, "admin:newVeh", newVehicle);
  } catch {
    chat.send(pl, "nie poprawny model");
  }
});
chat.registerCmd("car", (pl, arg) => {
  if (!arg || arg.lenght <= 0) {
    chat.send(player, "/veh (model)");
  }
  try {
    const newVehicle = new alt.Vehicle(
      arg[0],
      pl.pos.x,
      pl.pos.y,
      pl.pos.z,
      0,
      0,
      0
    );
    alt.emitClient(pl, "admin:newVeh", newVehicle);
  } catch {
    chat.send(pl, "nie poprawny model");
  }
});
chat.registerCmd("weapon", (pl, arg) => {
  if (!arg || arg.length <= 0) {
    return chat.send(pl, "{ff0000}Podaj argument. /weapon (model)");
  } else {
    const weaponname = arg[0].toString().toLowerCase();
    if (weapons[weaponname] === undefined) {
      return chat.send(pl, "Nie ma takiego modelu ");
    } else {
      pl.giveWeapon(weapons[weaponname], 999, true);
    }
  }
});
chat.registerCmd("kordy", (pl, arg) => {
  chat.send(pl, `${JSON.stringify(pl.pos)}`);
  console.log(pl.pos);
});
