import {
	CanvasHTMLAttributes,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import {
	ViewerApp,
	AssetManagerPlugin,
	GBufferPlugin,
	ProgressivePlugin,
	TonemapPlugin,
	SSRPlugin,
	SSAOPlugin,
	BloomPlugin,
	GammaCorrectionPlugin,
	mobileAndTabletCheck,
	Vector3,
	CameraController,
} from 'webgi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimation } from '../lib/animations/scroll-animation';
gsap.registerPlugin(ScrollTrigger);
interface Props {
	contentRef: React.RefObject<HTMLElement>;
}

const WebglViwer = forwardRef((props: Props, ref) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [viwerRef, setViwer] = useState<ViewerApp | null>(null);
	const [targetRef, setTarget] = useState<Vector3 | null>(null);
	const [cameraRef, setCamera] = useState<CameraController | null>(null);
	const [positionRef, setPosition] = useState<Vector3 | null>(null);
	const [previewMode, setPreviewMode] = useState(false);
	const [isMobile, setIsMobile] = useState<null | boolean>(null);
	const canvasContainerRef = useRef<HTMLDivElement | null>(null);

	const handleExit = useCallback(() => {
		if (canvasContainerRef.current && props.contentRef.current) {
			setPreviewMode(false);
			canvasContainerRef.current.style.pointerEvents = 'none';
			props.contentRef.current.style.opacity = '1';
			const body = document.querySelector('body');
			if (body) {
				body.style.overflow = 'auto';
			}
			gsap.to(positionRef, {
				x: -3.38,
				y: -10.74,
				z: -5.93,
				scrollTrigger: {
					trigger: '.sound-section',
					start: 'top bottom',
					end: 'top top',
					scrub: 2,
					immediateRender: false,
				},
				onUpdate: () => {
					viwerRef?.setDirty();
					cameraRef?.positionTargetUpdated(true);
				},
			});
			gsap.to(targetRef, {
				x: 1.52,
				y: 0.77,
				z: -1.08,
				scrollTrigger: {
					trigger: '.sound-section',
					start: 'top bottom',
					end: 'top top',
					scrub: 2,
					immediateRender: false,
				},
			});
			viwerRef?.scene.activeCamera.setCameraOptions({
				controlsEnabled: false,
			});
		}
	}, []);

	useImperativeHandle(ref, () => ({
		triggerPreview() {
			if (canvasContainerRef.current && props.contentRef.current) {
				canvasContainerRef.current.style.pointerEvents = 'all';
				props.contentRef.current.style.opacity = '0';
				const body = document.querySelector('body');
				if (body) {
					body.style.overflow = 'hidden';
				}
				setPreviewMode(true);
				gsap.to(positionRef, {
					x: 13.04,
					y: -2.01,
					z: 2.29,
					duration: 2,
					onUpdate: () => {
						viwerRef?.setDirty();
						cameraRef?.positionTargetUpdated(true);
					},
				});
				gsap.to(targetRef, { x: 0.11, y: 0.0, z: 0.0, duration: 2 });

				viwerRef?.scene.activeCamera.setCameraOptions({
					controlsEnabled: true,
				});
			}
		},
	}));

	const memoizedScrollAnimation = useCallback(
		(
			position: Vector3,
			target: Vector3,
			onUpdate: () => void,
			isMobile: boolean
		) => {
			if (position && target && onUpdate) {
				scrollAnimation(position, target, onUpdate, isMobile);
			}
		},
		[]
	);
	const setupViewer = useCallback(async () => {
		const viewer = new ViewerApp({
			canvas: canvas.current || undefined,
		});
		const isMovileOrTablet = mobileAndTabletCheck();

		const manager = await viewer.addPlugin(AssetManagerPlugin);
		const camera = viewer.scene.activeCamera;
		const { position, target } = camera;
		setViwer(viewer);
		setIsMobile(isMovileOrTablet);
		setCamera(camera);
		setPosition(position);
		setTarget(target);

		await viewer.addPlugin(GBufferPlugin);
		await viewer.addPlugin(new ProgressivePlugin(32));
		await viewer.addPlugin(new TonemapPlugin(true));
		await viewer.addPlugin(GammaCorrectionPlugin);
		await viewer.addPlugin(SSRPlugin);
		await viewer.addPlugin(SSAOPlugin);
		await viewer.addPlugin(BloomPlugin);

		viewer.renderer.refreshPipeline();

		await manager.addFromPath('scene-black.glb');
		const tonemapPlugin = viewer.getPlugin(TonemapPlugin);
		if (tonemapPlugin && tonemapPlugin.config) {
			tonemapPlugin.config.clipBackground = true;
		}

		viewer.scene.activeCamera.setCameraOptions({
			controlsEnabled: false,
		});
		if (isMovileOrTablet) {
			position.set(-16.7, 1.17, 11.7);
			target.set(0, 1.37, 0);
			props.contentRef.current?.classList.add('mobile-or-tablet');
		}
		window.scrollTo(0, 0);
		let needUpdate = true;
		const onUpdate = () => {
			needUpdate = true;
			viewer.setDirty(true);
		};
		viewer.addEventListener('preFrame', () => {
			if (needUpdate) {
				camera.positionTargetUpdated(true);
				needUpdate = false;
			}
		});
		memoizedScrollAnimation(position, target, onUpdate, isMovileOrTablet);
	}, []);

	useEffect(() => {
		setupViewer();
	}, []);
	return (
		<div ref={canvasContainerRef} id='webgi-canvas-container'>
			<canvas id='webgi-canvas' ref={canvas}></canvas>
			{previewMode && (
				<button onClick={handleExit} className='button'>
					Exit
				</button>
			)}
		</div>
	);
});

export default WebglViwer;
