export const Header = () => {
	return (
		<header className='header'>
			<div className='header__info-container'>
				<div className='header__user-info-container'>
					<h1>username</h1>
					<p>
						handle <span className='header__threads-info'>threads.net</span>
					</p>
				</div>
				<div className='header__image-container image-container'>
					<img src='' alt='profile avatar' />
				</div>
			</div>
			<p className='bio'>bio</p>
			<div className='header__sub-info-container'>
				<p className='header__sub-text sub-text'>
					x followers | <a href='/'>link</a>
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
