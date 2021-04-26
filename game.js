import { $randomBtn, $form, finalStage } from './dom.js';
import Player from './player.js';
import generateLogs from './log.js';

export default class Game {
    player = null;
    enemy = null;

    start() {
        this.player = new Player(1, 'sonya');
        this.enemy = new Player(2, 'kitana');

        generateLogs('start', this.player.name, this.enemy.name);
        this.initListeners();
    }

    // добавляет слушателей событий
    initListeners() {
        // Listeners
        $randomBtn.addEventListener('click', () => {
            this.player.changeHP(getRandom(20));
            this.enemy.changeHP(getRandom(20));
            // test
            // this.player.changeHP(50);
            // this.enemy.changeHP(50);

            this.player.renderHP();
            this.enemy.renderHP();

            this.checkWinner();
        });

        $form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.move();
        });
    }

    move() {
        const player = this.player.playerMove();
        const enemy = this.enemy.enemyMove();

        this.checkAttack(enemy.hit, player.defence, enemy.damage, this.player, this.enemy);
        this.checkAttack(player.hit, enemy.defence, player.damage, this.enemy, this.player);
        this.checkWinner();
    }

    checkAttack(hit, defence, damage, defending, attacking) {
        if (hit !== defence) {
            defending.changeHP(damage);
            defending.renderHP();
            generateLogs('hit', defending.name, attacking.name, damage, defending.hp);
        } else {
            generateLogs('defence', defending.name, attacking.name, 0, defending.hp);
        }
    }

    // Проверка победителя
    checkWinner() {
        if (this.player.hp === 0 && this.player.hp < this.enemy.hp) {
            finalStage(this.enemy.name, this.player.name);
        } else if (this.enemy.hp === 0 && this.enemy.hp < this.player.hp) {
            finalStage(this.player.name, this.enemy.name);
        } else if (this.player.hp === 0 && this.enemy.hp === 0) {
            finalStage();
        }
    }
}