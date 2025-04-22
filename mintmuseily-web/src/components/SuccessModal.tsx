// src/components/SuccessModal.tsx
type SuccessModalProps = {
    isOpen: boolean
    onClose: () => void
  }
  
  export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4">Success!</h2>
          <p>Your NFT has been minted successfully.</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Close
          </button>
        </div>
      </div>
    )
  }