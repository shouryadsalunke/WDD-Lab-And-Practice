const tripForm = document.getElementById('tripForm');
const tripResult = document.getElementById('tripResult');
const resultContent = document.getElementById('resultContent');
const startDate = document.getElementById('startDate');
startDate.min = new Date().toISOString().split('T')[0];
tripForm.addEventListener('submit', event => {
  event.preventDefault();
  const destination = document.getElementById('destination').value.trim();
  const days = Number(document.getElementById('days').value);
  const budget = Number(document.getElementById('budget').value);
  const vibe = document.querySelector('input[name="vibe"]:checked').value;
  const notes = document.getElementById('notes').value.trim();
  if (!destination || budget < 0) return;
  const date = new Date(startDate.value + 'T00:00:00');
  const readableDate = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  resultContent.innerHTML = `<h3>${destination}, here we come.</h3><p>Your ${days}-day ${vibe.toLowerCase()} escape starts on ${readableDate}. Keep this as your first draft, then add the small details that make a trip yours.</p><div class="result-details"><span>↗ ${days} day${days === 1 ? '' : 's'}</span><span>₹ ${budget.toLocaleString('en-IN')} budget</span><span>✳ ${vibe}</span></div>${notes ? `<p><strong>Don't miss:</strong> ${notes.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]))}</p>` : ''}<p><em>This is a locally generated planning note. It does not book travel or check live prices.</em></p>`;
  tripResult.hidden = false;
  tripResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
document.getElementById('editTrip').addEventListener('click', () => {
  tripForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.getElementById('destination').focus();
});
