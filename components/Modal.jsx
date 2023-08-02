import { ModalThread } from './ModalThread';
import { ThreadInput } from './ThreadInput';
export const Modal = ({
	user,
	setOpenModal,
	modalFeedThreads,
	text,
	setText,
	postThread,
}) => {
	return (
		<div className='modal'>
			<span onClick={() => setOpenModal(false)}>X</span>
			{modalFeedThreads?.map((modalFeedThread) => (
				<ModalThread
					modalFeedThread={modalFeedThread}
					key={modalFeedThread?.id}
				/>
			))}
			<ThreadInput
				user={user}
				text={text}
				setText={setText}
				postThread={postThread}
			/>
		</div>
	);
};
