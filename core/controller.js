import Model from './model.js';
import View from './view.js';

(function() {
    const model = Model;
    const view = View;

    init();
    
    function init() {
        view.bind('dice', rollDice);
    };

    function rollDice() {
        const num = Math.floor(Math.random() * 6) + 1;

        model.update(num, async function(route, player) {
            await view.movePlayer(route, player);
            model.reset();
        });
    };
})();