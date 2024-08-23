const middleWareWrapper = (callback) =>
    (request, response, next) => {
        Promise.resolve(callback(request, response, next))
        .catch(
            (err) => next(err)
        );
    };

    const timeout = (milliSeconds) => new Promise(resolve => {
        setTimeout(() => resolve(), milliSeconds);
    });

module.exports = { middleWareWrapper, timeout };