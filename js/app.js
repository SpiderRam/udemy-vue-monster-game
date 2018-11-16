new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        playerHit: 0,
        monsterHit: 0,
        playerHeal: 0,
        turns: []
    },
    methods: {
        startNewGame: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.turns = [];
        },
        getRoundInteger: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        },
        attack: function() {
            this.playerHit = this.getRoundInteger(5, 15);
            this.monsterHit = this.getRoundInteger(5, 15);
            this.playerHealth -= this.monsterHit;
            this.logPlayerHits();
            this.monsterHealth -= this.playerHit;
            this.logMonsterHits();
            this.checkScore();
        },
        specialAttack: function() {
            this.playerHit = this.getRoundInteger(10, 20);
            this.monsterHit = this.getRoundInteger(5, 15);
            this.playerHealth -= this.monsterHit;
            this.logPlayerHits();
            this.monsterHealth -= this.playerHit;
            this.logMonsterHits()
            this.checkScore();
        },
        heal: function() {
            var self = this;
            if (self.playerHealth <= 85) {
                self.playerHeal = self.getRoundInteger(8, 15);
                self.monsterHit = self.getRoundInteger(3, 10);
                self.playerHealth += self.playerHeal;
                self.playerHealth -= self.monsterHit;
                self.checkScore();
            } else {
                self.playerHealth = 100;
                self.monsterHit = self.getRoundInteger(3, 8);
                self.playerHealth -= self.monsterHit;
                self.checkScore();
            }
        },
        giveUp: function() {
            this.gameIsRunning = false;
            this.playerHealth = 0;
            this.monsterHealth = 0;
        },
        checkScore: function() {
            var self = this;
            if (self.playerHealth <= 0) {
                if (confirm("You lost!  New Game?")) {
                    self.startNewGame();
                } else {
                    self.gameIsRunning = false;
                }
            } else if (self.monsterHealth <= 0) {
                if (confirm("You won!  New Game?")) {
                    self.startNewGame();
                } else {
                    self.gameIsRunning = true;
                }
            }
        }, 
        logPlayerHits: function() {
            this.turns.unshift({
                isPlayer: true,
                text: "Monster hits Player for " + this.monsterHit
            });
        },
        logMonsterHits: function() {
            this.turns.unshift({
                isPlayer: false,
                text: "Player hits Monster for " + this.playerHit
            });
        }
    },
    watch: {
        playerHealth: function() {
            return this.playerHit;
        },
        monsterHealth: function() {
            return this.monsterHit;
        }
    }
});

