const SoundSection = () => {
	const handleLearnMore = () => {
		const element = document.querySelector('.display-section');
		window.scrollTo({
			top: element?.getBoundingClientRect().bottom,
			left: 0,
			behavior: 'smooth',
		});
	};
	return (
		<section className='sound-section wrapper'>
			<div className='body'>
				<div className='sound-section-content content'>
					<h2 className='title'>New Sound System</h2>
					<p className='text'>Feel the base.</p>
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
				</div>
			</div>
		</section>
	);
};

export default SoundSection;
