import { useEffect, useState } from 'react';
import { Nav } from '../components/Nav';
import { Header } from '../components/Header';
import { Feed } from '../components/Feed';
import { Modal } from '../components/Modal';

const App = () => {
	const [user, setUser] = useState(null);
	const userId = 'b1f3a462-0ba8-4c6a-9d73-1721318f608c';
	const getUser = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/users?user_uuid=${userId}`
			);
			const data = await response.json();
			setUser(data[0]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	console.log(user);

	return (
		<>
			{user && (
				<div className='app'>
					<div className='app_container'>
						<Nav url={user.instagram_url} />
						<Header user={user} />
						<Feed />
						{/* <Modal /> */}
					</div>
				</div>
			)}
		</>
	);
};

export default App;
