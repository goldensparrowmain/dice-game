/**
 * CONSTANTS 
 */
const simulation_count = 10000; // define the simulation count
const no_of_dice = 5; // define the number of dice
const wildcard_roll_number = 3; // define the wildcard number, which we have to exculde

/**
 * Function Definitions
 */

// Function to roll a given number of dice
const all_dice_roll = (total_dice) => {
    min = Math.ceil(1);
    max = Math.floor(7);
    const rolls = [];
    for (var i = 0; i < total_dice; i++) {
        const current_roll = Math.floor(Math.random() * (max - min)) + 1;
        rolls[i] = current_roll;
    }
    return rolls;
}


// Function to track the lowest total value based on dice rolls and wildcard rules
const lowest_total_tracker = () => {
    let total_dice = no_of_dice;
    let total = 0;
    while (total_dice >= 1) {
        let roll = all_dice_roll(total_dice);
        if (roll.includes(wildcard_roll_number)) {
            let dice_to_remove = roll.filter((val) => (val === wildcard_roll_number)).length;
            total_dice -= dice_to_remove;
        } else {
            console.log(roll);
            total += Math.min(...roll);
            total_dice--;
        }
    }
    return total;
}

// Function to run the simulation and print results
const simulation = () => {
    let no_of_possible_totals = (6 * no_of_dice) + 1;
    let tracker = [];
    for (var i = 0; i < no_of_possible_totals; i++) {
        tracker[i] = 0;
    }
    for (var i = 0; i < simulation_count; i++) {
        let occurrence = lowest_total_tracker();
        tracker[occurrence]++;
    }
    console.log("Number of simulations was ", simulation_count, " using ", no_of_dice, " dice.");
    for (var i = 0; i < no_of_possible_totals; i++) {
        console.log("Total ", i, " occurs ", tracker[i] / simulation_count, " occurred ", tracker[i], " times.");
    }
}

// Execute the simulation
simulation();
