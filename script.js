


let imgBox = document.getElementById('imgBox');
let qrImg = document.getElementById('qrImg');
let qrText = document.getElementById('qrText');
let genaratBtn = document.querySelector('.genaratBtn');
let restartBtn = document.querySelector('.bi-arrow-clockwise');

const downloadButton = document.getElementById('downloadBtn');

let webLink = ``
function generateQR() {
	if (qrText.value == '') return alert('Please fill the input box !');
	let qr = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value + ' ' + webLink;
	qrImg.src = qr;
	downloadButton.style.display = 'block';
	genaratBtn.style.display = 'none';
	restartBtn.style.display = 'flex';
}
restartBtn.addEventListener('click', () => {
	location.reload();
})
downloadButton.addEventListener('click', async () => {
	if (qrText.value == '') return alert('Please fill the input box !');
	const imageUrl = qrImg.src;

	try {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');

		link.href = url;
		link.download = 'downloaded-qr-image.jpg';
		link.click();
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('We got a problem !', error);
	}
	qrText.value = "";
	downloadButton.innerHTML = `<i class="bi bi-check2-circle"></i> Downloaded`
});