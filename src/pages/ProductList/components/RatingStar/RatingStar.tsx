import classNames from 'classnames'

import { createSearchParams, useNavigate } from 'react-router-dom'
import { QueryConfig } from '../../ProductList'
import path from 'src/constants/path'

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStar({ queryConfig }: Props) {
  const navigate = useNavigate()
  const { rating_filter } = queryConfig
  const handleFilterByStar = (ratingStar: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingStar),
        page: '1'
      }).toString()
    })
  }
  return (
    <ul className='my-3'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <li key={index} className='py-1 pl-2'>
              <div
                className={classNames(
                  'mb-2 flex items-center py-1 pl-2 text-sm hover:cursor-pointer',
                  {
                    'rounded-md bg-gray-200 py-1':
                      Number(rating_filter) === 5 - index
                  }
                )}
                onClick={() => handleFilterByStar(5 - index)}
                tabIndex={0}
              >
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='#ffce3d'
                      className={classNames('mr-1 h-5 w-5', {
                        'fill-yellow': indexStar < 5 - index,
                        'fill-slate-100': indexStar >= 5 - index
                      })}
                      key={indexStar}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                      />
                    </svg>
                  ))}
                {index > 0 && <span className='ml-1'>trở lên</span>}
              </div>
            </li>
          )
        })}
    </ul>
  )
}
