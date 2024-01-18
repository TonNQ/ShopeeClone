import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (
      fileFromLocal &&
      fileFromLocal.size < config.maxSizeUploadAvatar &&
      fileFromLocal.type.includes('image')
    ) {
      onChange && onChange(fileFromLocal)
    } else {
      toast.error('Dung lượng file tối đa 1 MB. Định dạng: .JPEG, .PNG', {
        autoClose: 3000
      })
    }
  }
  return (
    <Fragment>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm capitalize text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
