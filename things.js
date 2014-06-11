function Item(pos, gold) {
    var gToC = { 1: '#D2691E', 2: '#D2691E', 3: '#A9A9A9', 4: '#FFD700', 5: 'cyan' };

    return {
        id: Item.idCounter++,
        pos: pos,
        bountyGold: gold,
        color: gToC[gold],
        distance: function (object) {
            if (object.pos !== undefined)
                return this.pos.distance(object.pos);
            else if (object.x !== undefined)
                return this.pos.distance(new Vector(object.x,object.y));
        }
    };
}
Item.idCounter = 0;

function Thing(pos, color) {
    return {
        startPos: pos,
        pos: pos,
        targetPos: pos,
        color: color,
        gold: 0,
        init: function (enemy, spawner)
        {
            this.getNearestEnemy = function () { return enemy; }
            this.getItems = function () {return spawner.getItems(); }
        },
        chooseAction: function () {},
        move: function (toPos) {
            this.targetPos = toPos;
        },
        moveXY: function(x,y) {
            this.targetPos = Vector(x,y);
        },
        say: function(text) {},
        now: function() {
            return now;
        },
        getNearestEnemy: function () {},
        getCooldown: function(action) { return 1000; },
        distance: function(object) {
            if (object.pos !== undefined)
                return this.pos.distance(object.pos);
            else if (object.x !== undefined)
                return this.pos.distance(new Vector(object.x,object.y));
        },
        reset: function () {
            this.pos = new Vector(this.startPos.x, this.startPos.y);
            this.targetPos = new Vector(this.startPos.x, this.startPos.y);
            this.gold = 0;
        }
    };
}

function Spawner() {
    return {
        items: [],
        built: [],
        cds: [0.3,0.2,0.2,0.2,0.1],
        spawnCD: 0,
        spawnCoin: function () {
            this.spawnCD -= 0.1;
            var x = Math.random() * (115 - 1) + 1;
            var y = Math.random() * (68 - 5) + 5;
            var coin = null;

            if (Math.random() < 0.05)
                coin = 5;
            else if (Math.random() < 0.25)
                coin = this.built.length % 3 + 2;
            else if (Math.random() < 0.5)
                coin = 1;

            if (coin === null || this.spawnCD > 0) return;

            this.spawnCD = this.cds[coin-1];
            var item = Item(Vector(x,y), coin);

            this.items.push(item);
            this.built.push(item);
        },
        getItems: function () {
            return this.items.slice(0);
        },
        itemsPickedUp: function (itemsToRemove) {
            if (itemsToRemove.length === 0) return;

            var filteredItems = this.items.filter(function (item) {
                var remove = false;
                itemsToRemove.forEach( function (item2) {
                    if(item.id === item2.id) remove = true;
                });
                return !remove;
            });
            this.items = filteredItems;
        },
        reset: function () {
            this.items = [];
            this.built = [];
            this.spawnCD = 0;
        }
    };
}