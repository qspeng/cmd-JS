const HINTS = {
    DEFAULT_INFO: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1~3）：',
    ADDITION_INFO: '请输入学生信息（格式：姓名,学号,名族,班级,学科:成绩,...\n',
    STU_INPUT_INFO: '请输入要打印的学生的学号（格式：学号，学号,...）\n',
    ADDITION_ERR_INFO: '请按正确的格式输入（格式：姓名,学号,名族,班级,学科:成绩,...\n',
    STU_INPUT_ERROR_INFO: '请按正确的格式输入要打印的学生的学号（格式：学号，学号,...）\n',
    QUIT_INFO: 'Bye!',
    ERROR_ORDER_INFO: '命令错误!请重新选择\n'
};

const STATE = {
    SHOW_ORDER: 0,
    ADD: 1,
    PRINT: 2,
    QUIT: 3
};

const ORDER = {
    ADD: '1',
    PRINT: '2',
    QUIT: '3'
};

const ORDER_MAP_ROUTER = new Map();
ORDER_MAP_ROUTER.set(ORDER.ADD,{state: STATE.ADD, hintInfo: HINTS.ADDITION_INFO});
ORDER_MAP_ROUTER.set(ORDER.PRINT,{state: STATE.PRINT, hintInfo: HINTS.STU_INPUT_INFO});
ORDER_MAP_ROUTER.set(ORDER.QUIT,{state: STATE.QUIT, hintInfo: HINTS.QUIT_INFO});
ORDER_MAP_ROUTER.set('DEFAULT',{state: STATE.SHOW_ORDER, hintInfo: HINTS.ERROR_ORDER_INFO + HINTS.DEFAULT_INFO});


module.exports = {
    HINTS,
    STATE,
    ORDER,
    ORDER_MAP_ROUTER
};