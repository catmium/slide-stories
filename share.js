const urlToFile = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: blob.type });
  return file;
};

const shareButton = document.getElementById("shareButton");
const output = document.getElementById('output')


shareButton.addEventListener("click", async () => {
    const file = await urlToFile(
      "./img/cat4.png"
    );
    const files = [file];
    console.log(files);

    if (!navigator.canShare) {
      output.textContent = `Your browser doesn't support the Web Share API.`
      return
    }
  
    if (navigator.canShare({ files })) {
      try {
        await navigator.share({
          files,
          title: 'Images',
          text: 'This is a cat.'
        })
        output.textContent = 'Shared!'
      } catch (error) {
        output.textContent = `Error: ${error.message}`
      }
    } else {
      output.textContent = `Your system doesn't support sharing these files.`
    }
});