import { SimpleUser } from "./auth";




export interface ChatInitialState {
    getFollowsLoading:boolean;
    getMessagesLoading:boolean;
    getCurrentConversationsLoading:boolean;
    currentConversations: ChatInstance[] | null;
    chatFollows: null | ChatFollow[];
    currentChat: null | {
        chat:ChatInstance
        messages:Message[]
    };
    sendMessageLoading:boolean;
}

interface ChatInstance {
    id:string;
            memberOneId:string;
            memberTwoId:string;
            userTwo:SimpleUser;
            userOne: SimpleUser
}

interface ChatFollow {
    id:string;
    followerId:string;
    followedId:string;
    follower:SimpleUser
}

export interface Message {
    id:string;
    type:'text'|'media';
    senderId:string;
    receiverId:string;
    image:string | null;
    chatId:string;
    text:string;
    createdAt:string;
    updatedAt:string;
    sender:SimpleUser;
    receiver:SimpleUser;

}
