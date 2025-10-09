import { useChatStore } from "../store/useChatStore";
import AnimatedBorder from "../components/AnimatedBorder";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ChatContainer from "../components/ChatContainer";
import MembersList from "../components/MembersList";

const ChatPage = () => {
	const { activeTab, selectedUser } = useChatStore();
	return (
		<div className='relative w-full max-w-6xl h-[800px]'>
			<AnimatedBorder>
				{/*left*/}
				<div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
					<ProfileHeader />
					<ActiveTabSwitch />
					<div className='flex-1 overflow-y-auto p-4 space-y-2'>
						{activeTab === "chats" ? <ChatList /> : <MembersList />}
					</div>
				</div>
				{/*right*/}
				{selectedUser ? <ChatContainer /> : <div></div>}
			</AnimatedBorder>
		</div>
	);
};

export default ChatPage;
