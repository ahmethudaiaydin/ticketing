import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client'
import Header from '../components/header';
//Bu dosya ne işe yarar?
//Udemy 198. video  microservices-with-node-js-and-react
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <>
        <Header currentUser={currentUser} />
        <Component {...pageProps} />
    </>
};

AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
        ...data,
        pageProps
    };
};

export default AppComponent;