
<template>
    <div>
        <Detail :status="status"></Detail>
    </div>
</template>
<style lang="scss" scoped>
    
</style>
<script>
    import Detail from './content'
    export default {
        data() {
            return {
                status: '6'
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {

        },
        components: {
            Detail
        }
    }
</script>