import {Button, ButtonGroup} from '@mui/material'

const ActionButtons = () => {
  return (
    <ButtonGroup sx={{position:'absolute',right:20,top:-10}}>
        <Button sx={{border:'1px solid gray'}}>Edit</Button>
        <Button sx={{border:'1px solid gray'}}>Delete</Button>
    </ButtonGroup>
  )
}

export default ActionButtons