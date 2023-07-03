import { styled } from "styled-components"
import Table from "../../components/Comment/shared/Table"
import { adminColumns } from "../../utils/adminColumns"
import { useAppSelector } from "../../store/store"


const AdminDashboard = () => {
  const {users}=useAppSelector(state=>state.admin);
  return (
    <DashboardContainer>
        <Table tableName="admin" data={users || []} columns={adminColumns}/>
    </DashboardContainer>
  )
}

const DashboardContainer=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

export default AdminDashboard