<template>
    <button class="btn btn-primary btn-block fa-2x" @click="$emit('buttonClick')">
        <slot></slot>
    </button>
</template>
<script>
    export default {
        name: "GameControlButton"
    }
</script>