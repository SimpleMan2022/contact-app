import React from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {avatarList} from "@/data/avatar.ts";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, ChevronRight} from "lucide-react";

const AvatarSelector: React.FC<{ currentAvatarIdx: number; handleNextAvatar: () => void; handlePreviousAvatar: () => void }> = ({ currentAvatarIdx, handleNextAvatar, handlePreviousAvatar}) => {
    return (
        <div className="flex justify-center items-center relative">
            <Avatar className="w-40 h-40 object-cover">
                <AvatarImage
                    src={avatarList[currentAvatarIdx].src}
                    loading={"lazy"}
                    className="object-cover"
                    alt={avatarList[currentAvatarIdx].alt}
                />
            </Avatar>
            <div className="absolute left-0 md:left-[1px] lg:left-[80px]">
                <Button variant="neo" size="icon" type="button" onClick={handleNextAvatar}>
                    <ChevronLeft className="h-4 w-4"/>
                </Button>
            </div>
            <div className="absolute right-0 md:left-[350px] lg:left-[500px]">
                <Button variant="neo" size="icon" type="button" onClick={handlePreviousAvatar}>
                    <ChevronRight className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    )
}

export default AvatarSelector;