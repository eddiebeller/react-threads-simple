/* eslint-disable react/prop-types */
import { Thread } from './Thread';
export const Feed = ({ filteredThread, user }) => {
	console.log(filteredThread);
	return (
		<div className='feed'>
			{filteredThread?.map((filteredThread) => (
				<Thread
					key={filteredThread.id}
					user={user}
					filteredThread={filteredThread}
				/>
			))}
		</div>
	);
};
