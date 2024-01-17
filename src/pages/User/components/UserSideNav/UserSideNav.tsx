import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import userImage from 'src/assets/images/user.svg'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to={path.profile}
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img
            src={profile?.avatar || userImage}
            alt=''
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>
            {profile?.email}
          </div>
          <Link
            to={path.profile}
            className='flex items-center font-normal capitalize text-gray-500'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='mr-1 h-4 w-4'
            >
              <path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z' />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link
          to={path.profile}
          className='flex items-center capitalize text-orange transition-colors'
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='h-full w-full'
            ></img>
          </div>
          Tài khoản của tôi
        </Link>
        <Link
          to={path.changePassword}
          className='mt-4 flex items-center capitalize text-orange transition-colors'
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='h-full w-full'
            ></img>
          </div>
          Đổi mật khẩu
        </Link>
        <Link
          to={path.historyPurchase}
          className='mt-4 flex items-center capitalize text-orange transition-colors'
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              alt=''
              className='h-full w-full'
            ></img>
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  )
}
