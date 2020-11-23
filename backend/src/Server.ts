import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"
import helmet from "helmet"

import express, { NextFunction, Request, Response } from "express"
import StatusCodes from "http-status-codes"
import "express-async-errors"

import BaseRouter from "./routes/api"
import logger from "@shared/Logger"

const app = express()
const { BAD_REQUEST } = StatusCodes

// cors 문제 해결
import cors from "cors"
app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

// body-parser 추가
import bodyParser from "body-parser"
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB Connection Test
import "reflect-metadata"
import { createConnection } from "typeorm"
import { User } from "./entity/User"

createConnection()
    .then(async (connection) => {
        console.log("Inserting a new user into the database...")
        const user = new User()
        user.firstName = "Timber"
        user.lastName = "Saw"
        user.age = 25
        await connection.manager.save(user)
        console.log("Saved a new user with id: " + user.id)

        console.log("Loading users from the database...")
        const users = await connection.manager.find(User)
        console.log("Loaded users: ", users)

        console.log("Here you can setup and run express/koa/any other framework.")
    })
    .catch((error) => console.log(error))

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Security
if (process.env.NODE_ENV === "production") {
    app.use(helmet())
}

// Add APIs
app.use("/api", BaseRouter)

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true)
    return res.status(BAD_REQUEST).json({
        error: err.message,
    })
})

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, "views")
app.set("views", viewsDir)
const staticDir = path.join(__dirname, "public")
app.use(express.static(staticDir))
app.get("*", (req: Request, res: Response) => {
    res.sendFile("index.html", { root: viewsDir })
})

// Export express instance
export default app
