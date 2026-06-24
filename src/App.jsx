import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

const url = isLogin
    ? "https://auth-backend-oc24.onrender.com/login"
    : "https://auth-backend-oc24.onrender.com/register";
    
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message || data.error);
    }

  } catch (error) {
    console.log(error);
    alert("Server connection failed");
  }
};

  return (
    <div className="container">
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label>Username</label>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
            />
            <br /><br />
          </>
        )}

        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <br /><br />

        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <br />

      <button
  onClick={() => {
    setIsLogin(!isLogin);

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  }}
>
  Switch to {isLogin ? "Register" : "Login"}
</button>
    </div>
  );
}

export default App;