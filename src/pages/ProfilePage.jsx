import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          padding: "24px",
        }}
      >
        <h1>Profile</h1>

        <p>
          <strong>Name:</strong>{" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user.role}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;