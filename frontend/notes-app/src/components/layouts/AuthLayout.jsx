import Navbar from '../Navbar/Navbar'

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <>
      <Navbar showSearch={false} showProfile={false} showSignIn={true} />
      <div className=" bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout