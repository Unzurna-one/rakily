import { useSelector } from 'react-redux'

const useCurrentUser = props => useSelector(state => state.auth.user)
export default useCurrentUser
