// clock_mode : SETTING / COUNT_DOWN / PAUSE
let clock_mode = "" 
let bg: Image = null
let numSecond = 0
let stringTemp = ""
let cursor_position = 0

initVariables()
function initVariables() {
    numSecond = 0
    cursor_position = 0
    clock_mode = "SETTING"
}
function drawClock() {
    bg = image.create(screen.width, screen.height)
    bg.print("Arrows = set clock", 0, 0, 5, image.font8);
    bg.print("A = Start / Pause",0,10,5, image.font8);
    bg.print("MM:SS", 40,40,  5, image.doubledFont(image.font8))
    bg.print(convertCounterToTime(), 40, 55, 5, image.doubledFont(image.font8))
    
    stringTemp = ""
    for (let index = 0; index <= 4; index++) {
        if (index == cursor_position) {
            stringTemp = "" + stringTemp + "^"
        } else {
            stringTemp = "" + stringTemp + " "
        }
    }

    bg.print(stringTemp, 40,70, 5, image.doubledFont(image.font8))
    scene.setBackgroundImage(bg)
}
function convertCounterToTime() {
    if (numSecond <0) {
        numSecond=0
    }
    const minutes = Math.floor(numSecond / 60);
    const remainingSeconds = numSecond % 60;
    const formattedMinutes = (minutes <10) ? "0"+minutes:minutes;
    const formattedSeconds = (remainingSeconds <10) ? "0"+remainingSeconds:remainingSeconds;
    return formattedMinutes+":"+formattedSeconds;
}
game.onUpdateInterval(1000, function () {
    if (clock_mode == "SETTING") {
        
    } else if (clock_mode == "COUNT_DOWN") {
        numSecond -= 1
        if (numSecond == -1) {
            game.setGameOverMessage(true, "Time up !")
            game.gameOver(true)
            initVariables()
        }
    } else if (clock_mode == "PAUSE") {
        
    }
    drawClock()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == "SETTING") {
        if (cursor_position > 0) {
            cursor_position += -1
            if (cursor_position == 2) {
                cursor_position = 1
            }
        } else {
            cursor_position = 0
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == "SETTING") {
        if (cursor_position < 4) {
            cursor_position += 1
            if (cursor_position == 2) {
                cursor_position = 3
            }
        } else {
            cursor_position = 4
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == "SETTING") {
        if (cursor_position == 2) {
            return
        } else if (cursor_position == 4 ) {
            numSecond += 1
        } else if (cursor_position == 3 ) {
            numSecond += 10
        } else if (cursor_position == 1 ) {
            numSecond += 60
        } else if (cursor_position == 0 ) {
            numSecond += 600
        } 
        // range check
        if (numSecond < 0 ) {
            numSecond = 0
        } else if (numSecond > 59 * 60 + 59){
            numSecond = 59 * 60 + 59
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == "SETTING") {
        if (cursor_position == 2) {
            return
        } else if (cursor_position == 4) {
            numSecond -= 1
        } else if (cursor_position == 3 ) {
            numSecond -= 10
        } else if (cursor_position == 1 ) {
            numSecond -= 60
        } else if (cursor_position == 0 ) {
            numSecond -= 600
        } 
        // range check
        if (numSecond < 0 ) {
            numSecond = 0
        } else if (numSecond > 59 * 60 + 59){
            numSecond = 59 * 60 + 59
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == "SETTING") {
        clock_mode = "COUNT_DOWN"
    } else if (clock_mode == "COUNT_DOWN") {
        clock_mode = "PAUSE"
    } else if (clock_mode == "PAUSE") {
        clock_mode = "COUNT_DOWN"
    }
})