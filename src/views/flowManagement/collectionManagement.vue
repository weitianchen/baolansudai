<template>
    <div>
        <Detail :status="status" :collection="collection"></Detail>
    </div>
</template>

<script>
    import Detail from '../orderManagement/content'
    export default{
        data(){
            return{
                status: 'ALL',
                collection: true
            }
        },
        components:{
            Detail
        }
       
    }
</script>