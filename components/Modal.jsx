import { ModalThread } from './ModalThread';
import { ThreadInput } from './ThreadInput';
export const Modal = () => {
	return (
		<div className='modal'>
			<ModalThread />
			<ThreadInput />
		</div>
	);
};
