const model = (function () {
    const route = [{
        no: 0,
        x: 35,
        y: 40,
        direction: 'top'
    },
    {
        no: 1,
        x: 145,
        y: 40,
        direction: 'top'
    },
    {
        no: 2,
        x: 255,
        y: 40,
        direction: 'top'
    },
    {
        no: 3,
        x: 365,
        y: 40,
        direction: 'top'
    },
    {
        no: 4,
        x: 475,
        y: 40,
        direction: 'top'
    },
    {
        no: 5,
        x: 475,
        y: 140,
        direction: 'right'
    },
    {
        no: 6,
        x: 475,
        y: 240,
        direction: 'right'
    },
    {
        no: 7,
        x: 475,
        y: 340,
        direction: 'right'
    },
    {
        no: 8,
        x: 365,
        y: 340,
        direction: 'bottom'
    },
    {
        no: 9,
        x: 255,
        y: 340,
        direction: 'bottom'
    },
    {
        no: 10,
        x: 145,
        y: 340,
        direction: 'bottom'
    },
    {
        no: 11,
        x: 35,
        y: 340,
        direction: 'bottom'
    },
    {
        no: 12,
        x: 35,
        y: 240,
        direction: 'left'
    },
    {
        no: 13,
        x: 35,
        y: 140,
        direction: 'left'
    }];

    let player = {
        count: 0,
        dice: 0,
        prev: 0,
        curr: 0,
        isGoalIn: false,
        reset: function () {
            this.count = 0;
            this.dice = 0;
            this.prev = 0;
            this.curr = 0;
            this.isGoalIn = false;
        }
    };

    function update(num, callback) {
        player.count++;
        player.dice = num;
        player.prev = player.curr;
        player.curr = player.prev + num;

        if (player.curr > 13) {
            player.isGoalIn = true;
        }

        if (callback) {
            callback(route, player);
        }
    };

    function reset() {
        if (!player.isGoalIn) {
            return;
        };

        player.reset();
    };

    return {
        update,
        reset
    }
})();

export default model;