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
	const [filteredThreads, setFilteredThreads] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [interactingThread, setInteractingThread] = useState(null);
	const [modalFeedThreads, setModalFeedThreads] = useState(null);
	const [text, setText] = useState('');

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
			setFilteredThreads(standAloneThreads);
		}
		if (!viewThreadsFeed) {
			const replyThreads = threads?.filter(
				(thread) => thread.reply_to !== null
			);
			setFilteredThreads(replyThreads);
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

	const postThread = async () => {
		const thread = {
			timestamp: new Date(),
			thread_from: user.user_uuid,
			thread_to: user.user_uuid || null,
			reply_to: interactingThread?.id || null,
			text: text,
			likes: [],
		};
		try {
			const response = await fetch(`http://localhost:3000/threads`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(thread),
			});
			const result = await response.json();
			console.log('Posted', result);
			getThreads();
			getReplies();
			setText('');
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
							filteredThreads={filteredThreads}
							setInteractingThread={setInteractingThread}
						/>
						{openModal && (
							<Modal
								user={user}
								setOpenModal={setOpenModal}
								modalFeedThreads={modalFeedThreads}
								text={text}
								setText={setText}
								postThread={postThread}
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
