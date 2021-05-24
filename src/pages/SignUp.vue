<template>
    <main class="form-signin container text-center">
        <form>
            <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
            <TextLink link-desc="Already registered?" link-text="Log in" path="/login"/>
            <FormInputText
                    v-for="form in forms"
                    :key="form.id"
                    v-bind:type="form.type"
                    v-bind:id="form.id"
                    v-bind:placeholder="form.placeholder"
                    v-model="formData[form.model]"/>
            <FormSelect title="Select your gender" v-bind:options="selectOptions" v-model="formData['sex']"/>
            <CustomDatePicker v-model="formData['date']" title="Select birth date"/>
            <button class="w-100 btn btn-lg btn-primary" type="submit" v-on:click="sendRegData">Sign up</button>
        </form>
    </main>
</template>

<script>
    // import axios from "axios";
    import CustomDatePicker from "@/components/CustomDatePicker";
    import axios from "axios";
    import TextLink from "@/components/TextLink";
    import FormSelect from "@/components/FormSelect";
    import FormInputText from "@/components/FormInputText";
    export default {
        name: "SignUp",
        components: {FormInputText, FormSelect, TextLink, CustomDatePicker},
        data(){
            return{
                selectOptions: ["Male", "Female"],
                formData: {
                    name: null,
                    lastname: null,
                    email: null,
                    password: null,
                    sex: null,
                    date: null,
                },
                forms: [
                    {
                        id: "floatingName",
                        type: "text",
                        placeholder: "Your name",
                        model: "name"
                    },
                    {
                        id: "floatingLastName",
                        type: "text",
                        placeholder: "Your lastname",
                        model: "lastname"
                    },
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
              if(this.formData.email && this.formData.password){
                  return true;
              }
            },
            sendRegData(e) {
                e.preventDefault();
                if (this.validateData()) {
                    const userData = {
                        name: `${this.formData.name} ${this.formData.lastname}`,
                        email: this.formData.email,
                        password: this.formData.password,
                        sex: this.formData.sex,
                        date: this.formData.date
                    };
                    axios.post(`${process.env.VUE_APP_SERVER_URL}/signup`, userData)
                        .then(response => {
                            console.log(response.data.email);
                            if(response.status === 200) {
                                this.$router.push("/");
                            }
                        });
                }
            }
        }
    }
</script>

<style scoped>
    main{
        width: 30%;
        min-width: 300px;
    }
    form > div{
        margin-bottom: 20px;
    }

    .mx-datepicker{
        width: 100%;
    }
</style>
