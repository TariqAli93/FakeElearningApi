import express from 'express'
import history from 'connect-history-api-fallback'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import CoursesRoute from './api/routes/courses.route.js'

const App = express()
App.use(cors())
App.use(cookieParser())
App.use(express.json())
App.use(express.urlencoded({ extended: false }))


CoursesRoute(App)

App.use(
    history({
        disableDotRule: true,
        verbose: true
    })
)

App.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running on http://localhost:${process.env.PORT || 5000}`)
})