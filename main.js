// Функции рисования
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

function createReloadButton() {
    const $wrap = createEl('div', 'reloadWrap');
    const $button = createEl('button', 'button');

    $button.innerText = 'Restart';

    $wrap.appendChild($button);
    $root.appendChild($wrap);

    $button.addEventListener('click', () => {
        window.location.reload();
    });
}

// Методы игроков
function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

function changeHP(damage) {
    const hp = this.hp - damage;
    this.hp = hp < 0 ? 0 : hp;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life')
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function checkWinner() {
    if (player1.hp === 0 && player1.hp < player2.hp) {
        winnerStage(player2.name);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        winnerStage(player1.name);
    } else if (player1.hp === 0 && player2.hp === 0) {
        winnerStage();
    }
}

function winnerStage(name) {
    const $winner = $arenas.appendChild(createEl('div', 'winTitle'));

    $winner.innerText = name ? name + ' wins!' : 'draw!';

    $randomBtn.disabled = true;
    createReloadButton();
}

/** Persons */
const PERSON = ['scorpion', 'kitana', 'liukang', 'sonya', 'subzero'];
const ATTACK = ['head', 'body', 'foot'];
const HIT = { head: 30, body: 25, foot: 20 };

/** Узлы */
const $root = document.querySelector('.root');
const $arenas = document.querySelector('.arenas');
const $form = document.querySelector('form.control');
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
    },
    changeHP,
    elHP,
    renderHP
};

let player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'subzero',
    weapon: [],
    attack: () => {
        console.log(this.name + ' Fight...');
    },
    changeHP,
    elHP,
    renderHP
};

let $player1 = createPlayer(player1);
let $player2 = createPlayer(player2);

$arenas.appendChild($player1);
$arenas.appendChild($player2);

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
    const enemy = enemyAttack();
    let attack = {};

    for(const item of $form) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    // удар компа защита игрока
    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }

    // удар игрока защита компа
    if (enemy.defence !== attack.hit) {
        player2.changeHP(attack.value);
        player2.renderHP();
    }

    checkWinner();
});