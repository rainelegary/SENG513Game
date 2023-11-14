/* Course: SENG 513 */
/* Date: OCT 12, 2023 */
/* Assignment 2 */
/* Name: Raine Legary */
/* UCID: 30123317 */

document.addEventListener("DOMContentLoaded", function () {

    /**
     * This is the Player class, and each player is represented by an instance of it. 
     * It acts as a data container for each player's owned tiles and their current stats.
     */
    class Player {
        constructor(pnum) {
            this.PNUM = pnum;
            this.COLOR = PLAYER_COLORS[pnum];
            this.owned_tiles = new Set();
            this.wind_deg = 0;
            this.wind_vec = [0, 1];
            this.def_off = 0.5;
            this.deploying = true;
            this.units = 0;
        }

        /**
         * The reset_vars function resets the player's stats to default and sets their owned tiles back to the empty set.
         * This is only called when a new game is created.
         */
        reset_vars() {
            this.owned_tiles = new Set();
            this.wind_deg = 0;
            this.def_off = 0.5;
            this.deploying = true;
            this.units = 0;
        }
    }

    const BOARD_SIZE = 10; // board size is determined here
    const SPAWN_LOCS = [ // these are the locations where each player spawns
        [
            [1, 1], 
            [1, 2], 
            [2, 1]
        ],
        [
            [BOARD_SIZE - 2, BOARD_SIZE - 2], 
            [BOARD_SIZE - 2, BOARD_SIZE - 3], 
            [BOARD_SIZE - 3, BOARD_SIZE - 2]
        ],
        [
            [1, BOARD_SIZE - 2], 
            [1, BOARD_SIZE - 3], 
            [2, BOARD_SIZE - 2]
        ],
        [
            [BOARD_SIZE - 2, 1], 
            [BOARD_SIZE - 2, 2], 
            [BOARD_SIZE - 3, 1]
        ]
    ];
    const PLAYER_COLORS = ["#d5ab36", "#2491b8", "#5a4acf", "#cd4d23"];
    const TILE_COLOR = "#226f3a";

    const DEPLOYMENT_COST = 20;
    const GATHER_REFUND = 10;
    const DECAY_RATE = 1 / 30;
    
    let players = [new Player(0), new Player(1), new Player(2), new Player(3)];
    let players_in = new Set([0, 1, 2, 3]);
    let num_players = 4;
    let current_player = 0;
    let board_state = [];

    /**
     * buttons
     */
    const wind_btn = document.getElementById("wind-dir-circle");
    const wind_dir_img = document.getElementById("wind-dir-img");
    const def_off_sldr = document.getElementById("def-off-sldr");
    const deploy_btn = document.getElementById("deploying-button");
    const gather_btn = document.getElementById("gathering-button");
    const units_count_elmnt = document.getElementById("units-count");
    const done_turn_btn = document.getElementById("done-turn-button");
    const new_game_btn = document.getElementById("new-game-button");
    const two_p_btn = document.getElementById("2-player-button");
    const four_p_btn = document.getElementById("4-player-button");
    const grid_elmnt = document.getElementById("grid");


    // switch wind direction
    wind_btn.addEventListener("click", function () {
        players[current_player].wind_deg += 90;
        players[current_player].wind_vec = [
            Math.round(Math.sin(players[current_player].wind_deg * Math.PI / 180)), 
            Math.round(Math.cos(players[current_player].wind_deg * Math.PI / 180))
        ]

        // update UI
        wind_dir_img.style.transform = `rotate(${players[current_player].wind_deg}deg)`;
    });

    // update offense/defense
    def_off_sldr.addEventListener("input", function () {
        // update defense/offense value
        players[current_player].def_off = def_off_sldr.value / 100
    });

    // switch from gathering to deploying
    gather_btn.addEventListener("click", function () {
        players[current_player].deploying = true;
        gather_btn.style.display = "none";
        deploy_btn.style.display = "block";
    });

    // switch from deploying to gathering
    deploy_btn.addEventListener("click", function () {
        players[current_player].deploying = false;
        gather_btn.style.display = "block";
        deploy_btn.style.display = "none";
    });

    // respond to gather/deploy action
    grid_elmnt.addEventListener("click", function(event) {
        const tile = event.target;
        const row = parseInt(tile.dataset.row);
        const col = parseInt(tile.dataset.col);

        if (
            (players[current_player].deploying) // player in deploying mode
            && (get_tile_owner([row, col]) == -1) // tile empty
            && (players[current_player].units >= DEPLOYMENT_COST) // enough units
        ) {
            // deploy
            update_tile_owner([row, col], current_player);
            players[current_player].units -= DEPLOYMENT_COST;
            units_count_elmnt.textContent = `Units: ${players[current_player].units}`
        }

        if (
            (!players[current_player].deploying) // player in gathering mode
            && (get_tile_owner([row, col]) == current_player) // player owns this tile
        ) {
            // gather
            update_tile_owner([row, col], -1);
            players[current_player].units += GATHER_REFUND;
            units_count_elmnt.textContent = `Units: ${players[current_player].units}`
        }
    });

    // done turn
    done_turn_btn.addEventListener("click", function () {
        // run simulation
        run_simulation();
        
        // switch to next player who is still in the game
        let next_player = (current_player + 1) % num_players;
        while (!players_in.has(next_player)) {
            next_player = (next_player + 1) % num_players;
        }
            
        begin_turn(next_player);
    });

    function begin_turn(pnum) {
        current_player = pnum;

        // switch current player color
        const game_title_emlnt = document.getElementById("game-title")
        game_title_emlnt.style.color = PLAYER_COLORS[pnum];
        units_count_elmnt.style.color = PLAYER_COLORS[pnum];

        //update UI elements 
        wind_dir_img.style.transform = `rotate(
            ${players[pnum].wind_deg}deg
        )`;
        def_off_sldr.value = parseInt(players[pnum].def_off * 100);
        gather_btn.style.display = "block";
        deploy_btn.style.display = "none";
        players[pnum].deploying = false; // default to gathering mode
        units_count_elmnt.textContent = `Units: ${players[pnum].units}`
    }

    // new game (show 2 and 4 player buttons)
    new_game_btn.addEventListener("click", function () {
        // show/hide 2 and 4 player buttons
        if (two_p_btn.style.display == "block") {
            two_p_btn.style.display = "none";
            four_p_btn.style.display = "none";
        } else {
            two_p_btn.style.display = "block";
            four_p_btn.style.display = "block";
        }
    });

    two_p_btn.addEventListener("click", function () {
        // new game with 2 players
        initialize_game(2);

        // hide 2 and 4 player buttons
        two_p_btn.style.display = "none";
        four_p_btn.style.display = "none";
    });

    four_p_btn.addEventListener("click", function () {
        // new game with 4 players
        initialize_game(4);
        
        // hide 2 and 4 player buttons
        two_p_btn.style.display = "none";
        four_p_btn.style.display = "none";
    });

    // create the grid element
    function create_grid() {
        for (let i = 0; i < BOARD_SIZE; i++) {
            // create row
            board_state.push([])
            for (let j = 0; j < BOARD_SIZE; j++) {
                // populate row
                board_state[i].push(-1);
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.dataset.row = i; // coordinates
                tile.dataset.col = j;
                tile.dataset.owner = -1;
                grid_elmnt.appendChild(tile);
            }
        }
    }

    // initialize game
    function initialize_game(player_count) {

        // reset player variables
        for (let player of players) {
            player.reset_vars();
        }

        // update number of players
        num_players = player_count;

        // create set of players
        players_in = new Set();
        for (let i = 0; i < player_count; i++) {
            players_in.add(i);
        }

        // clear board
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                update_tile_owner([i, j], -1);
            }
        }

        // spawn locations
        for (let p = 0; p < num_players; p++) {
            for (let s of SPAWN_LOCS[p]) {
                update_tile_owner(s, p);
            }
        }

        // initialize player 0's turn 
        begin_turn(0);
    }

    // eliminate player
    function eliminate_player(pnum) {
        players_in.delete(pnum);
    
        // win condition
        if (players_in.size == 1) {
            game_over(players_in.values().next().value);
        }
    }

    // display winner when game ends
    function game_over(winner) {
        alert(`player ${winner} wins!`);
    }

    // run simulation
    function run_simulation() {
        // conquest chance = alpha * sqrt(offense)
        // decay rate = (1 - defense) / 4
        // attack success odds = (1 + attacker.offense) : (1 + defender.defense)

        // offense
        // - higher expansion rate
        // - higher decay rate
        // - lower chance of defending successfully
        // - higher chance of conquering successfully

        // create array of owned locations to loop over
        // we will be adding elements to the owned tiles as we go, so we iterate over this instead
        let territory = [];
        for (let coords of players[current_player].owned_tiles) {
            territory.push(coords.split(',').map(coord => parseInt(coord.trim())));
        }

        // conquest attempts
        for (let coords of territory) {
            attempt_conquest(coords);
        }

        // created updated array of owned locations
        territory = [];
        for (let coords of players[current_player].owned_tiles) {
            territory.push(coords.split(',').map(coord => parseInt(coord.trim())));
        }

        // decay attempts
        for (let coords of territory) {
            attempt_decay(coords);
        }
    }

    /**
     * attempt conquest
     */
    function attempt_conquest(coords) {
        let off = players[current_player].def_off;
        let def = 1 - off;

        // determine if an attack will be attempted
        let try_val = Math.random();
        if (try_val > (off + 1) / 2) {
            // conquest failed
            return;
        }

        // determine possible neighbors to attack
        let wind_vec = players[current_player].wind_vec;
        let downwind = add_vecs(coords, wind_vec);
        let perpendicular = [...wind_vec].reverse();
        let side1 = add_vecs(coords, perpendicular);
        let side2 = add_vecs(coords, negate_vec(perpendicular));

        let locs = [downwind, downwind, side1, side2]; // 50% chance of choosing downwind, 25% for each side

        let ind = Math.floor(Math.random() * 4);
        let loc = locs[ind];

        // out of bounds
        if (
            !(loc[0] >= 0) || !(loc[0] < BOARD_SIZE) 
            || !(loc[1] >= 0) || !(loc[1] < BOARD_SIZE)
        ) {
            // out of bounds, nothing happens
            return;
        } 

        // get defender's defense stat
        let defender = get_tile_owner(loc);
        let defender_def = 0;
        if (defender == -1) {
            defender_def = 0;
        }
        else if (defender == current_player) {
            // no need to attack self; do nothing
            return;
        }
        else {
            defender_def = 1 - players[defender].def_off;
        }
        
        // determine if the attack is successful
        let successful = random_odds(1 + off, 1 + defender_def);
        if (!successful) {
            // unsuccessful
            return;
        }
        
        // successful conquest
        update_tile_owner(loc, current_player);

        // eliminate player
        if (defender != -1) {
            if (
                (players[defender].owned_tiles.size == 0)
                && (players[defener].units < DEPLOYMENT_COST)
            ) {
                eliminate_player(defender);
            }
        }

        // recursively attempt new conquest
        attempt_conquest(loc);
    }

    /**
     * attempt decay
     */
    function attempt_decay(coords) {

        // determine number of unfriendly naighbors
        let unfriendly = 0;
        let adj = get_adjacent(coords);
        for (let loc of adj) {
            let owner = get_tile_owner(loc);
            if (owner != current_player) {
                unfriendly += 1; // unfriendly if not owned by self
            }
        }

        // for each unfriendly neighbor, attempt decay
        for (let i = 0; i < unfriendly; i++) {
            let try_var = Math.random(); // randomization
            if (try_var < players[current_player].def_off * DECAY_RATE) {
                update_tile_owner(coords, -1); // successful decay
            }
        }
    }

    // get all tiles adjacent to given tile
    function get_adjacent(coords) {
        adj = [];
        for (let dir of [[0, 1] [1, 0], [0, -1], [-1, 0]]) { // directions
            let loc = add_vecs(coords, dir);
            if (
                (loc[0] >= 0) && (loc[0] < BOARD_SIZE) 
                && (loc[1] >= 0) && (loc[1] < BOARD_SIZE)
            ) {
                adj.push(loc);    
            }
        }
        return adj;
    }

    // get tile owner
    function get_tile_owner(coords) {
        const tile = document.querySelector(
            `[data-row="${coords[0]}"][data-col="${coords[1]}"]`
        );
        return tile.dataset.owner;
    }

    // update tile owner
    function update_tile_owner(coords, new_owner) {
        const tile = document.querySelector(
            `[data-row="${coords[0]}"][data-col="${coords[1]}"]`
        );
        let old_owner = parseInt(tile.dataset.owner);
        tile.dataset.owner = new_owner;
        
        // change tile color
        if (new_owner != -1) {
            tile.style.backgroundColor = PLAYER_COLORS[new_owner];
        } else {
            tile.style.backgroundColor = TILE_COLOR;
        }
        
        
        // update player's owned tiles
        if (old_owner != -1) {
            players[old_owner].owned_tiles.delete(coords.toString());
        } 

        if (new_owner != -1) {
            players[new_owner].owned_tiles.add(coords.toString());
        }

        // update board state
        board_state[coords[0]][coords[1]] = new_owner;
    }

    /**
     * a helper function for adding vectors
     */
    function add_vecs(u, v) {
        return [u[0] + v[0], u[1] + v[1]];
    }

    /**
     * a helper function for reversing a vector
     */
    function negate_vec(v) {
        return [-v[0], -v[1]];
    }

    /**
     * biased coin flip
     */
    function random_odds(t, f) {
        // t = odds of returning true
        // f = odds of returning false
        // t / (t + f) chance of returning "true"

        let x = Math.random() * (t + f);
        return (x < t);
    }

    // upon loading:
    create_grid(); // initialize board
    initialize_game(4); // new game
});