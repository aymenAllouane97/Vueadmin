import axios from "axios";
export default function auth({ next, router }) {
    if (!localStorage.getItem('token')) {
        console.log('exec')
        return this.$router.push({ name: 'Login' });
    }else{
        const token = window.localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:4002/user/profile', config).then(res =>console.log(res.data.name))
            .catch(err =>  {

                return this.$router.push({ name: 'login' })
            })

    }

    return next();
}