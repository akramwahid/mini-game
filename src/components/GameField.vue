<template>
    <div>
        <canvas ref="playarea" id="play-area" :width="playAreaSize" :height="playAreaSize"></canvas>

        <GameFieldRobot
                :imagePath="'../assets/robot.png'"
                :squareSize="squareSize"
                @drawRobot="initializeRobot"
                @moveRobot="moveRobot"
                @rotateRobot="rotateRobot"/>

        <GameFieldTarget @drawTarget="initializeTarget"/>
    </div>
</template>

<script>
    import coordinates from "../utils/helpers";

    import GameFieldRobot from "./GameFieldRobot"
    import GameFieldTarget from "./GameFieldTarget";

    export default {
        name: "GameField",
        components: {
            GameFieldRobot,
            GameFieldTarget
        },
        props: {
            squareSize: Number,
            unit: Number
        },
        data() {
            return {
                paddingBoard: 0,
                placeholder: [],
                direction: null,
                targetSquare: null,
                targetImage: null
            }
        },
        computed: {
            playAreaSize() {
                return (this.squareSize * this.unit) + (this.paddingBoard * 2) + 1;
            }
        },

        mounted() {
            this.boardContext = this.$refs.playarea.getContext("2d");
            this.drawBoard();
        },

        methods: {
            //initialize the robot and place it in center
            initializeRobot({image, angle, dir}) {
                this.placeholder = [
                    {
                        x: this.getMiddlePosition(),
                        y: this.getMiddlePosition()
                    }
                ];

                this.direction = this.getCoordinate(dir);

                this.clear();
                let x = this.placeholder[0].x * this.squareSize;
                let y = this.placeholder[0].y * this.squareSize;
                this.drawImageRotated(image, x, y, this.squareSize, this.squareSize, angle);
            },

            //initialize target and place it in any random location
            initializeTarget(image) {
                this.targetSquare = null;
                this.targetImage = image;
                this.setTargetSquare();
            },

            //this function is executed when the move ahead button is pressed
            moveRobot({image, angle, dir}) {

                this.direction = this.getCoordinate(dir);
                this.clear();
                this.setTargetSquare();
                const newHeadPosition = {
                    x: this.placeholder[0].x + this.direction.move.x,
                    y: this.placeholder[0].y + this.direction.move.y
                };

                //assure robot don't move out of border, if so end the game, send a signal via event bus
                if (this.isRobotOutOfBoard(newHeadPosition)) {
                    this.$eventBus.$emit('game-over');
                }

                //when robot catch the target, generate a new
                if (this.isTargetCaughtUp()) {
                    this.placeholder.unshift(this.targetSquare);
                    this.placeholder.pop();
                    this.targetSquare = null;
                    this.$emit('increase-points');

                    //generate a new target
                    // this.clear();
                    // this.setTargetSquare();
                } else {
                    this.placeholder.unshift(newHeadPosition);
                    this.placeholder.pop();
                }

                this.clear();
                let x = this.placeholder[0].x * this.squareSize;
                let y = this.placeholder[0].y * this.squareSize;
                this.drawImageRotated(image, x, y, this.squareSize, this.squareSize, angle);
                this.setTargetSquare();
            },


            /*
             * the following method is executed in response to rotate buttons
            */
            rotateRobot({image, angle, dir}) {
                //keep direction coordinates in sync
                this.direction = this.getCoordinate(dir);

                this.clear();
                let x = this.placeholder[0].x * this.squareSize;
                let y = this.placeholder[0].y * this.squareSize;
                this.drawImageRotated(image, x, y, this.squareSize, this.squareSize, angle);
                this.setTargetSquare();
            },

            //this is a good patch found in SO, where you can rotate and position images easily
            drawImageRotated(img, x, y, width, height, deg) {
                this.boardContext.save();
                let rad = deg * Math.PI / 180;
                this.boardContext.translate(x + width / 2, y + height / 2);
                this.boardContext.rotate(rad);
                this.boardContext.drawImage(img, width / 2 * (-1), height / 2 * (-1), width, height);
                this.boardContext.restore();
            },


            //clear the canvas
            clear() {
                this.boardContext.clearRect(0, 0, this.playAreaSize, this.playAreaSize);
                this.drawBoard();
            },

            //helper function() : return the coordinate object by direction
            getCoordinate(dir) {
                return coordinates.find((c) => c.direction === dir);
            },

            //get a random position , also make sure the position is not same as where Robot is positioned
            setTargetSquare() {
                if (!this.targetSquare) {
                    let targetSquare = this.getRandomPosition();
                    // making sure the target don't spawn in the same place as the robot
                    while (this.objectInPlaceHolder(targetSquare) > 0) {
                        targetSquare = this.getRandomPosition();
                    }

                    this.targetSquare = targetSquare;
                }
                this.drawTarget(this.targetSquare);
            },

            //helper function for setTargetSquare(), draw the target image on the canvas
            drawTarget({x, y}) {
                this.boardContext.drawImage(
                    this.targetImage,
                    x * this.squareSize,
                    y * this.squareSize,
                    this.squareSize,
                    this.squareSize
                );
            },

            //this method check whether robot is passing the edge, if so game over !
            isRobotOutOfBoard({x, y}) {
                return x < 0 || y < 0 || x >= this.unit || y >= this.unit;
            },

            //in the beginning of the game, the robot should be positioned in center
            getMiddlePosition() {
                //return Math.round(this.unit / 2);
                return Math.floor(this.unit / 2);
            },

            //get any random position to spawn the target
            getRandomPosition() {
                return {
                    x: Math.floor(Math.random() * this.unit),
                    y: Math.floor(Math.random() * this.unit)
                };
            },

            // make sure the robot position and new target spawn don't clash
            objectInPlaceHolder(item) {
                return this.placeholder.filter(({x, y}) => x === item.x && y === item.y)
                    .length;
            },

            // check whether robot reach the target
            isTargetCaughtUp() {
                return (
                    this.placeholder[0].x + this.direction.move.x === this.targetSquare.x &&
                    this.placeholder[0].y + this.direction.move.y === this.targetSquare.y
                );
            },

            //constructing the grid using html5 canvas
            drawBoard() {
                for (var x = 0; x <= this.playAreaSize; x += this.squareSize) {
                    this.boardContext.moveTo(0.5 + x + this.paddingBoard, this.paddingBoard);
                    this.boardContext.lineTo(0.5 + x + this.paddingBoard, this.playAreaSize + this.paddingBoard);
                }
                for (var x = 0; x <= this.playAreaSize; x += this.squareSize) {
                    this.boardContext.moveTo(this.paddingBoard, 0.5 + x + this.paddingBoard);
                    this.boardContext.lineTo(this.playAreaSize + this.paddingBoard, 0.5 + x + this.paddingBoard);
                }
                this.boardContext.strokeStyle = "black";
                this.boardContext.stroke();
            },

        }
    };
</script>

<style scoped>
    #play-area {
        border: 1px solid #ccc;
        margin: 10px 0;
        background-color: #f7f9fa;
    }
</style>
