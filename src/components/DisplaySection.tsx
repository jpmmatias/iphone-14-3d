interface Props {
	handlePreview: () => void;
}
const DisplaySection = ({ handlePreview }: Props) => {
	const handleTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	return (
		<section className='display-section wrapper'>
			<h2 className='title'>New</h2>
			<p className='text'>Brillant.</p>
			<span className='description'>
				A display that's up to 200% brighter outdoors when you need it most.{' '}
				<sup>1</sup>
			</span>
			<button onClick={handlePreview} className='button'>
				Try me!
			</button>
			<button onClick={handleTop} className='back-button'>
				TOP
			</button>
		</section>
	);
};

export default DisplaySection;
