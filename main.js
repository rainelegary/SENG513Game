/* Course: SENG 513 */
/* Date: OCT 12, 2023 */
/* Assignment 2 */
/* Name: Raine Legary */
/* UCID: 30123317 */

document.addEventListener("DOMContentLoaded", function () {

    class Player {

        constructor() {
            // instance variables:
            // player number
            // player color
            // set of owned tiles
            // wind direction
            // offense and defense stats
            // deploying/gathering modes
        }

        reset_vars() {
            // return all values to default (for when a new game is created)
        }
    }

    // game variables:
    // player count
    // array of players
    // board state (owner of each tile)


    const wind_btn = document.getElementById("wind-dir-circle");
    const off_def_sldr = document.getElementById("off-def-sldr");
    const deploy_btn = document.getElementById("deploying-button");
    const gather_btn = document.getElementById("gathering-button");
    const done_turn_btn = document.getElementById("done-turn-button");
    const new_game_btn = document.getElementById("new-game-button");
    const two_p_btn = document.getElementById("2-player-button");
    const four_p_btn = document.getElementById("4-player-button");
    const board_elmnt = document.getElementById("board");


    // switch wind direction
    wind_btn.addEventListener("click", function () {
        // update wind direction variable

        // change displayed wind direction
    });


    // update offense/defense
    off_def_sldr.addEventListener("input", function () {
        // value
    });

    // switch from gathering to deploying
    gather_btn.addEventListener("click", function () {

    });

    // switch from deploying to gathering
    deploy_btn.addEventListener("click", function () {

    });

    // respond to gather/deploy action
    board_elmnt.addEventListener("click", function () {
        // determine legality of move
        // update board state
        // change tile color
        // update number of units
    });

    // done turn
    done_turn_btn.addEventListener("click", function () {
        // run simulation
        // switch current player color
        // update UI elements according to player vars
    });

    // new game
    // - 2 players
    // - 4 players

    new_game_btn.addEventListener("click", function () {
        // show/hide 2 and 4 player buttons
    });

    two_p_btn.addEventListener("click", function () {
        // new game with 2 players

        // hide 2 and 4 player buttons
    });

    four_p_btn.addEventListener("click", function () {
        // new game with 4 players

        // hide 2 and 4 player buttons
    });

    // initialize game
    function initialize_game() {
        // return board to starting state   
        // set number of players
        // reset player objects to default parameters
        // update UI elements as necessary
    }

    // display winner when game ends
    function game_over() {

    }

    // run simulation
    function run_simulation(player_num) {
        // conquest chance = alpha * sqrt(offense)
        // decay rate = (1 - defense) / 4
        // attack success odds = (1 + attacker.offense) : (1 + defender.defense)

        // offense
        // - higher expansion rate
        // - higher decay rate
        // - lower chance of defending successfully
        // - higher chance of conquering successfully
    }

    // get all tiles adjacent to given tile
    function get_adjacent(tile) {

    }

    // update tile state
    function update_tile_state(tile) {

    }

});