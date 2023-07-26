/* eslint-disable react/prop-types */
export const Header = ({ user }) => {
	return (
		<header className='header'>
			<div className='header__info-container'>
				<div className='header__user-info-container'>
					<h1>{user.username}</h1>
					<p>
						{user.handle}{' '}
						<span className='header__threads-info'>threads.net</span>
					</p>
				</div>
				<div className='header__image-container image-container'>
					<img src={user.img} alt='profile avatar' />
				</div>
			</div>
			<p className='bio'>{user.bio}</p>
			<div className='header__sub-info-container'>
				<p className='header__sub-text sub-text'>
					{user.followers.length} followers | <a href='/'>link</a>
				</p>
			</div>
			<button
				className='primary'
				onClick={() => navigator.clipboard.writeText('this is the URL')}
			>
				Share Profile
			</button>
			<div className='button-container'>
				<button className='current'>Threads</button>
				<button>Replies</button>
			</div>
		</header>
	);
};
