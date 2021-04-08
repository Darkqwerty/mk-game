function createPlayer(player, data) {
    const create = (className) => {
        let el = document.createElement('div');
        el.classList.add(className);
        return el;
    }

    const $player = create(player);
    const $progressbar = create('progressbar');
    const $character = create('character');
    const $life = create('life');
    const $name = create('name');
    const $avatar = document.createElement('img');

    $life.style.width = data.hp + '%';
    $name.innerText = data.name;
    $avatar.src = 'http://reactmarathon-api.herokuapp.com/assets/' + data.img + '.gif';

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($avatar)

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

/** Persons */
const person = ['scorpion', 'kitana', 'liukang', 'sonya', 'subzero'];

/** Узлы */
const $root = document.querySelector('.root');
const $arenas = document.querySelector('.arenas');

/** Игроки */
let player1 = {
    name: 'SCORPION', 
    hp: 50, 
    img: 'scorpion', 
    weapon: [], 
    attack: () => {
        console.log(this.name + ' Fight...');
    }
};
let player2 = {
    name: 'SUB-ZERO', 
    hp: 80, 
    img: 'subzero', 
    weapon: [], 
    attack: () => {
        console.log(this.name + ' Fight...');
    }
};

let $player1 = createPlayer('player1', player1);
let $player2 = createPlayer('player2', player2);

$arenas.appendChild($player1);
$arenas.appendChild($player2);

