import { GetCourses, WriteCourses, GetCourseById } from '../controllers/courses.controller.js';

const CoursesRoute = (app) => {
    app.get('/api/courses', GetCourses);
    app.get('/api/courses/new', WriteCourses)
    app.get('/api/courses/:id', GetCourseById)
}

export default CoursesRoute;