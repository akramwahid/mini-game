<script>
    export default {
        name: "GameFieldTarget",
        props: {
            imagePath: String,
            squareSize: Number
        },
        data(){
            return {
                image: null
            }
        },

        created() {
            this.image = new Image(this.squareSize, this.squareSize);
            this.image.src = require('../assets/target.png');
            // this.image.src = require(this.imagePath);
            this.image.onload = function ()
            {
                this.$emit("drawTarget", this.image);

            }.bind(this);
        }
    }
</script>