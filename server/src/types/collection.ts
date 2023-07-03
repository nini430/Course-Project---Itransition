import { CollectionTopic } from "@prisma/client";
import { SimpleUser } from "./auth";

export interface CollectionInput {
    name:string;
    description:string;
    topic:CollectionTopic;
    image?:string
}

export interface Collection {
    id: string;
    name: string;
    topic: string;
    image?: string;
    description: string;
    createdAt:string;
    updatedAt:string;
    author:SimpleUser
  }
