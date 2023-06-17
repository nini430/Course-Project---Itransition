import { CollectionTopic } from "@prisma/client";

export interface CollectionInput {
    name:string;
    description:string;
    topic:CollectionTopic;
    image?:string
}