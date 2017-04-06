const Transform = require('./Transform');
const ManagementService = require('./ManagementService');
const {HINTS, STATE, ORDER_MAP_ROUTER} = require('./MessageCfg');

class StudentManagement {
    constructor() {
        this.state = STATE.SHOW_ORDER;
        this.hintInfo = HINTS.DEFAULT_INFO;
        this.managementService = new ManagementService();
    }

    handleState(userInput) {
        let router = {};
        switch (this.state) {
            case STATE.SHOW_ORDER:
                router = this.handleOrder(userInput);
                break;
            case STATE.ADD:
                router = this.addStudent(userInput);
                break;
            case STATE.PRINT:
                router = this.printClazz(userInput);
                break;
        }
        this.state = router.state;
        this.hintInfo = router.hintInfo;
    }

    handleOrder(order) {
        if (ORDER_MAP_ROUTER.has(order)) {
            return ORDER_MAP_ROUTER.get(order);
        }
        return ORDER_MAP_ROUTER.get('DEFAULT');
    }

    addStudent(stuStrInfo) {
        let student = this.managementService.addStudent(stuStrInfo);
        if (student) {
            return {state: STATE.SHOW_ORDER, hintInfo: `学生${student.name}的成绩被添加\n` + HINTS.DEFAULT_INFO};
        }
        return {state: STATE.ADD, hintInfo: HINTS.ADDITION_ERR_INFO};
    }

    printClazz(stuNoStrInfo) {
        const stuClazzInfo = this.managementService.printClazz(stuNoStrInfo);
        if (stuClazzInfo.length === 0) {
            return {state: STATE.PRINT, hintInfo: HINTS.STU_INPUT_ERROR_INFO};
        }
        return {
            state: STATE.SHOW_ORDER,
            hintInfo: Transform.getPrintInfo(stuClazzInfo) + '\n' + HINTS.DEFAULT_INFO
        };
    }
}

module.exports = StudentManagement;