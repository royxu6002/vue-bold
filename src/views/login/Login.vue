<template>
    <div class="login-page container">
        <span>this is login page</span>
        <div>
            <input type="text" v-model="loginForm.username" placeholder="Username">
            <input type="text" v-model="loginForm.password" placeholder="Password">
            <button @click="login">Login</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            }
        }
    }

}
</script>
<style>
</style>