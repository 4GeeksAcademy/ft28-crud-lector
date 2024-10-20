const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			readers: [
				{
					name: "reader 1",
					email: "reader1@mail.com"
				},
				{
					name: "reader 2",
					email: "reader2@mail.com"
				}
			],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				fetch("https://playground.4geeks.com/contact/agendas/lector/contacts")
				.then((response)=>response.json())
				.then((data)=>setStore({readers:data.contacts}))
			},
			addContact:(newContact)=>{
				const store = getStore()
				const actions = getActions()
				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(newContact),
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/lector/contacts", requestOptions)
					.then((response) => {
						console.log(response)
						if(response.ok){
							actions.loadSomeData()
							return response.json()
						}
					})
					.then((result) => {
						if(result){
							setStore(store.readers.concat(result))
							return true
						}
					})
					
			},
			removeReader: (idToDelete) => {
				console.log("Remove contact from flux"+ idToDelete)
				const store = getStore();
				
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/lector/contacts/"+idToDelete, requestOptions)
					.then((response) => response.text())
					.then((result) => {
						console.log(result)
						fetch("https://playground.4geeks.com/contact/agendas/lector/contacts")
						.then((response)=>response.json())
						.then((data)=>setStore({readers:data.contacts}))
					})

				//setStore({ readers: store.readers.filter((reader,index)=> reader.id!=idToDelete) })
			},
			editContact:(contactToEdit, idToEdit)=>{
				console.log("Edito contacto id: "+idToEdit)
				const store = getStore();
				const actions = getActions()

				const requestOptions = {
					method: "PUT",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(contactToEdit),
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/lector/contacts/"+idToEdit, requestOptions)
				  .then((response) => {
					console.log(response)
					if(response.ok){
						actions.loadSomeData()
						return response.json()
					}
				})
				.then((result) => {
					if(result){
						setStore(store.readers.concat(result))
						return true
					}
				})

			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
