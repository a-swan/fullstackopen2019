import React from 'react'

const LoginForm = ({
  handleSubmit,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
                    username
          <input type={username.type} value={username.value} name="Username" onChange={username.onChange} />
        </div>
        <div>
                    password
          <input type={password.type} value={password.value} name="Password" onChange={password.onChange} />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm