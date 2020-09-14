import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {

    return <h1>You are  {currentUser ? '' : 'not'}  signed in</h1>
}

//Bu metot hem server hem de client tarafında render edilir.
LandingPage.getInitialProps = async (context) => {
    console.log('Landing pageeeee');
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;

}

export default LandingPage;