/* eslint-disable react/prop-types */
import { Thread } from './Thread';
export const Feed = ({ filteredThread, user, setOpenModal, getThreads, setInteractingThread}) => {
	return (
		<div className='feed'>
			{filteredThread?.map((filteredThread) => (
				<Thread
					getThreads={getThreads}
					key={filteredThread.id}
					user={user}
					filteredThread={filteredThread}
					setOpenModal={setOpenModal}
					setInteractingThread={setInteractingThread}
				/>
			))}
		</div>
	);
};
