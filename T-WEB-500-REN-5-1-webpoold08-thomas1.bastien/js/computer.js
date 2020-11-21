/*jslint browser this */
/*global _, player */

(function (global) {
    "use strict";

    var computer = _.assign({}, player, {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        play: function () {
            var self = this;
            setTimeout(function () {
                var x = Math.floor(Math.random() * 10);
                var y = Math.floor(Math.random() * 10);

                self.game.fire(this, x, y, function (hasSucced) {
                    self.tries[y][x] = hasSucced;
                    player.sunk();
                });
            }, 2000);
        },
        areShipsOk: function (callback) {
            var i = 0;
            var j;

            this.fleet[i].forEach(function (ship, i) {
                j = 0;
                while (j < ship.life) {
                    this.grid[i][j] = ship.getId();
                    j += 1;
                }
            }, this);

            setTimeout(function () {
                callback();
            }, 500);
        }
    });

    global.computer = computer;

}(this));