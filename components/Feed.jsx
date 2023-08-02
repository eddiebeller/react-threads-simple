/* eslint-disable react/prop-types */
import { Thread } from './Thread';
export const Feed = ({
	filteredThreads,
	user,
	setOpenModal,
	getThreads,
	setInteractingThread,
}) => {
	return (
		<div className='feed'>
			{filteredThreads?.map((filteredThread) => (
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
