var ctx;

var champ = Thing(Vector(18, 38), 'green');
var enemy = Thing(Vector(104, 38), 'red');
var spawner = Spawner();

var time = 0;
var now = 0;
var runCount = 0;
var runLoop = null;
var loopSpeed = 100;

function findChooseActionFunctions ()
{
    var champSelect = document.getElementById("champFunc");
    var enemySelect = document.getElementById("enemyFunc");
    for (func in window)
    {
        var funcName = func.toString();
        var find = funcName.search("chooseAction");
        if (find !== -1)
        {
            var champOption = document.createElement("option");
            var enemyOption = document.createElement("option");
            champOption.text = enemyOption.text = funcName.replace("chooseAction", "");
            champOption.value = enemyOption.value = funcName;
            champSelect.add(champOption);
            enemySelect.add(enemyOption);
        }
    }
}

function AssignChampFunc(func)
{
    if (window[func] === undefined)
        champ.chooseAction = func;
    else
        champ.chooseAction = window[func];
}

function AssignEnemyFunc(func)
{
    if (window[func] === undefined)
        enemy.chooseAction = func;
    else
        enemy.chooseAction = window[func];
}

function start() {
    champ.init(enemy, spawner);
    enemy.init(champ, spawner);

    findChooseActionFunctions();

    AssignChampFunc(document.getElementById("champFunc").value);
    AssignEnemyFunc(document.getElementById("enemyFunc").value);

    champ.wins = 0;
    enemy.wins = 0;

    var date = new Date();
    time = date.getTime();
    startLoop(loopSpeed);
}

function startLoop(speed) {
    if (runLoop)
        clearInterval(runLoop);

    if(speed)
        loopSpeed = speed;

    runLoop=setInterval(function(){run()},loopSpeed);
}

function stopLoop()
{
    clearInterval(runLoop);
    runLoop = null;
}

function restart() {
    spawner.reset();
    champ.reset();
    enemy.reset();
    runCount = 0;
}

function restartAll() {
    restart();
    champ.wins = 0;
    enemy.wins = 0;
}

function run()
{
    var c = document.getElementById("playArea");
    c.width = c.width;
    ctx = c.getContext("2d");

    var date = new Date();
    now = (date.getTime() - time) / 1000;
    runCount++;

    spawner.spawnCoin();
    var items = spawner.getItems();

    drawFilledCircle(ctx, champ.pos, 2.5, champ.color);
    drawFilledCircle(ctx, enemy.pos, 2.5, enemy.color);

    removeItems = [];
    items.forEach(function (item) {
        drawFilledCircle(ctx, item.pos, item.bountyGold === 1 ? 0.8 : 1.2, item.color);

        if (champ.pos.distance(item.pos) < 5)
        {
            champ.gold += item.bountyGold;
            removeItems.push(item);
        }
        else if (enemy.pos.distance(item.pos) < 5)
        {
            enemy.gold += item.bountyGold;
            removeItems.push(item);
        }
    });

    spawner.itemsPickedUp(removeItems);

    if (champ.gold >= 150 || enemy.gold >= 150)
    {
        if (champ.gold >= 150 && enemy.gold < 150)
            champ.wins++;

        if (enemy.gold >= 150 && champ.gold < 150)
            enemy.wins++;

        restart();
    }

    champ.chooseAction();
    enemy.chooseAction();

    drawTarget(ctx, champ.targetPos, champ.color);
    drawTarget(ctx, enemy.targetPos, enemy.color);

    if (!champ.pos.equals(champ.targetPos))
    {
        var movePos = Vector.subtract(champ.targetPos, champ.pos);
        movePos = movePos.normalize();
        movePos = Vector.multiply(movePos,1);
        champ.pos = Vector.add(champ.pos,movePos);
    }

    if (!enemy.pos.equals(enemy.targetPos))
    {
        var movePos = Vector.subtract(enemy.targetPos, enemy.pos);
        movePos = movePos.normalize();
        movePos = Vector.multiply(movePos,1);
        enemy.pos = Vector.add(enemy.pos,movePos);
    }


    drawText(ctx, Vector(1,68),"Player: " + champ.gold);
    drawText(ctx, Vector(105,68),"Enemy: " + enemy.gold);
    drawText(ctx, Vector(1,66),"Wins: " + champ.wins);
    drawText(ctx, Vector(105,66),"Wins: " + enemy.wins);
    var runTime = runCount/10;
    drawText(ctx, Vector(52,2), "Time: " + runTime.toFixed(1));
}