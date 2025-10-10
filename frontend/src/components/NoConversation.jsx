import { MessageCircleIcon } from "lucide-react";

const NoConversation = () => {
	return (
		<div className='flex flex-col h-full items-center justify-center p-6 text-center'>
			<div className='size-20 bg-cyan-500/50 rounded-full flex items-center justify-center mb-6'>
				<MessageCircleIcon className='size-10 text-cyan-400' />
			</div>
			<div>
				<h3 className='text-xl text-slate-200 font-semibold mb-2'>
					No conversations yet
				</h3>
				<p className='text-slate-400 max-w-md'>
					Start or continue a chat by selecting a chat or member
				</p>
			</div>
		</div>
	);
};

export default NoConversation;
