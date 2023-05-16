import Cookies from 'cookies'

export function getServerSideProps({ req, res }) {
	const cookies = new Cookies(req, res)

	// elimina las 2 cookies y te redirecciona a la home
	cookies.set('Authentication')
	cookies.set('Refresh')

	//code 307 temporary redirect
	res.writeHead(307, { Location: '/' })
	res.end()

	return { props: {} }
}

function Logout() {
	return (
		<div>
			<a href="/logout">Logout</a>
		</div>
	)
}

export default Logout