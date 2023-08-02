export const ThreadInput = ({ user, setText, text, postThread }) => {
	return (
		<div>
			<p className=''>{user.handle}</p>
			<input
				type='text'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button className='primary' onClick={postThread}>
				Post
			</button>
		</div>
	);
};
