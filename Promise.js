/**
 * 1. use Promise function to get voting status
 * 2.Create a promise to simply return voting status
 */

const votingStatus = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve("Your Voting has been submitted Successfully"), 500);
});

(async function() {
    console.log('Casting Vote');
    await votingStatus();
})()

// const getVotingStatus = function() {
//     console.log('Casting Vote ');
//     votingStatus().then((status) => {
//         console.log(status);
//     });
// };

// getVotingStatus();