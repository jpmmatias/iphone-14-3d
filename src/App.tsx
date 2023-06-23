import { WebGiViewerElement } from 'webgi';
import DisplaySection from './components/DisplaySection';
import Jumbotron from './components/Jumbotron';
import Nav from './components/Nav';
import SoundSection from './components/SoundSection';
import WebglViwer from './components/WebglViwer';
import { useRef } from 'react';
import Loader from './components/Loader';

function App() {
	const webGIViwerRef = useRef<any>();
	const contentRef = useRef<any>();

	const handlePreview = () => {
		if (webGIViwerRef.current) {
			webGIViwerRef.current.triggerPreview();
		}
	};
	return (
		<div className='App'>
			<Loader />
			<div ref={contentRef} id='content'>
				<Nav />
				<Jumbotron />
				<SoundSection />
				<DisplaySection handlePreview={handlePreview} />
			</div>
			<WebglViwer contentRef={contentRef} ref={webGIViwerRef} />
		</div>
	);
}

export default App;
