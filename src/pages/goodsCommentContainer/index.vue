<template>
    <div>
        <combox :id="id"></combox>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:this.$route.params.id
        }
    },
}
</script>