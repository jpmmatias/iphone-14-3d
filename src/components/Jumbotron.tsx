import IPhone from '../assets/images/iphone-14.jpg';
import HoldingIPhone from '../assets/images/iphone-hand.png';
const Jumbotron = () => {
	const handleLearnMore = () => {
		const element = document.querySelector('.sound-section');
		window.scrollTo({
			top: element?.getBoundingClientRect().top,
			left: 0,
			behavior: 'smooth',
		});
	};
	return (
		<section className='jumbotron-section wrapper'>
			<h2 className='title'>New</h2>
			<img src={IPhone} className='logo' alt='IPhone 14 Pro' />
			<p className='text'>Big and bigger.</p>
			<span className='description'>
				from $699 before trade-in or $29.12/mo. for 24 mo. <sup>1</sup>
			</span>
			<ul className='links'>
				<li>
					<button className='button'>Buy</button>
				</li>
				<li>
					<a onClick={handleLearnMore} className='link'>
						Learn more
					</a>
				</li>
			</ul>
			<img
				src={HoldingIPhone}
				className='iphone-img'
				alt='Holding IPhone 14 Pro'
			/>
		</section>
	);
};

export default Jumbotron;
