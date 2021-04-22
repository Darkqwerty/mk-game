import { ATTACK, HIT } from './const.js';
import { getRandom } from './util.js';
import { $form, finalStage } from './dom.js';
import generateLogs from './log.js';

/** Игроки */
export const player1 = {
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

export const player2 = {
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

export function makeMove() {
    const enemy = enemyMove();
    const player = playerMove();

    checkAttack(enemy.hit, player.defence, enemy.damage, player1, player2);
    checkAttack(player.hit, enemy.defence, player.damage, player2, player1);
    checkWinner();
}