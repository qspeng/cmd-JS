const readline = require('readline');
const task1 = require('./task1');
const task2 = require('./task2');

let clazzs = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1~3）：'
});

const getInput = () => {
    rl.prompt();
    rl.on('line', (line) => {
        switch (line.trim()) {
            case '1':
                handleAddStudent('请输入学生信息（格式：姓名,学号,名族,班级,学科:成绩,...\n');
                break;
            case '2':
                handlePrintStuInfo('请输入要打印的学生的学号（格式：学号，学号,...）\n');
                break;
            case '3':
                rl.close();
            default:
                console.log(`error input:'${line.trim()}'`);
                break;
        }

    }).on('close', () => {
        console.log('quit!');
        process.exit(0);
    });
};

const handleAddStudent = (outputInfo) => {
    rl.question(outputInfo, (studentStr) => {
        let student = task1.getStudentInfo(studentStr);
        if (student !== null) {
            task1.updateClazzs(clazzs, student);
            console.log(`学生${student.name}的成绩被添加`);
            rl.prompt();
            return;
        } else {
            outputInfo = '请按正确的格式输入（格式：姓名,学号,名族,班级,学科:成绩,...\n';
            handleAddStudent(outputInfo);
        }
    });
};


const handlePrintStuInfo = (outputInfo) => {
    rl.question(outputInfo, (stuNos) => {
        let stuNoList = task2.getStudentNo(stuNos);
        let stuClazzInfo = task2.getClassInfo(clazzs, stuNoList);
        if (stuClazzInfo.length === 0) {
            outputInfo = '请按正确的格式输入要打印的学生的学号（格式：学号，学号,...）\n';
            handlePrintStuInfo(outputInfo);
        } else {
            let clazzStrInfo = task2.getPrintInfo(stuClazzInfo);
            console.log(clazzStrInfo);
            rl.prompt();
            return;
        }
    });
};

getInput();