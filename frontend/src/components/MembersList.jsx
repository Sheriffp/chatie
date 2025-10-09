import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoading from "./UsersLoading";

const MembersList = () => {
	const { getAllMembers, allMembers, isUsersLoading, setSelectedUser } =
		useChatStore();

	useEffect(() => {
		getAllMembers();
	}, [getAllMembers]);

	if (isUsersLoading) return <UsersLoading />;

	return (
		<>
			{allMembers.map(member => (
				<div
					key={member._id}
					className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
					onClick={() => setSelectedUser(member)}
				>
					<div className='flex items-center gap-3'>
						<div className={`avatar online`}>
							<div className='size-12 rounded-full'>
								<img
									src={member.profilePic || "/avatar.png"}
									alt={member.fullName}
								/>
							</div>
						</div>
						<h4 className='text-slate-200 font-medium truncate'>
							{member.fullName}
						</h4>
					</div>
				</div>
			))}
		</>
	);
};

export default MembersList;
