import { Nav } from '../components/Nav';
import { Header } from '../components/Header';
import { Feed } from '../components/Feed';
import { Modal } from '../components/Modal';

const App = () => {
	return (
		<div className='app'>
			<div className='app_container'>
				<Nav />
				<Header />
				<Feed />
				<Modal />
			</div>
		</div>
	);
};

export default App;
