import Footer from "./footer";

export default function Layout({children, props}) {
	
  	return (
		<div>
			{children}

			<Footer></Footer>
		</div>
	);
}
