import React, { useEffect } from "react";
import { useState } from "react";
import InitialTask from "./tasks.json";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const Home = () => {
	const [searchValue, setSearchValue] = useState("");
	const [tareas, setTareas] = useState(InitialTask);
	const [hover, setHover] = useState(false)
	const [lista, setLista] = useState([])



	const ApiFuntion = async () => {
		try {
			const resp = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Anibal_jpg");
			const data = await resp.json();
			console.log(resp)
			setLista(data)

		} catch (error) {
			console.log(`este es el ${error}`);
		}
	}

	useEffect(() => {
		ApiFuntion();
	}, [])




	return <>
		<h1 className="title text-center mt-5">Todos</h1>
		<Card className="d-flex" body>
			<div className="row m-3">
				<input className="inputEdit col-12" onKeyUp={(evt) => {
					if (evt.key == 'Enter') {
						setTareas([...tareas, { task: evt.target.value }], evt.target.value = "")
					} else {
						setSearchValue(evt.target.value)
					}
				}}
					type="text" placeholder="whats need to be done?" defaultValue={searchValue}
				/>
			</div>
			{/* {tareas.map((task, ind) => {
				return (
					<div key={ind} onMouseEnter={() => setHover(ind)} className="row m-2" >
						<h5 className="col-11 text-secondary" key={ind}>{task.task}</h5>
						{hover == ind && <button className="botonEdit col-1" onClick={() => setTareas(tareas.filter((obj, index) => ind != index))} >x</button>}
					</div>
				)
			})} */}
			<ul>
				{lista.map((item) => {
					return <>
						<li key={item.label}>{item.label}</li>
					</>
				})}
			</ul>


			<div>
				<span>{tareas.length} Item left</span>
			</div>
		</Card >

	</>
};

export default Home;
