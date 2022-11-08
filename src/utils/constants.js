export default {
    timerEnabled: process.env.VUE_APP_ENABLE_TIMER == "yes" ? true :  false,
    timeSpan: process.env.VUE_APP_TIMESPAN_IN_SECONDS,
    squareSize: process.env.VUE_APP_SQUARE_SIZE_PX,
    unitRow: process.env.VUE_APP_SQUARE_UNIT_ROW,
    scoreIncrementBy: process.env.VUE_APP_SCORE_INCREMENT_BY,
    defaultRobotDirection: process.env.VUE_APP_DEFAULT_ROBOT_DIRECTION
}