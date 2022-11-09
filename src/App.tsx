import Connexion from './screens/Connexion';
import UserItem from './components/UserItem';
import Chat from './components/Chat';

function App() {
    return (
        <div className="w-[100vw] h-[100vh] font-Poppins bg-bgLogin  flex items-center justify-center flex-col">
            <Connexion />
            {/* <UserItem
                online={true}
                imageProfile={'ddad'}
                userName={'CREDO23shdbkjdssddjksnskjn'}
            /> */}
            {/* <Chat
                lastMessage={{
                    isForeign: true,
                    isPrivate: false,
                    time: new Date('2022-11-09T13:39:23.655+00:00'),
                    content: 'Hey les gars comment allez vous ?',
                    sender: 'Credo',
                }}
                name="Les hommes"
                newMessageCount={3}
                messages={[]}
            /> */}
        </div>
    );
}

export default App;
