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
	const [interactingThread, setInteractingThread] = useState(null);
	const [modalFeedThreads, setModalFeedThreads] = useState(null);

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

	const getReplies = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/threads?reply_to=${interactingThread?.id}`
			);
			const data = await response.json();
			setModalFeedThreads(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getUser();
		getThreads();
	}, []);

	useEffect(() => {
		getThreadsFeed();
	}, [user, threads, viewThreadsFeed]);

	useEffect(() => {
		getReplies();
	}, [interactingThread]);

	console.log('modalFeedThread', modalFeedThreads);

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
						<Feed
							getThreads={getThreads}
							user={user}
							setOpenModal={setOpenModal}
							filteredThread={filteredThread}
							setInteractingThread={setInteractingThread}
						/>
						{openModal && (
							<Modal
								user={user}
								setOpenModal={setOpenModal}
								modalFeedThreads={modalFeedThreads}
							/>
						)}
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
