function createEl(tag, className) {
    let el = document.createElement(tag);

    if (className) {
        el.classList.add(className);
    }

    return el;
}

function createPlayer(player) {
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

function updatePlayer(player) {
    const $life = document.querySelector('.player' + player.player + ' .life')
    const damage = Math.floor(Math.random() * 20);
    const hp = player.hp - damage;

    player.hp = hp <= 0 ? 0 : hp;

    $life.style.width = player.hp + '%';

    checkWinner();
}

function checkWinner() {
    if (player1.hp <= 0) {
        winnerStage(player2);
    }

    if (player2.hp <= 0) {
        winnerStage(player1);
    }
}

function winnerStage(winner) {
    const $winner = $arenas.appendChild(createEl('div', 'winTitle'));
    $winner.innerText = winner.name + ' wins!';
    $randomBtn.disabled = true;
}

/** Persons */
const person = ['scorpion', 'kitana', 'liukang', 'sonya', 'subzero'];

/** Узлы */
const $root = document.querySelector('.root');
const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('.random');

/** Игроки */
let player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'scorpion',
    weapon: [],
    attack: () => {
        console.log(this.name + ' Fight...');
    }
};
let player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'subzero',
    weapon: [],
    attack: () => {
        console.log(this.name + ' Fight...');
    }
};

let $player1 = createPlayer(player1);
let $player2 = createPlayer(player2);

$arenas.appendChild($player1);
$arenas.appendChild($player2);

$randomBtn.addEventListener('click', () => {
    updatePlayer(player1);
    updatePlayer(player2);
});