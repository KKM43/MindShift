interface Props {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  thirdLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onThirdAction?: () => void;
  danger?: boolean;
  thirdDanger?: boolean;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  cancelLabel,
  thirdLabel,
  onConfirm,
  onCancel,
  onThirdAction,
  danger = false,
  thirdDanger = false,
}: Props) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        
        <div className="modal-actions">
          {/* Cancel - always first and least aggressive */}
          <button className="modal-cancel" onClick={onCancel}>
            {cancelLabel}
          </button>

          {/* Third Action (Sign Out Without Saving) - if exists */}
          {thirdLabel && onThirdAction && (
            <button
              className={`modal-confirm ${thirdDanger ? "modal-danger" : ""}`}
              onClick={onThirdAction}
            >
              {thirdLabel}
            </button>
          )}

          {/* Main Action (Save & Sign Out) - most prominent */}
          <button
            className={`modal-confirm ${danger ? "modal-danger" : ""}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}