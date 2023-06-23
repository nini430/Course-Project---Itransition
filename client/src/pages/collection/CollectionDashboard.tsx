import { ExtendedCollection } from "../../types/collection";


interface ICollectionDashboardProps {
    currentCollection: ExtendedCollection | null
}

const CollectionDashboard = ({currentCollection}:ICollectionDashboardProps) => {
  return (
    <div>CollectionDashboard</div>
  )
}

export default CollectionDashboard;