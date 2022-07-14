const getBtn = document.getElementById('get');
const sendBtn = document.getElementById('send');
const putPatchBtn = document.getElementById('put-patch');
const deleteBtn = document.getElementById('delete');
const simBtn = document.getElementById('sim');
const customBtn = document.getElementById('custom');
const errorBtn = document.getElementById('error');
const cancelBtn = document.getElementById('cancel');

const result = document.querySelector('.result .output');

getBtn.addEventListener('click', getData);
sendBtn.addEventListener('click', sendData);
putPatchBtn.addEventListener('click', putPatchData);
deleteBtn.addEventListener('click', deleteData);
simBtn.addEventListener('click', simData);
customBtn.addEventListener('click', customData);
errorBtn.addEventListener('click', catchError);
cancelBtn.addEventListener('click', cancelRequest);

// Fetch Data From SErver
function getData() {
	// axios({
	// 	method: 'get',
	// 	url: 'https://jsonplaceholder.typicode.com/users',
	// })
	axios('https://jsonplaceholder.typicode.com/users')
		.then((res) => {
			const data = res.data;
			let output = '';
			for (let i = 0; i < data.length; i++) {
				const { name, email, website, id } = data[i];
				output += `
      <ul class= list-unstyled>
        <li class='text-primary lead'>Id: ${id}</li>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Website: ${website}</li>
      </ul>
      `;
			}
			result.innerHTML = output;
		})
		.catch((err) => console.log(err.message));
}
function sendData() {
	// axios({
	// 	method: 'post',
	//   url: 'https://jsonplaceholder.typicode.com/users',
	//   data: {
	//     id: 50,
	//     name: 'Laredj Mohamed Rida',
	//     website: 'Lardj.com',
	//     email: 'redaghost@gmail.com'
	//   }
	// })
	axios
		.post('https://jsonplaceholder.typicode.com/users', {
			id: 50,
			name: 'Laredj Mohamed Rida',
			website: 'Lardj.com',
			email: 'redaghost@gmail.com',
		})
		.then((res) => {
			const sendedData = res.data;
			const { name, email, website, id } = sendedData;
			const output = `
      <ul class= list-unstyled>
        <li class='text-primary lead'>Id: ${id}</li>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Website: ${website}</li>
      </ul>
      `;
			const divEl = document.createElement('div');
			divEl.innerHTML = output;
			result.appendChild(divEl);
		});
}
function putPatchData() {
	// replace the entire data with the new data
	axios
		.put('https://jsonplaceholder.typicode.com/users/1', {
			id: 4,
			name: 'Moucella Kheira',
		})
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.error(err.message);
		});

	// Modify The oldest
	axios
		.patch('https://jsonplaceholder.typicode.com/users/1', {
			id: 5,
			name: 'Mohamed Mahmoud',
		})
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.error(err.message);
		});
}
function deleteData() {
	axios
		.delete('https://jsonplaceholder.typicode.com/users/1')
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
}

// Multi API
function simData() {
	axios
		.all([
			axios('https://jsonplaceholder.typicode.com/users'),
			axios('https://jsonplaceholder.typicode.com/todos'),
			axios('https://jsonplaceholder.typicode.com/albums'),
		])
		.then(
			axios.spread((users, todos, albums) => {
				console.log(users.data[2]);
				console.log(albums.data[4]);
				console.log(todos.data[10]);
			})
		);
}
// function customData() {}
// function catchError() {
// 	axios('https://jsonplaceholder.typicode.com/userse').catch((err) => {
// 		if (err.response.status == 404) {
// 			console.log(err.response.status);
// 		}
// 	});
// }
// function cancelRequest() {}

// Intercept any Request

// axios.interceptors.request.use(
// 	(config) => {
// 		console.log(
// 			`${config.method.toUpperCase()} sent to ${config.url} at ${new Date()}`
// 		);
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );
