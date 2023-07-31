import { ModalThread } from './ModalThread';
import { ThreadInput } from './ThreadInput';
export const Modal = ({ user, setOpenModal }) => {
	return (
		<div className='modal'>
			<span onClick={() => setOpenModal(false)}>X</span>
			<ModalThread />
			<ThreadInput />
		</div>
	);
};
