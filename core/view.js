const view = (function () {
    const diceBtn = document.querySelector('.dice-btn');
    const player = document.querySelector('.player');

    function bind(type, handler) {
        if (type == 'dice') {
            diceBtn.addEventListener('click', function () {
                diceBtn.disabled = true;
                handler();
            })
        };
    };

    async function movePlayer(route, playerData) {
        if (!route || route.length == 0) {
            return;
        }

        return new Promise(async (res, rej) => {
            const from = playerData.prev;
            const to = playerData.curr;
            const jumpingRoute = Array.from({ length: to - from + 1 }, (a, idx) => idx + from);
            for (let i = 0; i < jumpingRoute.length; i++) {
                let endRoute = route.filter((r) => r.no == jumpingRoute[i]);
                if (!endRoute[0] && playerData.isGoalIn) {
                    endRoute = route.filter((r) => r.no == 0);
                }

                if (i != 0) {
                    await jump(endRoute);
                }

                if (i == jumpingRoute.length - 1 || jumpingRoute[i] > 13) {
                    diceBtn.disabled = false;
                    return res();
                }
            };
        })
    };

    function jump(endRoute) {
        return new Promise((res, rej) => {
            let direaction = endRoute[0].direction;
            if (endRoute[0].no == 0) {
                direaction = 'left';
            }

            switch (direaction) {
                case 'top':
                    player.style.top = parseInt(player.style.top || 40) - 30 + 'px'; // 40 = player default css top
                    player.style.left = parseInt(player.style.left || 35) + 55 + 'px'; // 35 = player default css left
                    break;

                case 'right':
                    player.style.top = parseInt(player.style.top) + 55 + 'px';
                    player.style.left = parseInt(player.style.left) + 30 + 'px';
                    break;

                case 'bottom':
                    player.style.top = parseInt(player.style.top) - 30 + 'px';
                    player.style.left = parseInt(player.style.left) - 55 + 'px';
                    break;

                case 'left':
                    player.style.top = parseInt(player.style.top) - 55 + 'px';
                    player.style.left = parseInt(player.style.left) - 30 + 'px';
                    break;
            };

            setTimeout(() => {
                player.style.top = endRoute[0].y + 'px';
                player.style.left = endRoute[0].x + 'px';
                setTimeout(() => {
                    res();
                }, 300);
            }, 300);
        });

    };

    return {
        bind,
        movePlayer,
    }
})();

export default view;