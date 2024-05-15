import { useState, useEffect } from "react"
import {data} from "./Data"
import { nanoid } from "nanoid";
import Nav from "./Nav";

function App() {
	const [inputs, setInputs] = useState('');
	const [user, setUser] = useState(() => {
		const savedUsers = localStorage.getItem('users');
		return savedUsers ? JSON.parse(savedUsers) : data.map(d => ({ ...d, completed: false }));
	});

	useEffect(() => {
		localStorage.setItem('users', JSON.stringify(user));
	}, [user]);

	const handleForm = (e)=>{
		e.preventDefault();
		if(!inputs) return
		const userid = nanoid();
		const newuser = {id: userid, text: inputs, completed: false}; 
		const updateInfo = [...user, newuser];
		setUser(updateInfo);
		setInputs('')

	}

	const toggleComplete = (id) => {
		const updatedUsers = user.map(u => {
			if (u.id === id) {
				return { ...u, completed: !u.completed };
			}
			return u;
		});
		setUser(updatedUsers);
	};

	const remove = (id)=>{
		const updateremove = user.filter((users)=> users.id !== id);
		setUser(updateremove)


	}

	return <div>
		<Nav />
		<form  onSubmit={handleForm}>
			
			<input type="text" name="name"placeholder="Add a new task" value={inputs} onChange={(e)=> setInputs(e.target.value)} />
			<button type="submit" className="btn">Add</button>
		</form>
		<div className="todo">
			{user.map((users)=>{
				return <div key={users.id} className="todo-cen" style={{ textDecoration: users.completed ? 'line-through' : 'none' }}>
					<input type="checkbox" className="check" checked={users.completed} onChange={() => toggleComplete(users.id)} />
					<p>{users.text}</p> 
					<svg onClick={()=> remove(users.id)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
</svg>
				</div>
			})}
		
			
			
		</div>
	</div>
}

export default App
