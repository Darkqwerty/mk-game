const logType = ['start', 'end', 'hit', 'defence', 'draw'];
const logText = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};
/** Persons */
const PERSON = ['scorpion', 'kitana', 'liukang', 'sonya', 'subzero'];
const ATTACK = ['head', 'body', 'foot'];
const HIT = { head: 30, body: 25, foot: 20 };
/** Игроки */
const player1 = {
    player: 1,
    name: 'SONYA',
    hp: 100,
    img: 'sonya',
    weapon: [],
    attack: () => {
        console.log(this.name + ' Fight...');
    },
    changeHP,
    elHP,
    renderHP
};
const player2 = {
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
/** Узлы */
const $root = document.querySelector('.root');
const $arenas = document.querySelector('.arenas');
const $form = document.querySelector('form.control');
const $chat = document.querySelector('.chat');
const $randomBtn = document.querySelector('.random');
const $player1 = createPlayer(player1);
const $player2 = createPlayer(player2);

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

function enemyMove() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        damage: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function playerMove() {
    let attack = {};

    for (const item of $form) {
        if (item.checked && item.name === 'hit') {
            attack.damage = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

function checkAttack(hit, defence, damage, defending, attacking) {

    if (hit !== defence) {
        defending.changeHP(damage);
        defending.renderHP();
        generateLogs('hit', defending.name, attacking.name, damage, defending.hp);
    } else {
        generateLogs('defence', defending.name, attacking.name, 0, defending.hp);
    }
}

// Получение случайного числа от 0 до num
function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

function __generateLogs(type, name1, name2, damage, hp) {
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

    let log  = ['hit', 'defence'].includes(type) ? `${time} - ` : '';
    log += `${text} `;
    log += ['hit', 'defence'].includes(type) ? `-${damage} [${hp}/100]` : '';

    $chat.insertAdjacentHTML('afterbegin', `<p class="${type}">${log}</p>`);
}

function generateLogs(type, name1, name2, damage, hp) {
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
    }    
}

// Проверка победителя
function checkWinner() {
    if (player1.hp === 0 && player1.hp < player2.hp) {
        finalStage(player2.name, player1.name);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        finalStage(player1.name, player2.name);
    } else if (player1.hp === 0 && player2.hp === 0) {
        finalStage();
    }
}

// Финальная сцена
function finalStage(winner, loser) {
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
    const enemy = enemyMove();
    const player = playerMove();

    checkAttack(enemy.hit, player.defence, enemy.damage, player1, player2);
    checkAttack(player.hit, enemy.defence, player.damage, player2, player1);
    checkWinner();
});

$arenas.appendChild($player1);
$arenas.appendChild($player2);

generateLogs('start', player1.name, player2.name);