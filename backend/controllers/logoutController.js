const User = require("../models/user")

const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = User.findOne({"userRefreshToken":  refreshToken});

    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    };

    User.findOneAndDelete({"userRefreshToken": refreshToken});

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);

};

module.exports={ handleLogout };
