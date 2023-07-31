/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import moment from 'moment';

export const Thread = ({ filteredThread, user, setOpenModal, getThreads }) => {
	const timePassed = moment().startOf('day').fromNow(filteredThread.timestamp);

	const postLike = async () => {
		const hasBeenLikedByUser = filteredThread.likes.some(
			(like) => like.user_uuid === user.user_uuid
		);
		if (!hasBeenLikedByUser) {
			try {
				filteredThread.likes.push({
					user_uuid: user.user_uuid,
				});
				const response = await fetch(
					`http://localhost:3000/threads/${filteredThread.id}`,
					{
						method: 'PUT',
						headers: {
							'Content-type': 'application/json',
						},
						body: JSON.stringify(filteredThread),
					}
				);
				const result = await response.json();
				console.log('Success!', result);
				getThreads();
			} catch (error) {
				console.error(error);
			}
		}
	};
	return (
		<article className='feed-card'>
			<div className='text-container'>
				<div>
					<div className='image-container'>
						<img src={user.img} alt='profile avatar' />
					</div>
					<div>
						<p className=''>
							<strong>{user.handle}</strong>
						</p>
						<p className=''>{filteredThread.text}</p>
					</div>
				</div>
				<p className='time sub-text'>{timePassed}</p>
			</div>
			<div className='icons'>
				<svg
					onClick={postLike}
					clipRule='evenodd'
					fillRule='evenodd'
					strokeLinejoin='round'
					strokeMiterlimit='2'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z'
						fillRule='nonzero'
					/>
				</svg>
				<svg
					onClick={() => setOpenModal(true)}
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
				>
					<path d='M7 11c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5-8v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z' />
				</svg>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
				>
					<path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 11v4h2.953l1.594 2h-6.547v-6h-2l3-4 3 4h-2zm6 2v-4h-2.922l-1.594-2h6.516v6h2l-3 4-3-4h2z' />
				</svg>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
				>
					<path d='M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z' />
				</svg>
				<p className='sub-text'>
					<span onClick={() => setOpenModal(true)}>X replies</span> |{' '}
					<span>{filteredThread.likes.length} likes</span>
				</p>
			</div>
		</article>
	);
};
