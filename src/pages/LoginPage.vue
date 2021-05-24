<template>
    <main class="form-signin container text-center">
        <form>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            <FormInputText
                    v-for="form in forms"
                    :key="form.id"
                    v-bind:type="form.type"
                    v-bind:id="form.id"
                    v-bind:placeholder="form.placeholder"
                    v-model="formData[form.model]"/>
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" v-model="formData['rememberMe']"> Remember me
                </label>
            </div>
            <TextLink link-text="Sign up" link-desc="Not registered? " path="/signup"/>
            <button class="w-100 btn btn-lg btn-primary" type="submit" v-on:click="sendUserData">Sign in</button>
        </form>
    </main>
</template>

<script>
    import axios from "axios";
    import TextLink from "@/components/TextLink";
    import FormInputText from "@/components/FormInputText";
    export default {
        name: 'LoginPage',
        components: {FormInputText, TextLink},
        data(){
            return{
                formData: {
                    email: null,
                    password: null,
                    rememberMe: null,
                },
                forms: [
                        {
                            id: "floatingEmail",
                            type: "email",
                            placeholder: "Your email",
                            model: "email"
                        },

                        {
                            id: "floatingPassword",
                            type: "password",
                            placeholder: "Your password",
                            model: "password"
                        }
                    ]
                }
        },
        methods: {
            validateData(){
                if (this.formData.email && this.formData.password) {
                    return true
                }
            },

            sendUserData(e){
                console.log(process.env);
                e.preventDefault();
                if(this.validateData()){
                    const userData = this.formData;
                    axios.post(`${process.env.VUE_APP_SERVER_URL}/login`, userData)
                    .then(response => {
                            console.log(response.data);
                            if(response.data.status == "success") {
                                console.log(response.data.data.token);
                                localStorage.setItem("jwt-token", response.data.data.token);
                                this.$router.push("/");
                            }
                        });
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    main{
        width: 20%;

    }
</style>
