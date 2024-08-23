function votingBooth(age, parameters, callback) {
    console.log("A person has entered the voting booth");

    const isError = age < 18;
    const errorMessage = isError ? 
        'The person is not eligible to cast a vote' : 
        undefined;
    
    setTimeout(() => callback(isError, errorMessage, parameters), 1000);

    console.log("The person has exited the voting process");
}

const votingStatus = function (err, errorMessage, result) {
    if (err) {
        console.error(errorMessage);
        return;
    }

    console.log('Voting status is: ', result);
}

votingBooth(25, 'The person is eligible to cast the vote', votingStatus);

console.log('I/O operation is complete');