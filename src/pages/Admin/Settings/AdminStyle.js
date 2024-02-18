import "./style.css";

export default function AdminStyle({
  setStyleIcon,
  styleIcon,
  setEditStyleIcon,
  setAddStyleDialogOpen,
}) {
  return (
    <div>
      <div className="style-root-page">
        <div class="icons-details-grid">
          {styleIcon?.map((obj, index) => (
            <div class="icons-details-item">
              <div>
                <img src={obj?.iconUrl} alt="illustrationIcon" />
              </div>
              <div className="icon-name-root">
                <p>{obj?.title}</p>
                {obj?.paid === 0 && <h5>Free</h5>}
              </div>
              <div className="edit-style-icon">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setAddStyleDialogOpen(true);
                    setEditStyleIcon(obj);
                  }}
                >
                  Edit
                </button>
                <button className="archive-btn">Archive</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
