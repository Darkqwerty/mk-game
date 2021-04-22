import { logText } from './const.js';
import { $chat } from './dom.js';
import { getRandom } from './util.js';

export default function generateLogs(type, name1, name2, damage, hp) {
    const time = new Date().toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric' });
    const index = getRandom(logText[type].length - 1);
    const message = (typeof (logText[type]) === 'string') ? logText[type] : logText[type][index];
    const text = message
        .replace('[time]', time)
        .replace('[player1]', name1)
        .replace('[player2]', name2)
        .replace('[playerDefence]', name1)
        .replace('[playerKick]', name2)
        .replace('[playerWins]', name1)
        .replace('[playerLose]', name2);
    
    switch (type) {
        case 'start':
        case 'end':
        case 'draw':
            $chat.insertAdjacentHTML('afterbegin', `<p class="${type}">${text}</p>`);
            break;
        case 'hit':
        case 'defence':
            $chat.insertAdjacentHTML('afterbegin', `<p class="${type}">${time} - ${text} -${damage} [${hp}/100]</p>`);
            break;
        default:
            $chat.insertAdjacentHTML('afterbegin', `<p>Усё сломалось!</p>`);
            break;
    }    
}