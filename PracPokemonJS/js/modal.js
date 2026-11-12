export function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');

    modalMessage.textContent = message;
    modal.showModal();
}
