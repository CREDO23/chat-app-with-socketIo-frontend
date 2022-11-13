import Connexion from './screens/Connexion';
import UserItem from './components/UserItem';
import Chat from './components/Chat';
import Home from './screens/Home';
import 'flowbite-react'
import Message from './components/Message';

function App() {
    return (
        <div className="w-[100vw] h-[100vh] font-Poppins  flex items-center justify-center flex-col">
            {/* <Connexion /> */}
            <Home />
            {/* <UserItem
                online={false}
                imageProfile={'ddad'}
                userName={'CREDO23shdbkjdssddjksnskjn'}
            />
            <UserItem
                online={true}
                imageProfile={'ddad'}
                userName={'CREDO23shdbkjdssddjksnskjn'}
            />
            <Chat
                lastMessage={{
                    isForeign: true,
                    isPrivate: false,
                    time: new Date('2022-11-09T13:39:23.655+00:00'),
                    content: 'Hey les gars comment allez vous ?',
                    sender: 'Credo',
                }}
                name="Les hommes"
                newMessageCount={0}
                messages={[]}
            />
            <Chat
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
            />
            <Message
                isForeign={false}
                isPrivate={false}
                time={new Date('2022-11-09T13:39:23.655+00:00')}
                content={
                    'Hey les gars comment allez vous ? je voulais vous demander si demain on sera ensemble'
                }
                sender={'Credo'}
            />
            <Message
                isForeign={true}
                isPrivate={false}
                time={new Date('2022-12-09T13:39:23.655+00:00')}
                content={
                    'Hey les gars comment allez vous ? je voulais vous demander si demain on sera ensemble'
                }
                sender={'Credo'}
            /> */}
        </div>
    );
}

export default App;
