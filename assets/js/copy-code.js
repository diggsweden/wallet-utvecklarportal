document.addEventListener('DOMContentLoaded', function () {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(function (codeBlock) {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.type = 'button';
    copyButton.innerText = 'Kopiera';

    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);

    copyButton.addEventListener('click', function () {
      const code = codeBlock.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(function () {
        copyButton.innerText = 'Kopierat!';
        setTimeout(function () {
          copyButton.innerText = 'Kopiera';
        }, 2000);
      }, function (err) {
        console.error('Kunde inte kopiera text: ', err);
      });
    });
  });
});
