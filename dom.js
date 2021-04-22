import { makeMove } from './player.js';
import generateLogs from './log.js';

/** Узлы */
export const $root = document.querySelector('.root');
export const $arenas = document.querySelector('.arenas');
export const $form = document.querySelector('form.control');
export const $chat = document.querySelector('.chat');
export const $randomBtn = document.querySelector('.random');

// Функции рисования
export function createEl(tag, className) {
    let el = document.createElement(tag);

    if (className) {
        el.classList.add(className);
    }

    return el;
}

export function createPlayer(player) {
    const $player = createEl('div', 'player' + player.player);
    const $progressbar = createEl('div', 'progressbar');
    const $character = createEl('div', 'character');
    const $life = createEl('div', 'life');
    const $name = createEl('div', 'name');
    const $avatar = createEl('img');

    $life.style.width = player.hp + '%';
    $name.innerText = player.name;
    $avatar.src = 'http://reactmarathon-api.herokuapp.com/assets/' + player.img + '.gif';

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($avatar)

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

export function createReloadButton() {
    const $wrap = createEl('div', 'reloadWrap');
    const $button = createEl('button', 'button');

    $button.innerText = 'Restart';

    $wrap.appendChild($button);
    $root.appendChild($wrap);

    $button.addEventListener('click', () => {
        window.location.reload();
    });
}

// Финальная сцена
export function finalStage(winner, loser) {
    const $winner = createEl('div', 'winTitle');

    $winner.innerText = winner ? winner + ' wins!' : 'draw!';

    $arenas.appendChild($winner);
    $randomBtn.disabled = true;
    createReloadButton();

    if (winner) {
        generateLogs('end', winner, loser);
    }
    else {
        generateLogs('draw');
    }
}

// Listeners
$randomBtn.addEventListener('click', () => {
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));
    // test
    // player1.changeHP(50);
    // player2.changeHP(50);

    player1.renderHP();
    player2.renderHP();

    checkWinner();
});

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    makeMove();
});