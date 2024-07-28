import React, {useCallback} from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { MdVerified } from "react-icons/md";
import { Card } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { timeAgo } from "@/utils/timeAgo.ts";
import {useDarkMode} from "@/context/useDarkMode.tsx";
import {FaRegTrashAlt} from "react-icons/fa";
import DialogMessage from "@/components/Message/DialogMessage.tsx";
import {deleteReply} from "@/services/message.service.ts";
import {useAuthenticate} from "@/context/useAuthenticate.tsx";

interface CardReplyProps {
    id: number;
    loading: boolean;
    content: string;
    createdAt: string;
}

const CardReply: React.FC<CardReplyProps> = ({ id, loading, createdAt, content }) => {
    const createdAtDate = new Date(createdAt);
    const createdAtNew = timeAgo(createdAtDate);
    const { isDarkMode } = useDarkMode();
    const {token} = useAuthenticate()

    const handleDeleteMessageReply = useCallback(async () => {
        try {
            const response = await deleteReply(id);
            if (response.status === 'success') {
                console.log('Success delete')
            } else {
                console.log('Failed to delete');
            }
        } catch (error) {
            console.log('Failed to delete');
        }
    }, [id]);

    return (
        <Card
            className={`p-5 shadow mt-5 ml-10 ${isDarkMode ? 'bg-gray-900' : 'bg-neo-secondary'}`}
        >
            <div className="flex">
                {loading ? (
                    <Skeleton className="w-10 h-10 rounded-full" />
                ) : (
                    <Avatar className="w-10">
                        <AvatarImage
                            className="object-cover"
                            src="https://res.cloudinary.com/destjdrbz/image/upload/v1721634438/avatar/avatar-10_yz5dv8.jpg"
                            loading={"lazy"}
                            alt="avatar-admin"
                        />
                    </Avatar>
                )}
                <div className="ml-3 w-full">
                    <div className="flex items-center gap-1">
                        {loading ? (
                            <Skeleton className="w-24 h-6" />
                        ) : (
                                <div className="flex items-center gap-2">
                                    <p className="font-bold">Adit Nugroho</p>
                                    <MdVerified color="blue"/>
                                    {token && (
                                        <DialogMessage title="Delete Message" icon={<FaRegTrashAlt />} description="Are you sure to delete this message?" onClick={handleDeleteMessageReply} />
                                    )}
                                </div>
                        )}
                    </div>
                    {loading ? (
                        <Skeleton className="w-16 h-4"/>
                    ) : (
                        <p className="text-xs text-gray-500 mt-0">{createdAtNew}</p>
                    )}
                    {loading ? (
                        <Skeleton className="w-full h-10 mt-2" />
                    ) : (
                        <p className="text-sm mt-2">
                            {content}
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default CardReply;
