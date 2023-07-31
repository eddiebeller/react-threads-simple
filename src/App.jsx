import { useEffect, useState } from 'react';
import { Nav } from '../components/Nav';
import { Header } from '../components/Header';
import { Feed } from '../components/Feed';
import { Modal } from '../components/Modal';
import { WriteIcon } from '../components/WriteIcon';

const App = () => {
	const [user, setUser] = useState(null);
	const [threads, setThreads] = useState(null);
	const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
	const [filteredThread, setFilteredThread] = useState(null);
	const [openModal, setOpenModal] = useState(false);

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

	const getThreads = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/threads?threads_from=${userId}`
			);
			const data = await response.json();
			setThreads(data);
		} catch (error) {
			console.error(error);
		}
	};

	// const getThreadsFeed = () => {};

	useEffect(() => {
		getUser();
		getThreads();
	}, []);

	const getThreadsFeed = () => {
		if (viewThreadsFeed) {
			const standAloneThreads = threads?.filter(
				(thread) => thread.reply_to === null
			);
			setFilteredThread(standAloneThreads);
		}
		if (!viewThreadsFeed) {
			const replyThreads = threads?.filter(
				(thread) => thread.reply_to !== null
			);
			setFilteredThread(replyThreads);
		}
	};

	useEffect(() => {
		getThreadsFeed;
	}, [user, threads, viewThreadsFeed]);

	return (
		<>
			{user && (
				<div className='app'>
					<div className='app_container'>
						<Nav url={user.instagram_url} />
						<Header
							user={user}
							viewThreadsFeed={viewThreadsFeed}
							setViewThreadsFeed={setViewThreadsFeed}
						/>
						<Feed user={user} filteredThread={filteredThread} />
						{openModal && <Modal />}
						<div onClick={() => setOpenModal(true)}>
							<WriteIcon />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default App;
