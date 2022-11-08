const coordinates = [
    {
        direction: "left",
        keyCode: 37,
        move: {
            x: -1,
            y: 0
        },
        angle: -90,
        angleLeft: -90,
        angleRight: 270
    },
    {
        direction: "top",
        keyCode: 38,
        move: {
            x: 0,
            y: -1
        },
        angle: 0,
        angleLeft: 0,
        angleRight: 0
    },
    {
        direction: "right",
        keyCode: 39,
        move: {
            x: 1,
            y: 0
        },
        angle: 90,
        angleLeft: -270,
        angleRight: 90
    },
    {
        direction: "bottom",
        keyCode: 40,
        move: {
            x: 0,
            y: 1
        },
        angle: 180,
        angleLeft: -180,
        angleRight: 180
    }
]
export default coordinates