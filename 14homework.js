class Student {
    constructor(name, surname, birthYear, course) {
        this.name = name;
        this.surname = surname;
        this.birthYear = birthYear;
        this.course = course;
        this.grades = [];
        this.attendance = [];
        this.courses = [course];
    }
    addGrade(grade) {
        this.grades.push(grade);
    }
    addAttendance(attended) {
        if (this.attendance.length < this.course) {
            this.attendance.push(attended);
        } else {
            console.log('Лимит посещений для текущего курса исчерпан.');
        }
    }
    getAverageGrade() {
        if (this.grades.length === 0) return 0;
        return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length;
    }
    getAverageAttendance() {
        if (this.attendance.length === 0) return 0;
        return this.attendance.filter(a => a).length / this.attendance.length;
    }
    getCompletedLessons() {
        return this.attendance.length;
    }
    changeCourse(newCourse) {
        this.course = newCourse;
        this.grades = [];
        this.attendance = [];
    }
    addCourse(newCourse) {
        if (!this.courses.includes(newCourse)) {
            this.courses.push(newCourse);
        }
    }
    removeCourse(course) {
        this.courses = this.courses.filter(c => c !== course);
        if (this.course === course) {
            this.changeCourse(this.courses[0] || null);
        }
    }
    getInfo() {
        return {
            name: this.name,
            surname: this.surname,
            birthYear: this.birthYear,
            currentCourse: this.course,
            courses: this.courses,
            averageGrade: this.getAverageGrade(),
            averageAttendance: this.getAverageAttendance(),
            completedLessons: this.getCompletedLessons()
        };
    }
}
class Group {
    constructor() {
        this.students = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    removeStudent(student) {
        this.students = this.students.filter(s => s !== student);
    }
    getPerformanceRating() {
        return this.students
            .sort((a, b) => b.getAverageGrade() - a.getAverageGrade())
            .map(student => ({
                name: `${student.name} ${student.surname}`,
                averageGrade: student.getAverageGrade()
            }));
    }
    getAttendanceRating() {
        return this.students
            .sort((a, b) => b.getAverageAttendance() - a.getAverageAttendance())
            .map(student => ({
                name: `${student.name} ${student.surname}`,
                averageAttendance: student.getAverageAttendance()
            }));
    }
}
const student1 = new Student('Роман', 'Кирпиченко', 1995, 3);
const student2 = new Student('Петр', 'Кирпиченко', 1989, 2);
student1.addGrade(5);
student1.addGrade(4);
student1.addAttendance(true);
student1.addAttendance(false);

student2.addGrade(3);
student2.addGrade(4);
student2.addAttendance(true);
const group = new Group();
group.addStudent(student1);
group.addStudent(student2);

console.log('Информация о студентах:', student1.getInfo(), student2.getInfo());
console.log('Рейтинг по успеваемости:', group.getPerformanceRating());
console.log('Рейтинг по посещаемости:', group.getAttendanceRating());
