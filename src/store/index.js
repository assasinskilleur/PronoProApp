import {createStore} from "vuex";
import axios from "axios";
import {alertController, loadingController} from "@ionic/vue"

const base_url = "http://raxk1131.odns.fr"
const image_url = "https://pronos-image-merger.herokuapp.com/api/image"

const store = createStore(
    {
        state() {
            return {
                types: null,
                pronostics: null,
                user: {connected: false},
                competitions: [],
            }
        },
        mutations: {
            setTypes(state, types) {
                state.types = types;
            },
            setPronostics(state, pronostics) {
                state.pronostics = pronostics;
            },
            setUserInfo(state, userInfo) {
                state.user = userInfo;
            },
            setCompetitions(state, compets) {
                state.competitions = compets;
            }
        },
        actions: {
            getTypes(context) {
                axios.get(base_url + "/types").then(response => {
                    context.commit("setTypes", response.data);
                }).catch(async (err) => {
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            async getPronosticsByTypes(context, typeId) {
                const loading = await loadingController.create({
                    message: "Veuillez patienter...",
                })
                await loading.present();
                axios.get(base_url + "/types/" + typeId + "/pronostics").then(async response => {
                    let pronostics = [];
                    for (const prono of response.data) {
                        const img = await axios.get(image_url + '/merge', { headers: {"Access-Control-Allow-Origin": "*"} });
                        pronostics.push(Object.assign(prono, { image: img.data }));
                    }
                    await loading.dismiss();
                    context.commit("setPronostics", pronostics)

                }).catch(async (err) => {
                    await loading.dismiss();
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            async deleteProno(context, pronoId) {
                const loading = await loadingController.create({
                    message: "Veuillez patienter...",
                })
                await loading.present();
                axios.delete(base_url + "/pronostics/" + pronoId).then(async response => {
                    let pronostics = [];
                    for (const prono of response.data) {
                        const img = await axios.get(image_url + '/merge', { headers: {"Access-Control-Allow-Origin": "*"} });
                        pronostics.push(Object.assign(prono, { image: img.data }));
                    }
                    await loading.dismiss();
                    context.commit("setPronostics", pronostics)
                }).catch(async (err) => {
                    await loading.dismiss();
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            async getPronostics(context) {
                const loading = await loadingController.create({
                    message: "Veuillez patienter...",
                })
                await loading.present();
                axios.get(base_url + "/pronostics").then(async response => {
                    let pronostics = [];
                    for (const prono of response.data) {
                        const img = await axios.get(image_url + '/merge', { headers: {"Access-Control-Allow-Origin": "*"} });
                        pronostics.push(Object.assign(prono, { image: img.data }));
                    }
                    await loading.dismiss();
                    context.commit("setPronostics", pronostics)
                }).catch(async (err) => {
                    await loading.dismiss();
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            login(context, userInfo) {
                context.commit("setUserInfo", userInfo);
            },
            logout(context, userInfo) {
                const body = {username: userInfo.username, id: userInfo.id};
                console.log(body)
                axios.post(base_url + "/logout", body).then(() => {
                    context.commit("setUserInfo", {connected: false});
                }).catch(async (err) => {
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            getCompetitions(context) {
                axios.get(base_url + "/competitions").then((res) => {
                    context.commit("setCompetitions", res.data);
                }).catch(async (err) => {
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            deleteCompet(context, competId) {
                axios.delete(base_url + "/competitions/" + competId).then((res) => {
                    context.commit("setCompetitions", res.data);
                }).catch(async (err) => {
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            addCompet(context, competName) {
                const body = {
                    competition: competName
                }
                axios.post(base_url + "/competitions", body).then((res) => {
                    context.commit("setCompetitions", res.data);
                }).catch(async (err) => {
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            deleteType(context, typeId) {
                axios.delete(base_url + "/types/" + typeId).then((res) => {
                    context.commit("setTypes", res.data);
                }).catch(async (err) => {
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            addType(context, typeName) {
                const body = {
                    libelle: typeName
                }
                axios.post(base_url + "/types", body).then((res) => {
                    context.commit("setTypes", res.data);
                }).catch(async (err) => {
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            async addProno(context, body) {
                const loading = await loadingController.create({
                    message: "Veuillez patienter...",
                })
                await loading.present();
                axios.post(base_url + "/pronostics", body).then(async (res) => {
                    let pronostics = [];
                    for (const prono of res.data) {
                        const img = await axios.get(image_url + '/merge', { headers: {"Access-Control-Allow-Origin": "*"} });
                        pronostics.push(Object.assign(prono, { image: img.data }));
                    }
                    await loading.dismiss();
                    context.commit("setPronostics", pronostics)
                }).catch(async (err) => {
                    await loading.dismiss();
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            },
            async editProno(context, data) {
                const loading = await loadingController.create({
                    message: "Veuillez patienter...",
                })
                await loading.present();
                axios.put(base_url + "/pronostics/" + data.id, data.body).then(async (res) => {
                    let pronostics = [];
                    for (const prono of res.data) {
                        const img = await axios.get(image_url + '/merge', { headers: {"Access-Control-Allow-Origin": "*"} });
                        pronostics.push(Object.assign(prono, { image: img.data }));
                    }
                    await loading.dismiss();
                    context.commit("setPronostics", pronostics)
                }).catch(async (err) => {
                    await loading.dismiss();
                    let alert = await alertController.create({
                        message: err.message,
                        header: 'Error',
                        subHeader: err.response.data.message,
                        buttons: ['Ok']
                    });
                    await alert.present();
                });
            }
        },
        getters: {
            types(state) {
                return state.types;
            },
            pronostics(state) {
                return state.pronostics;
            },
            user(state) {
                return state.user;
            },
            pronostic(state) {
                return (id) => {
                    return state.pronostics?.find(el => el.id?.toString() === id?.toString());
                }
            },
            competitions(state) {
                return state.competitions;
            }
        }
    }
)

export default store;
