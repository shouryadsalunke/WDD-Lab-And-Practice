const marksForm = document.getElementById('marksForm');
const resultCard = document.getElementById('resultCard');
const resultDetails = document.getElementById('resultDetails');
const errorMessage = document.getElementById('errorMessage');
const subjectFields = [
  { id: 'htmlMarks', name: 'HTML' },
  { id: 'cssMarks', name: 'CSS' },
  { id: 'jsMarks', name: 'JavaScript' },
  { id: 'labMarks', name: 'Lab work' }
];
marksForm.addEventListener('submit', event => {
  event.preventDefault();
  errorMessage.textContent = '';
  const scores = subjectFields.map(subject => ({
    name: subject.name,
    marks: Number(document.getElementById(subject.id).value)
  }));
  const invalid = scores.some(score => !Number.isFinite(score.marks) || score.marks < 0 || score.marks > 100);
  if (invalid) {
    errorMessage.textContent = 'Enter a valid mark between 0 and 100 for every subject.';
    return;
  }
  const name = document.getElementById('studentName').value.trim();
  const roll = document.getElementById('rollNumber').value.trim();
  const total = scores.reduce((sum, score) => sum + score.marks, 0);
  const percentage = total / scores.length;
  const passed = scores.every(score => score.marks >= 40);
  let label = 'Needs work';
  if (percentage >= 90) label = 'Excellent';
  else if (percentage >= 75) label = 'Very good';
  else if (percentage >= 60) label = 'Good';
  else if (percentage >= 40) label = 'Pass';
  resultDetails.hidden = false;
  resultDetails.innerHTML = `<p class="result-label">TOTAL PERCENTAGE</p><div class="result-number">${percentage.toFixed(1)}<span style="font-size:25px">%</span></div><div class="result-name">${escapeText(name)}</div><p class="result-meta">Roll no. ${escapeText(roll)} · ${total} / 400 marks</p><div class="progress"><span style="width:${percentage}%"></span></div><div class="score-lines">${scores.map(score => `<div><small>${score.name.toUpperCase()}</small><strong>${score.marks} / 100</strong></div>`).join('')}</div><span class="status">${passed ? 'PASS' : 'NEEDS IMPROVEMENT'} · ${label.toUpperCase()}</span>`;
  resultCard.querySelector('.empty-state').hidden = true;
});
function escapeText(value) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}
document.getElementById('clearForm').addEventListener('click', () => {
  marksForm.reset();
  errorMessage.textContent = '';
  resultDetails.hidden = true;
  resultDetails.innerHTML = '';
  resultCard.querySelector('.empty-state').hidden = false;
});
