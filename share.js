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
      "https://images.unsplash.com/photo-1575535468632-345892291673?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
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
          text: 'Beautiful images'
        })
        output.textContent = 'Shared!'
      } catch (error) {
        output.textContent = `Error: ${error.message}`
      }
    } else {
      output.textContent = `Your system doesn't support sharing these files.`
    }
});