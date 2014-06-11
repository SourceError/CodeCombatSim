/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////


function chooseActionSimple()
{
    var player = this;

    var allItems = player.getItems();
    var closest = {distTo: 1000};
    allItems.forEach(function (item) {
        item.distTo = player.distance(item);
        if(item.distTo < closest.distTo)
            closest = item;
    });

    if (closest.id !== undefined)
    {
        player.move(closest.pos);
        drawLine(ctx, player.pos, closest.pos, player.color);
    }
}


/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////


function chooseActionBestItem()
{
    var player = this;

    var allItems = player.getItems();
    var best = {h:0};
    allItems.forEach(function (item) {
        item.h = item.bountyGold/player.distance(item.pos);
        if(item.h > best.h)
        {
            best = item;
        }
    });

    if (best.h > 0)
    {
        player.move(best.pos);
        drawLine(ctx, player.pos, best.pos, player.color);
    }
}


/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////