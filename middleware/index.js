var middlewareObj = {};

middlewareObj.action = function (req, res, next) {

    return next();

    // const token =
    //     req.body.token || req.query.token || req.headers["x-access-token"];



    // if (!token) {
    //     return res.json({ state: false, message: "A token is required for authentication", is_login: false });
    // }
    // try {
    //     const decoded = jwt.verify(token, config.app.TOKEN_KEY);
    //     req.user = decoded;
    //     //  console.log(req.user);
    // } catch (err) {
    //     return res.json({ state: false, message: "Invalid Token", is_login: false });
    // }
    // return next();
};

module.exports = middlewareObj;