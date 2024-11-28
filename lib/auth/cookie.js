function agregarCookieJwt(res, token) {
    res.cookie("JWT_TOKEN", token, {
        httpOnly: true,
        sameSite: true
    })
}


function limpiarCookieJwt(res) {
    res.clearCookie("JWT_TOKEN")
}

module.exports = {
    agregarCookieJwt,
    limpiarCookieJwt
}