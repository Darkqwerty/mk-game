import { ATTACK, HIT } from './const.js';
import { getRandom } from './util.js';
import { $form, $arenas, createPlayer } from './dom.js';
import generateLogs from './log.js';

export default class Player {
    id = null;
    name = '';
    hp = 100;
    img = '';
    weapon = [];

    constructor( id, name ) {
        this.id = id;
        this.name = name.toUpperCase();
        this.img = name;

        $arenas.appendChild(createPlayer(this));
    }

    attack() {
        console.log(this.name + ' Fight...');
    }

    // Вычисление изменения здоровья
    changeHP(damage) {
        const hp = this.hp - damage;
        this.hp = hp < 0 ? 0 : hp;
    }

    // Получить div с полоской здоровья
    getHPElement() {
        return document.querySelector('.player' + this.id + ' .life')
    }

    // Изменение отображения заполнения полосы здоровья
    renderHP() {
        this.getHPElement().style.width = this.hp + '%';
    }

    // Ход противника
    enemyMove() {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
    
        return {
            damage: getRandom(HIT[hit]),
            hit,
            defence
        }
    }

    // Ход игрока
    playerMove() {
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
}