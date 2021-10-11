import faker from 'faker'
import fs from 'fs'

const Course = function (course) {
    this.courseId = course.id;
    this.courseName = course.name;
    this.courseDescription = course.description;
    this.teacher = course.teacher;
    this.videos = course.videos;
    this.students = course.students;
    this.rate = course.rate;
    this.createdAt = course.createdAt;
    this.featuredImage = course.cover;
}
const courses = [];

const comments = () => {
    const commentsArr = [];
    for (let v = 0; v < Math.floor(Math.random() * 25) + 1; v++) {
        commentsArr.push({
            commentId: faker.datatype.uuid(),
            commentText: faker.random.words(Math.floor(Math.random() * 300) + 50),
            studentId: faker.datatype.uuid(),
        })
    }

    return commentsArr;
};

const students = () => {
    const studentsArr = [];
    for (let s = 0; s < Math.floor(Math.random() * 40) + 1; s++) {
        studentsArr.push({
            studentId: faker.datatype.uuid(),
            studnetName: faker.name.findName(),
            avatar: faker.internet.avatar()
        })
    }

    return studentsArr
};

const videos = () => {
    const videosArr = [];
    for (let j = 0; j < Math.floor(Math.random() * 100) + 10; j++) {
        videosArr.push({
            videoId: faker.datatype.uuid(),
            videoTitle: faker.random.words(Math.floor(Math.random() * 5) + 1),
            videoURI: faker.internet.url(),
            comments: comments(),
            attachments: faker.system.commonFileName('pdf'),
            cover: faker.random.image()
        })
    }

    return videosArr
};

export const WriteCourses = (req, res) => {
    let CourseObject = '';
    for (let i = 0; i < 300; i++) {
        CourseObject = new Course({
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            description: faker.random.words(Math.floor(Math.random() * 200) + 40),
            teacher: faker.name.findName(),
            videos: videos(),
            students: students(),
            rate: faker.datatype.number(5),
            createdAt: faker.date.between('2019', '2021').toLocaleString(),
            cover: faker.random.image()
        })
        courses.push(CourseObject)
    }

    let data = JSON.stringify(courses, null, 2);

    fs.writeFile('./api.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    res.send(data)
}

export const GetCourses = (req, res) => {
    let rawdata = fs.readFileSync('./api.json');
    let apiCourses = JSON.parse(rawdata);
    res.send(apiCourses)
}

export const GetCourseById = (req, res) => {
    let rawdata = fs.readFileSync('./api.json');
    let apiCourses = JSON.parse(rawdata);
    let coursesById = apiCourses.filter(course => {
        return course.courseId === req.params.id
    })

    res.send(coursesById)
}