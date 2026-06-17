import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";

import "../styles/ProfilePage.css";

function ProfilePage() {
const { user } = useAuth();

return ( <div className="profile-page"> <Navbar />

  <section className="profile-hero">
    <h1>Profile</h1>

    <p className="profile-subtitle">
      Manage your account information
    </p>
  </section>

  <div className="profile-container">
    <div className="profile-card">

      <div className="profile-header">

        <div className="profile-avatar">
          {user.name.charAt(0)}
        </div>

        <div>
          <h2 className="profile-name">
            {user.name}
          </h2>

          <span className="profile-role">
            {user.role}
          </span>
        </div>

      </div>

      <div className="profile-grid">

        <div className="profile-info-card">
          <div className="profile-info-label">
            Full Name
          </div>

          <div className="profile-info-value">
            {user.name}
          </div>
        </div>

        <div className="profile-info-card">
          <div className="profile-info-label">
            Email Address
          </div>

          <div className="profile-info-value">
            {user.email}
          </div>
        </div>

        <div className="profile-info-card">
          <div className="profile-info-label">
            Role
          </div>

          <div className="profile-info-value">
            {user.role}
          </div>
        </div>

        <div className="profile-info-card">
          <div className="profile-info-label">
            Status
          </div>

          <div className="profile-info-value">
            Active
          </div>
        </div>

      </div>

    </div>
  </div>
</div>


);
}

export default ProfilePage;
