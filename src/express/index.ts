import express from 'express';
import {loginHandler} from "@/express/routes/loginHandler";
import {registrationHandler} from "@/express/routes/registrationHandler";
import {cookieMigrationMiddle} from "@/express/cookieMigrationMiddle"
import cookieParser from 'cookie-parser'
import {refreshTokenHandler} from "@/express/routes/refreshTokenHandler";
import {logoutHandler} from "@/express/routes/logoutHandler";
import {Configs} from "@/ConfigFile";

const ex = express()

ex.use(cookieParser())
ex.use(express.json())
ex.use(cookieMigrationMiddle)

ex.post(Configs.REQUEST_PREFIX + '/login', loginHandler)

ex.post(Configs.REQUEST_PREFIX + '/registration', registrationHandler)

ex.post(Configs.REQUEST_PREFIX + '/refresh', refreshTokenHandler)

ex.post(Configs.REQUEST_PREFIX + '/logout', logoutHandler)

/*ex.get(Configs.REQUEST_PREFIX + '', async (req, resp) => {
    setTimeout(() => {
        resp.json({a: 1, b: 2})
    }, 2000)
})*/

export default ex;