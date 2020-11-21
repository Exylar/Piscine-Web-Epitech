/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var sheep = {dom: {parentNode: {removeChild: function () {}}}};

    var player = {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        activeShip: 0,
        init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));
            // créé les grilles
            this.grid = utils.createGrid(10, 10);
            this.tries = utils.createGrid(10, 10);
        },
        setGame: function (obj) {
            this.game = obj
        },
        play: function (col, line) {
            // appel la fonction fire du game, et lui passe une calback pour récupérer le résultat du tir
            this.game.fire(this, col, line, _.bind(function (hasSucced) {
                this.tries[line][col] = hasSucced;
            }, this));
        },
        // quand il est attaqué le joueur doit dire si il a un bateaux ou non à l'emplacement choisi par l'adversaire
        receiveAttack: function (col, line, callback) {
            var succeed = false;

            if (this.grid[line][col] !== 0) {
                succeed = true;
                this.grid[line][col] = 0
            }
            callback.call(undefined, succeed);
        },
        setActiveShipPosition: function (x, y) {
            var ship = this.fleet[this.activeShip];
            var i = 0;
            var j = 0;

            if (this.game.rotated) {
                x = x - Math.floor(ship.getLife() / 2)
                while (j < ship.getLife()) {
                    if (this.grid[y][x + j] != 0)
                        return false
                    j += 1;
                }
                while (i < ship.getLife()) {
                    this.grid[y][x + i] = ship.getId();
                    i += 1;
                }
            }
            else {
                y = y - Math.floor(ship.getLife() / 2)
                while (j < ship.getLife()) {
                    if (this.grid[y + j][x] != 0)
                        return false
                    j += 1;
                }
                while (i < ship.getLife()) {
                    this.grid[y + i][x] = ship.getId();
                    i += 1;
                }
            }
            return true;
        },
        clearPreview: function () {
            this.fleet.forEach(function (ship) {
                if (ship.dom.parentNode) {
                    ship.dom.parentNode.removeChild(ship.dom);
                }
                ship.dom.remove()
            });
        },
        resetShipPlacement: function () {
            this.clearPreview();

            this.activeShip = 0;
            this.grid = utils.createGrid(10, 10);
        },
        activateNextShip: function () {
            if (this.activeShip < this.fleet.length - 1) {
                this.activeShip += 1;
                return true;
            } else {
                return false;
            }
        },
        renderTries: function (grid) {
            this.tries.forEach(function (row, rid) {
                row.forEach(function (val, col) {
                    var node = grid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col + 1) + ')');

                    if (val === true) {
                        node.style.backgroundColor = '#e60019';
                    } else if (val === false) {
                        node.style.backgroundColor = '#aeaeae';
                    }
                });
            });
        },
        isShipOk: function (func) {
            if (this.activeShip == 3)
                func()
        },
        renderShips: function (grid) {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    var node = grid.querySelector('.row:nth-child(' + (i + 1) + ') .cell:nth-child(' + (j + 1) + ')');

                    if (this.grid[i][j] === 1) {                    
                        node.style.backgroundColor = '#e60019';
                    } else if (this.grid[i][j] === 2) {
                        node.style.backgroundColor = '#577cc2';
                    } else if (this.grid[i][j] === 3) {
                        node.style.backgroundColor = '#56988c';
                    } else if (this.grid[i][j] === 4) {
                        node.style.backgroundColor = '#203140';
                    }
                }
            }
        },
        sunk: function() {
            var sunk = true;

            for (var k = 1; k < 5; k++) {
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 10; j++) {
                        if (this.grid[i][j] == k)
                            sunk = false;
                    }
                }
                if (sunk)
                    document.querySelectorAll(".ship").item(k - 1).classList.add("sunk");
                sunk = true;
            }
        }
    };

    global.player = player;

}(this));