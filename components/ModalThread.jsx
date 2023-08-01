/* eslint-disable react/prop-types */
import moment from 'moment';
import { useState, useEffect } from 'react';

export const ModalThread = ({ modalFeedThread }) => {
	const [user, setUser] = useState(null);
	const timePassed = moment().startOf('day').fromNow(modalFeedThread.timestamp);
	const getUser = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/users?user_uuid=${modalFeedThread.thread_from}`
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

	return (
		<article className='feed-card'>
			<div className='text-container'>
				<div>
					<div className='image-container'>
						<img src={user?.img} alt='avatar' />
					</div>
					<p>
						<strong>{user?.handle}</strong>
						<p>{modalFeedThread.text}</p>
					</p>
				</div>
				<p className='sub-text'>{timePassed}</p>
			</div>
		</article>
	);
};
