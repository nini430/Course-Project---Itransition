import {string,object} from 'yup'
import { CollectionValues } from '../types/collection'



const collectionValues:CollectionValues={
    name:'',
    description:'',
    topic:'',
}

const collectionValidationSchema=(topics:string[])=>object({
    name:string().required('name_required'),
    description:string().required('description_required'),
    topic:string().required('topic_required').oneOf(topics,'only_those_values'),
})

export {collectionValidationSchema,collectionValues};