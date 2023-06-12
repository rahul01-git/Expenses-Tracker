import {NavLink} from 'react-router-dom'
const OptionsMenu = () => {
  return (
    <div className='flex justify-between my-4 bg-red-600 text-white'>
        <NavLink className=' hover:underline' to='/tags'>Tags</NavLink>
        <NavLink className=' hover:underline' to='/expenses'>Expenses</NavLink>
        <NavLink className=' hover:underline' to='/category'>Category</NavLink>
    </div>
  )
}

export default OptionsMenu