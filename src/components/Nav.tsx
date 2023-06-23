import Logo from '../assets/images/logo.svg';
import Search from '../assets/images/search.svg';
import Store from '../assets/images/store.svg';
const Nav = () => {
	return (
		<nav className='nav-wrapper'>
			<div className='nav-content'>
				<ul className='list-styled'>
					<li>
						<img src={Logo} alt='logo' />
					</li>
					<li>
						<a href='#' className='link-styled'>
							Store
						</a>
					</li>
					<li>
						<a href='#' className='link-styled'>
							Mac
						</a>
					</li>
					<li>
						<a href='' className='link-styled'>
							IPad
						</a>
					</li>
					<li>
						<a href='' className='link-styled'>
							IPhone
						</a>
					</li>
					<li>
						<a href='' className='link-styled'>
							Watch
						</a>
					</li>
					<li>
						<a href='' className='link-styled'>
							TV & Home
						</a>
					</li>
					<li>
						<a href='' className='link-styled'>
							Entretainment
						</a>
					</li>

					<li>
						<a href='' className='link-styled'>
							Acessories
						</a>
					</li>

					<li>
						<a href='' className='link-styled'>
							Suport
						</a>
					</li>

					<li>
						<a href=''>
							<img src={Search} alt='search' />
						</a>
					</li>
					<li>
						<a href=''>
							<img src={Store} alt='store' />
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
