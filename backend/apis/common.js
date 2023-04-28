const jwt = require('jsonwebtoken');

function isAuthentic(request) {
    const jwtPayload = request.cookies.userToken;
    if(!jwtPayload) {
        return false;
    }

    let decryptedJwtPayload;
    try {
        decryptedJwtPayload = jwt.verify(jwtPayload, "Camille's password");
    } catch(e) {
        console.error(e);
        return false;
    }

    const {userId, username} = decryptedJwtPayload;
    if(!userId || !username) {
        console.info(`UserId ${userId} or username ${username} is null.`)
        return false;
    } else {
        return true;
    }
}
function isAuthorized(request, userId) {
    if (!isAuthentic(request)) {
        return false
    }
    const jwtPayload = request.cookies.userToken;
    const decryptedJwtPayload = jwt.verify(jwtPayload, "Camille's password");
    return userId === decryptedJwtPayload.userId;
}

exports.isAuthentic = isAuthentic;
exports.isAuthorized = isAuthorized;