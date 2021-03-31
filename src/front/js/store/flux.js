import emailjs from "emailjs-com";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			login_data: {
				userLogin: "",
				userPass: ""
			},
			recovery_data: {
				userEmail: "",
				userToken: ""
			},
			user: {
				token: "",
				email: "",
				id: ""
			},
			// serviceRegistrado: {
			//     //id_user= "",
			//     tipo_membresia = "",
			//     category = "",
			//     subcategory = "",
			//     tipo_cobro = "",
			//     valor = "",
			//     name_servicio = "",
			//     descrip_servicio = "",
			//     duracion = "",
			//     revision = "",
			//     proceso = "",
			//     experiencia = "",
			//     portafolio = "",
			//     merit = ""
			// },
			favoritos: [],
			serviceInfo: [],
			serviceInfoIndividual: {}
		},

		actions: {
			// addServicio: async (
			//     tipo_membresia,
			//     category,
			//     subcategory,
			//     tipo_cobro,
			//     valor,
			//     name_servicio,
			//     descrip_servicio,
			//     duracion,
			//     revision,
			//     proceso,
			//     experiencia,
			//     portafolio,
			//     merit
			// ) => {
			//     try {
			//         const response = await fetch(process.env.BACKEND_URL + "/api/servicio-registrados", {
			//             method: "POST",
			//             headers: { "Content-type": "application/json" },
			//             body: JSON.stringify({
			//                 tipo_membresia: `${tipo_membresia}`,
			//                 category: `${category}`,
			//                 subcategory: `${subcategory}`,
			//                 tipo_cobro: `${tipo_cobro}`,
			//                 valor: `${valor}`,
			//                 name_servicio: `${name_servicio}`,
			//                 descrip_servicio: `${descrip_servicio}`,
			//                 duracion: `${duracion}`,
			//                 revision: `${revision}`,
			//                 proceso: `${proceso}`,
			//                 experiencia: `${experiencia}`,
			//                 portafolio: `${portafolio}`,
			//                 merit: `${merit}`
			//             }),
			//         })
			//         const json = await response.json();
			//         console.log("--service_registrado--", json);
			//         setStore({ serviceRegistrado: JSON.stringify(json) });
			//     } catch (error) {
			//         console.log(error);
			//     }
			// },

			getServiceInfo: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/servicio-registrados", {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
					setStore({ serviceInfo: JSON.stringify(json) });
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			getServiceInfoIndividual: async id => {
				try {
					const response = await fetch(`process.env.BACKEND_URL/servicio-registrados/${id}`, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
					setStore({ serviceInfoIndividual: JSON.stringify(json) });
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			addUserFavorites: async (id_user, id_servicio_registrados, name_servicio) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/favoritos", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id_user: "1",
						id_servicio_registrados: "1",
						name_servicio: "name_servicio"
					})
				});
				const json = await response.json();
				console.log({ "--favoritos--": json });
			},

			showUserFavorites: async id => {
				const response = await fetch(
					`https://3001-beige-walrus-q8a5cocf.ws-us03.gitpod.io/api/favoritos/${id}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" }
					}
				);
				const json = await response.json();
				console.log({ "--favoritos--": json });
				setStore({ favoritos: JSON.stringify(json) });
				//}
				// catch (error) {
				// 	console.log("Error loading message from backend", error);
				// }
			},

			eliminaFavorito: async id => {
				const store = getStore();
				const newList = store.favoritos.filter(item => item.id !== id);
				setStore({
					favoritos: newList
				});
				try {
					const response = await fetch(`process.env.BACKEND_URL/api/favoritos/${id}`, {
						method: "DELETE",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			getToken: () => {
				const tokenLocal = localStorage.getItem("token");
				const userLocal = JSON.parse(localStorage.getItem("user"));
				setStore({
					user: {
						token: tokenLocal,
						user: userLocal
					}
				});
				console.log("-->", tokenLocal);
				console.log("-->", JSON.stringify(userLocal));
			},

			addComment: async commentText => {
				e.preventDefault();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/comments", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							comment_text: `${commentText}`
						})
					});
					const json = await response.json();
					console.log(json);
					//setStore({ newContact: JSON.stringify(json) });
					getActions().listComments();
				} catch (error) {
					console.log(error);
				}
			},
			listComments: async () => {
				e.preventDefault();
				try {
					const response = await fetch(process.env.BACKEND_URL + "/comments", {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					const json = await response.json();
					console.log(json);
					setStore({ Comments: JSON.stringify(json) });
				} catch (error) {
					console.log(error);
				}
			},
			setRegister: user => {
				console.log(user);
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("--data--", data);
						setStore({ user: data });

						if (typeof Storage !== "undefined") {
							localStorage.setItem("token", data.token);
							localStorage.setItem("user", JSON.stringify(data.email));
							localStorage.setItem("tipo_user", JSON.stringify(data.tipo_user));
						}
					})
					.catch(error => console.log("error creating account in the backend", error));
			},
			setLogin: user => {
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("--data--", data);
						setStore({ user: data });
						if (typeof Storage !== "undefined") {
							localStorage.setItem("token", data.token);
							localStorage.setItem("user", JSON.stringify(data.email));
							localStorage.setItem("tipo_user", JSON.stringify(data.tipo_user));
						}
					})
					.catch(error => console.log("Error loading message from backend", error));
			},
			sendEmail: user => {
				fetch(process.env.BACKEND_URL + "/api/passwordrecovery1", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json" }
				})
					.then(data => data.json())
					.then(data => {
						setStore({ recovery_data: data });
						console.log(data);
						const templateParams = {
							to_email: data.email,
							recovery_hash: data.recovery_hash
						};
						emailjs.send(
							"service_gtr9nn8",
							"template_xht2g6m",
							templateParams,
							"user_Lg37b3jwPEh5fSo53yOsV"
						);
						alert("Una nueva contraseña ha sido enviada a tu correo registrado");
					})
					.catch(error => console.log("Error sending email", error));
			}
		}
	};
};
export default getState;
