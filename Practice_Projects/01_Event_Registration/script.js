const registrationForm = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');
registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const selectedEvent = document.getElementById('event').value;
  if (!name || !selectedEvent) {
    formMessage.textContent = 'Please complete all required fields.';
    return;
  }
  formMessage.textContent = `You're on the list, ${name}! Your selected event is ${selectedEvent}. This demo does not send data to a server.`;
  registrationForm.reset();
});
