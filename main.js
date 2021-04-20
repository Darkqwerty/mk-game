import { $arenas, createPlayer } from './dom.js';
import { player1, player2 } from './player.js';
import generateLogs from './log.js';

const $player1 = createPlayer(player1);
const $player2 = createPlayer(player2);

$arenas.appendChild($player1);
$arenas.appendChild($player2);

generateLogs('start', player1.name, player2.name);