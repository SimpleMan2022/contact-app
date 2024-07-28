// CardSender.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { avatarList } from "@/data/avatar.ts";
import { FaHeart, FaPlus, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { timeAgo } from "@/utils/timeAgo.ts";
import { createReply, deleteMessage, disLikeMessage, likeMessage } from "@/services/message.service.ts";
import { useDarkMode } from "@/context/useDarkMode.tsx";
import DialogMessage from "@/components/Message/DialogMessage.tsx";
import { useForm, SubmitHandler } from "react-hook-form";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useAuthenticate} from "@/context/useAuthenticate.tsx";

interface CardSenderProps {
    id: number;
    loading: boolean;
    isReply: boolean;
    username: string;
    avatar: string;
    content: string;
    likes: number;
    createdAt: string;
}

interface ReplyFormInputs {
    content: string;
}

const CardSender: React.FC<CardSenderProps> = React.memo(({ id, loading, username, content, createdAt, likes, avatar, isReply }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(likes);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const { isDarkMode } = useDarkMode();
    const {token} = useAuthenticate()

    const { register, handleSubmit, reset } = useForm<ReplyFormInputs>();

    useEffect(() => {
        const liked = localStorage.getItem(`like-${id}`);
        if (liked) {
            setIsLiked(true);
        }
    }, [id]);

    const handleLike = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsProcessing(true);
        try {
            const response = await likeMessage(id);
            if (response.status === 'success') {
                setIsLiked(true);
                setLikeCount(prevCount => prevCount + 1);
                localStorage.setItem(`like-${id}`, 'true');
            } else {
                console.log('Failed to like');
            }
        } catch (error) {
            console.log('Failed to like');
        } finally {
            setIsProcessing(false);
        }
    }, [id]);

    const handleDislike = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsProcessing(true);
        try {
            const response = await disLikeMessage(id);
            if (response.status === 'success') {
                setIsLiked(false);
                setLikeCount(prevCount => prevCount - 1);
                localStorage.removeItem(`like-${id}`);
            } else {
                console.log('Failed to dislike');
            }
        } catch (error) {
            console.log('Failed to dislike');
        } finally {
            setIsProcessing(false);
        }
    }, [id]);

    const handleDeleteMessage = useCallback(async () => {
        setIsProcessing(true);
        try {
            const response = await deleteMessage(id);
            if (response.status === 'success') {
                setIsLiked(false);
                setLikeCount(prevCount => prevCount - 1);
                localStorage.removeItem(`like-${id}`);
            } else {
                console.log('Failed to delete');
            }
        } catch (error) {
            console.log('Failed to delete');
        } finally {
            setIsProcessing(false);
        }
    }, [id]);

    const handleCreateReply: SubmitHandler<ReplyFormInputs> = async (data) => {
        setIsProcessing(true);
        try {
            const response = await createReply(id, data.content);
            if (response.status === 'success') {
                console.log('Reply created successfully');
                reset();
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('Failed to create reply');
        } finally {
            setIsProcessing(false);
        }
    };
    const createdAtDate = new Date(createdAt);
    const createdAtNew = timeAgo(createdAtDate);
    const avatarSrc = avatarList.find(avatarItem => avatarItem.src === avatar);

    return (
        <Card
            className={`p-5 shadow mt-5 w-full ${isDarkMode ? 'bg-gray-900' : 'bg-neo-tertiary'} border-black`}
        >
            <div className="flex">
                {loading ? (
                    <Skeleton className="w-10 h-10 rounded-full" />
                ) : (
                    <Avatar className="w-10">
                        <AvatarImage
                            className="object-cover"
                            src={avatarSrc?.src}
                            loading={"lazy"}
                            alt={avatarSrc?.alt}
                        />
                    </Avatar>
                )}
                <div className="ml-3 w-full">
                    <div className="flex items-center gap-1">
                        {loading ? (
                            <Skeleton className="w-24 h-6" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <p className={`font-bold ${isDarkMode ? 'text-dark-text' : 'text-black'}`}>
                                    {username}
                                </p>
                                {token && (
                                    <DialogMessage title="Delete Message" icon={<FaRegTrashAlt />} description="Are you sure to delete this message?" onClick={handleDeleteMessage} />
                                    )}
                                {!isReply && token &&(
                                    <DialogMessage title="Reply Message" icon={<FaPlus />} description="Type your reply" onClick={handleSubmit(handleCreateReply)}>
                                        <div className="">
                                            <Label htmlFor="message" className="text-right">
                                                Message
                                            </Label>
                                            <Textarea
                                                rows={8}
                                                id="message"
                                                placeholder="Type your message here."
                                                className={`mt-1 ${isDarkMode ? 'dark text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-600'} border ${isDarkMode ? 'border-gray-700 shadow-custom' : 'border-gray-300'}`}
                                                {...register("content", { required: true })}
                                            />
                                        </div>
                                    </DialogMessage>
                                )}
                            </div>
                        )}
                    </div>
                    {loading ? (
                        <Skeleton className="w-16 h-4 mt-1" />
                    ) : (
                        <p className={`text-xs mt-0 ${isDarkMode ? 'text-dark-text' : 'text-gray-500'}`}>
                            {createdAtNew}
                        </p>
                    )}
                    {loading ? (
                        <Skeleton className="w-full h-10 mt-2" />
                    ) : (
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-dark-text' : 'text-black'}`}>
                            {content}
                        </p>
                    )}
                    <div className="flex mt-2">
                        <div className="flex items-center">
                            {loading ? (
                                <Skeleton className="w-8 h-8" />
                            ) : (
                                <Button
                                    variant="ghost"
                                    className="hover:bg-transparent"
                                    size="icon"
                                    onClick={!isLiked ? handleLike : handleDislike}
                                    type="button"
                                    disabled={isProcessing}
                                >
                                    {isLiked ? <FaHeart size={18} color="red" /> : <FaRegHeart size={18} />}
                                </Button>
                            )}
                            {loading ? (
                                <Skeleton className="w-6 h-4" />
                            ) : (
                                <span className={`text-[14px] ${isDarkMode ? 'text-dark-text' : 'text-black'} font-medium`}>
                                    {likeCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
});

export default CardSender;
