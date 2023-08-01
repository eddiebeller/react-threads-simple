import { ModalThread } from './ModalThread';
import { ThreadInput } from './ThreadInput';
export const Modal = ({ setOpenModal, modalFeedThreads }) => {
	return (
		<div className='modal'>
			<span onClick={() => setOpenModal(false)}>X</span>
			{modalFeedThreads?.map((modalFeedThread) => (
				<ModalThread
					modalFeedThread={modalFeedThread}
					key={modalFeedThread?.id}
				/>
			))}
			<ThreadInput />
		</div>
	);
};
