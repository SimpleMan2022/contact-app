import React from "react";
import CardSender from "@/components/Message/CardSender.tsx";
import CardReply from "@/components/Message/CardReply.tsx";
import useMessages from "@/hooks/useMessages.ts";

const Message: React.FC = () => {
    const { loading, error, data } = useMessages();
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="text-sm" key={1}>
            {data?.data.map((item) => (
                <React.Fragment key={item.sender.id}>
                    <CardSender
                        id={item.sender.id}
                        avatar={item.sender.avatar}
                        isReply={!!item.reply}
                        key={`sender-${item.sender.id}`}
                        username={item.sender.username}
                        content={item.sender.content}
                        likes={item.sender.likes}
                        loading={loading}
                        createdAt={item.sender.created_at}
                    />
                    {item.reply && (
                        <CardReply
                            key={`reply-${item.reply.id}`}
                            id={item.reply.id}
                            loading={loading}
                            content={item.reply.content}
                            createdAt={item.reply.created_at}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Message;
