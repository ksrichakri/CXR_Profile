import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { useNavigate, Link } from "react-router-dom"

export default function AdminLogin() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            await signInWithEmailAndPassword(auth, email, password)

            navigate("/dashboard")

        } catch (err) {

            setError("Invalid login credentials")

        }

    }

    return (
        <div className="inventory-sys-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", position: "relative" }}>
            <Link to="/" className="btn-primary" style={{ position: "absolute", top: "20px", left: "20px", textDecoration: "none" }}>&larr; Home</Link>
            <div className="glass-panel" style={{ width: "100%", maxWidth: "400px", padding: "40px" }}>
                <h2 className="text-gradient" style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem" }}>Admin Portal</h2>

                {error && <p style={{ color: "#d93025", backgroundColor: "#fce8e6", padding: "10px", borderRadius: "5px", textAlign: "center", fontSize: "0.9rem" }}>{error}</p>}

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    
                    <div>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "5px", display: "block" }}>Email</label>
                        <input
                            type="email"
                            placeholder="admin@cxr.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div>
                        <label style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "5px", display: "block" }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                            style={{ width: "100%" }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: "20px", width: "100%" }}>
                        Access Dashboard
                    </button>

                </form>
            </div>
            
            <style>{`
                .form-input {
                    padding: 12px 15px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    background: rgba(255, 255, 255, 0.5);
                    color: var(--text-main);
                    font-family: var(--font-sans);
                    outline: none;
                    transition: all 0.3s ease;
                }
                .form-input:focus {
                    border-color: var(--accent-color);
                    box-shadow: 0 0 0 2px rgba(0, 115, 103, 0.2);
                }
            `}</style>
        </div>
    )
}