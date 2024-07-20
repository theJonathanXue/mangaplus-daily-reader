export function Form({
  action,
  children,
}: {
  action: any
  children: React.ReactNode
}) {
  return (
    <form
      action={action}
      className='flex flex-col space-y-4 bg-black px-4 py-8 sm:px-16'
    >
      <div>
        <label
          htmlFor='email'
          className='block text-xs text-[#ffd600] uppercase'
        >
          Email Address
        </label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='user@gmail.com'
          autoComplete='email'
          required
          className='mt-1 block w-full appearance-none rounded-md border bg-black border-[#ffd600] px-3 py-2 text-[#ffd600] placeholder-[#ffd600] shadow-sm  focus:outline-none  sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-xs text-[#ffd600] uppercase'
        >
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          required
          className='mt-1 block w-full appearance-none rounded-md border bg-black border-[#ffd600] px-3 py-2 text-[#ffd600] placeholder-[#ffd600] shadow-sm  focus:outline-none  sm:text-sm'
        />
      </div>
      {children}
    </form>
  )
}
