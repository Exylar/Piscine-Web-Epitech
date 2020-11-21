/*jslint browser this */
/*global _, player, computer, utils */

(function () {
    "use strict";

    var audio = new Audio('asset/boom.wav');
    
    var game = {
        PHASE_INIT_PLAYER: "PHASE_INIT_PLAYER",
        PHASE_INIT_OPPONENT: "PHASE_INIT_OPPONENT",
        PHASE_PLAY_PLAYER: "PHASE_PLAY_PLAYER",
        PHASE_PLAY_OPPONENT: "PHASE_PLAY_OPPONENT",
        PHASE_GAME_OVER: "PHASE_GAME_OVER",
        PHASE_WAITING: "waiting",

        currentPhase: "",
        phaseOrder: [],
        playerTurnPhaseIndex: 2,
        waiting: false,
        grid: null,
        miniGrid: null,
        playerStart: 0,
        rotated: true,
        players: [],

        init: function () {
            this.grid = document.querySelector('.board .main-grid');
            this.miniGrid = document.querySelector('.mini-grid');
            this.phaseOrder = [
                this.PHASE_INIT_PLAYER,
                this.PHASE_INIT_OPPONENT,
                this.PHASE_PLAY_PLAYER,
                this.PHASE_PLAY_OPPONENT,
                this.PHASE_GAME_OVER
            ];
            this.setupPlayers();
            this.addListeners();
            this.goNextPhase();
        },

        setupPlayers: function () {
            player.setGame(this);
            computer.setGame(this);
            this.players = [player, computer];
            this.players[0].init();
            this.players[1].init();
        },

        goNextPhase: function () {
            var ci = this.phaseOrder.indexOf(this.currentPhase);
            var self = this;

            if (ci !== this.phaseOrder.length - 1)
                this.currentPhase = this.phaseOrder[ci + 1];
            else
                this.currentPhase = this.phaseOrder[0];
            switch (this.currentPhase) {
            case this.PHASE_GAME_OVER:
                if (!this.gameIsOver()) {
                    this.currentPhase = this.phaseOrder[this.playerTurnPhaseIndex - 1];
                    this.goNextPhase()
                }
                break;
            case this.PHASE_INIT_PLAYER:
                utils.info("Placez vos bateaux");
                break;
            case this.PHASE_INIT_OPPONENT:
                this.wait();
                utils.info("En attente de votre adversaire");
                var test = 0;
                while (test < 4) {
                    while (!computer.setActiveShipPosition(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))) {}
                    computer.activateNextShip();
                    test++
                }
                this.players[1].isShipOk(function () {
                    console.log(self.playerStart)
                    if (self.playerStart == 1) {
                        self.currentPhase = self.phaseOrder[3];
                        self.goNextPhase();
                    }
                    self.stopWaiting();
                    self.goNextPhase();
                });
                break;
            case this.PHASE_PLAY_PLAYER:
                utils.info("A vous de jouer, choisissez une case !");
                break;
            case this.PHASE_PLAY_OPPONENT:
                utils.info("A votre adversaire de jouer...");
                this.players[1].play();
                break;
            }

        },
        gameIsOver: function () {            
            if (this.win1()) {
                utils.info("Gagné");
                return true;
            }
            if (this.win2()) {
                utils.info("Perdu");
                return true;
            }
            return false;
        },
        win1: function() {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (this.players[0].grid[i][j] > 0)
                        return false;
                }
            }
            return true;
        },
        win2: function() {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (this.players[1].grid[i][j] > 0)
                        return false;
                }
            }
            return true;
        },
        getPhase: function () {
            if (this.waiting) {
                return this.PHASE_WAITING;
            }
            return this.currentPhase;
        },
        wait: function () {
            this.waiting = true;
        },
        stopWaiting: function () {
            this.waiting = false;
        },
        addListeners: function () {
            this.grid.addEventListener('mousemove', _.bind(this.handleMouseMove, this));
            this.grid.addEventListener('click', _.bind(this.handleClick, this));
            this.grid.addEventListener('contextmenu', _.bind(this.rightClick, this));
        },
        handleMouseMove: function (e) {
            // on est dans la phase de placement des bateau
            if (this.getPhase() === this.PHASE_INIT_PLAYER && e.target.classList.contains('cell')) {
                var ship = this.players[0].fleet[this.players[0].activeShip];

                // si on a pas encore affiché (ajouté aux DOM) ce bateau
                if (!ship.dom.parentNode) {
                    this.grid.appendChild(ship.dom);
                    // passage en arrière plan pour ne pas empêcher la capture des événements sur les cellules de la grille
                    ship.dom.style.zIndex = -1;
                }

                // décalage visuelle, le point d'ancrage du curseur est au milieu du bateau
                ship.dom.style.top = "" + (utils.eq(e.target.parentNode)) * utils.CELL_SIZE - (600 + this.players[0].activeShip * 60) + "px";
                ship.dom.style.left = "" + utils.eq(e.target) * utils.CELL_SIZE - Math.floor(ship.getLife() / 2) * utils.CELL_SIZE + "px";
            }
        },
        choosePlayer: function() {
            var self = this;
            utils.choose("Choississez le premier joueur ?", function () {
                self.playerStart = 0;
                self.renderMiniMap();
                self.players[0].clearPreview();
                self.goNextPhase();
                self.stopWaiting();
            }, function () {
                self.playerStart = 1;
                self.renderMiniMap();
                self.players[0].clearPreview();
                self.goNextPhase();
                self.stopWaiting();
            });
        },
        fnrotate: function () {
            var self = this;
            var ship = this.players[0].fleet[this.players[0].activeShip];
            
            if (!self.rotated)
                if (ship.life % 2 == 0)
                    ship.dom.classList.add("rotate_odd")
                else
                    ship.dom.classList.add("rotate")
            else 
                ship.dom.classList.remove("rotate")
        },
        rightClick: function (e) {
            var self = this;

            self.rotated = !self.rotated;
            self.fnrotate();
        },
        handleClick: function (e) {
            // self garde une référence vers "this" en cas de changement de scope
            var self = this;
            
            // si on a cliqué sur une cellule (délégation d'événement)
            if (e.target.classList.contains('cell')) {
                // si on est dans la phase de placement des bateau
                if (this.getPhase() === this.PHASE_INIT_PLAYER) {
                    // on enregistre la position du bateau, si cela se passe bien (la fonction renvoie true) on continue
                    if (this.players[0].setActiveShipPosition(utils.eq(e.target), utils.eq(e.target.parentNode))) {
                        // et on passe au bateau suivant (si il n'y en plus la fonction retournera false)
                        if (!this.players[0].activateNextShip()) {
                            this.wait();
                            utils.confirm("Confirmez le placement ?", function () {
                                self.choosePlayer();
                            }, function () {
                                self.players[0].resetShipPlacement();
                                self.stopWaiting();
                            });
                        }
                    }
                // si on est dans la phase de jeu (du joueur humain)
                } else if (this.getPhase() === this.PHASE_PLAY_PLAYER) {
                    this.players[0].play(utils.eq(e.target), utils.eq(e.target.parentNode));
                }
                self.fnrotate();
            }
        },

        // fonction utlisée par les objets représentant les joueurs (ordinateur ou non)
        // pour placer un tir et obtenir de l'adversaire l'information de réusssite ou non du tir
        fire: function (from, col, line, callback) {
            audio.play();

            document.querySelector("body").animate([
                // keyframes
                { transform: 'translate(1px, 1px) rotate(0deg)' },
                { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                { transform: 'translate(-3px, 0px) rotate(1deg)' },
                { transform: 'translate(3px, 2px) rotate(0deg)' },
                { transform: 'translate(1px, -1px) rotate(1deg)' },
                { transform: 'translate(-1px, 2px) rotate(-1deg)' },
                { transform: 'translate(-3px, 1px) rotate(0deg)' },
                { transform: 'translate(3px, 1px) rotate(-1deg)' },
                { transform: 'translate(-1px, -1px) rotate(1deg)' },
                { transform: 'translate(1px, 2px) rotate(0deg)' },
                { transform: 'translate(1px, -2px) rotate(-1deg)' }
              ], { 
                duration: 500
              });

            this.wait();
            var self = this;
            var msg = "";

            // determine qui est l'attaquant et qui est attaqué
            var target = this.players.indexOf(from) === 0
                ? this.players[1]
                : this.players[0];

            var actPlayer = this.players.indexOf(from) === 0
                ? this.players[0]
                : this.players[1];

            if (this.currentPhase === this.PHASE_PLAY_OPPONENT) {
                msg += "Votre adversaire vous a... ";
            }

            var targetnum = this.players.indexOf(from) === 0 ? 0 : 1

            // on demande à l'attaqué si il a un bateaux à la position visée
            // le résultat devra être passé en paramètre à la fonction de callback (3e paramètre)
            target.receiveAttack(col, line, function (hasSucceed) {
                if (hasSucceed)
                    msg += "Touché !";
                else
                    msg += "Manqué...";
                if (actPlayer.tries[line][col] !== 0)
                    msg += "Vous avez deja touché la cible imbécile !";
                utils.info(msg);

                callback(hasSucceed);

                setTimeout(function () {
                    self.stopWaiting();
                    self.goNextPhase();
                }, 1000);
            });
            self.renderMap();
            self.renderMiniMap();

        },
        renderMap: function () {
            this.players[0].renderTries(this.grid);
        },
        renderMiniMap: function () {
            this.players[0].renderShips(this.miniGrid);
            this.players[1].renderTries(this.miniGrid);
        }
    };

    // point d'entrée
    document.addEventListener('DOMContentLoaded', function () {
        game.init();
    });

    
}());


