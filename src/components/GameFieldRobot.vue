<script>
    import constants from "../utils/constants";
    import coordinates from "../utils/helpers";

    export default {
        name: "GameFieldRobot",
        props: {
            imagePath: String,
            squareSize: Number
        },
        data(){
            return {
                angle: 0,
                angleLeft: 0,
                angleRight: 0,
                dir: "top",
                image: null
            }
        },
        methods: {

            rotateLeft(degree){
                this.angle = this.angleLeft;

                if (this.angle + degree >= 360) {
                    this.angle = 0;
                    this.angleLeft = 0;
                } else if (this.angle + degree <= -360) {
                    this.angle = 0;
                    this.angleLeft = 0;
                } else {
                    this.angle += degree;
                    this.angleLeft += degree;
                }

                switch (this.angleLeft) {
                    case 0 :
                        this.dir = "top";
                        this.angleRight = 0;
                        break;
                    case -90:
                        this.dir = "left";
                        this.angleRight = 270;
                        break;
                    case -180:
                        this.dir = "bottom";
                        this.angleRight = 180;
                        break;
                    case -270:
                        this.dir = "right";
                        this.angleRight = 90;
                        break;
                }

                this.$emit("rotateRobot", {
                    image: this.image,
                    angle: this.angle,
                    dir: this.dir
                });

            },

            rotateRight(degree){

                this.angle = this.angleRight;

                if (this.angle + degree >= 360) {
                    this.angle = 0;
                    this.angleRight = 0;
                } else if (this.angle + degree <= -360) {
                    this.angle = 0;
                    this.angleRight = 0;
                } else {
                    this.angle += degree;
                    this.angleRight += degree;
                }

                switch (this.angleRight) {
                    case 0 :
                        this.dir = "top";
                        this.angleLeft = 0;
                        break;
                    case 90:
                        this.dir = "right";
                        this.angleLeft = -270;
                        break;
                    case 180:
                        this.dir = "bottom";
                        this.angleLeft = -180;
                        break;
                    case 270:
                        this.dir = "left";
                        this.angleLeft = -90;
                        break;
                }

                this.$emit("rotateRobot", {
                    image: this.image,
                    angle: this.angle,
                    dir: this.dir
                });
            },

            moveAhead(){
                this.$emit("moveRobot", {
                    image: this.image,
                    angle: this.angle,
                    dir: this.dir
                });
            },

            //helper function() : return the coordinate object by direction
            getCoordinate(dir) {
                return coordinates.find((c) => c.direction === dir);
            },
        },

        created() {
            //initialize config values from config file
            this.dir = constants.defaultRobotDirection;
            let direction = this.getCoordinate(constants.defaultRobotDirection);
            this.angle = direction.angle;
            this.angleLeft = direction.angleLeft;
            this.angleRight = direction.angleRight;


            this.image = new Image(this.squareSize, this.squareSize);
            this.image.src = require('../assets/robot.png');
            // this.image.src = require(this.imagePath);
            this.image.onload = function ()
            {
                //this.$emit("drawRobot", this.image, this.angle, this.dir);
                this.$emit("drawRobot", {
                    image: this.image,
                    angle: this.angle,
                    dir: this.dir
                });
            }.bind(this);


            this.$eventBus.$on('rotateLeft', this.rotateLeft)
            this.$eventBus.$on('rotateRight', this.rotateRight)
            this.$eventBus.$on('moveAhead', this.moveAhead)
        },
        beforeDestroy(){
            this.$eventBus.$off('rotateLeft');
            this.$eventBus.$off('rotateRight');
            this.$eventBus.$off('moveAhead');
        },
    }
</script>