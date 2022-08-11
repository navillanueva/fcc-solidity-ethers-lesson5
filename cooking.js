// Setup Movie Night

// Cook popcorn
// Pour Drinks
// Start Movie

// We have to wait until the promise of the function cookPopcron is fullfilled
// To fix this issue, we change the function setupMovieNigh() to a async function

async function setupMovieNight() {
    await cookPopcorn() // with the AWAIT keyword we make it so that it only when the promise for these two functions
    await pourDrinks() // is fullfilled, the the function startMovie() will execute
    startMovie()
}

// AWAIT can only be used in asynchronous functions

function cookPopcorn() {
    // some code here
    return Promise(/* some code here */)
}
