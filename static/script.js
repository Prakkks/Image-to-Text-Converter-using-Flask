// alert("hello")
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const submit = document.getElementById("submit");
const imageView = document.getElementById("img-view");
const cardContainer = document.getElementById("image-info");
// const home = document.getElementById("droparea");


submit.addEventListener("click",function(e){
    e.preventDefault();
    const images = cardContainer.querySelectorAll('.vertical-card img');
    const imageUrls = [];

    images.forEach(img => {
        imageUrls.push(img.src);
    });
    console.log("hello");
    console.log(imageUrls);
})


inputFile.addEventListener("change",uploadImage);

function uploadImage(){
    // inputFile.files[0];
    file = inputFile.files[0];
    let imgLink = URL.createObjectURL(inputFile.files[0]); //gives url of image
     fileName = file.name;
     fileSize = (file.size / (1024 * 1024)).toFixed(2); // Size in MB
    // imageView.style.backgroundImage = `url(${imgLink})`;
    // var a = `url(${imgLink})`;
    // imageView.textContent="";
    // imageView.style.border= 0;
    createnewcard(imgLink,fileName,fileSize);
    
    cardContainer.hidden=false;
    submit.hidden = false;
}

function createnewcard(a,b,c)
{
    const newCard = document.createElement('div');
    newCard.innerHTML = ` 
    <div class="vertical-card">
      <div class="image-show">
        <img  src="${a}"  id="uploaded-img"  > 
        <span>
           ${b} 
           <br>
          
        </span>
      </div>
    <button type="button" class="btn-close"  aria-label="Close"></button>
    </div> `;
    // cardContainer.appendChild(newCard);
    cardContainer.insertBefore(newCard, cardContainer.firstChild);
    const closeButton = newCard.querySelector('.btn-close');
    closeButton.addEventListener('click', deleteCard);
}


function deleteCard(event) {
    const card = event.target.closest('.vertical-card');
    if (card) {
        card.remove();
    }
    if (document.querySelectorAll('.vertical-card').length === 0) {
        submit.hidden = true;
        cardContainer.hidden = true;
        inputFile.value = "";  // 
        //Clear the file input
    }

    
}

dropArea.addEventListener("dragover", function(e){
    e.preventDefault();

})

dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();

})


// submit.addEventListener("click", function (e) {
//     e.preventDefault();
//     const file = inputFile.files[0];
//     const formData = new FormData();
//     formData.append("image", file);

//     fetch("/upload", {
//         method: "POST",
//         body: formData
//     })
//     .then(res => res.json())
//     .then(data => {
//         if (data.text) {
//             alert("Extracted Text:\n" + data.text.join("\n"));
//             // Or display in a div
//         } else {
//             alert("Error: " + data.error);
//         }
//     });
// });
// submit.addEventListener("click", function (e) {
//     e.preventDefault();
//     const files = inputFile.files;
//     if (!files.length) {
//         alert("Please upload at least one image.");
//         return;
//     }

//     const formData = new FormData();

//     for (let i = 0; i < files.length; i++) {
//         formData.append("images", files[i]);
//     }

//     submit.value = "Converting...";
//     submit.classList.add("loading");

//     fetch("/upload", {
//         method: "POST",
//         body: formData
//     })
//     .then(res => res.json())
//     .then(data => {
//         const container = document.getElementById("result-list");
//         container.innerHTML = ''; // clear previous
//         if (data.results) {
//             data.results.forEach((item, index) => {
//                 const box = document.createElement("div");
//                 box.className = "result-container mt-4";

//                 const heading = `<h5>${item.filename}</h5>`;
//                 const pre = `<pre class="result bg-light p-3 border rounded" id="text-output-${index}" style="white-space: pre-wrap;">${item.text.join("\n")}</pre>`;
//                 const button = `<button class="btn btn-sm btn-outline-primary mt-2" onclick="copyText(${index})">Copy to Clipboard</button>`;

//                 box.innerHTML = heading + pre + button;
//                 container.appendChild(box);
//             });
//             container.scrollIntoView({ behavior: "smooth" });
//         } else {
//             alert("Error: " + data.error);
//         }

        
//     });
    
// });

submit.addEventListener("click", function (e) {
    e.preventDefault();

    const files = inputFile.files;
    if (!files.length) {
        alert("Please upload at least one image.");
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
    }

    // Change button text and style
    submit.value = "Converting...";
    submit.classList.add("loading");

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("result-list");
        container.innerHTML = ''; // Clear previous

        if (data.results) {
            data.results.forEach((item, index) => {
                const box = document.createElement("div");
                box.className = "result-container mt-4";

                const heading = `<h5>${item.filename}</h5>`;
                const pre = `<pre class="result bg-light p-3 border rounded" id="text-output-${index}" style="white-space: pre-wrap;">${item.text.join("\n")}</pre>`;
                const button = `<button class="btn btn-sm btn-outline-primary mt-2" onclick="copyText(${index})">Copy to Clipboard</button>`;

                box.innerHTML = heading + pre + button;
                container.appendChild(box);
            });

            // Scroll to results
            container.scrollIntoView({ behavior: "smooth" });
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(err => {
        alert("Something went wrong: " + err.message);
    })
    .finally(() => {
        // Reset button
        submit.value = "Convert Now";
        submit.classList.remove("loading");
    });
});

function copyText(index) {
    const text = document.getElementById(`text-output-${index}`).textContent;
    navigator.clipboard.writeText(text)
        .then(() => alert("Copied to clipboard!"))
        .catch(err => alert("Copy failed: " + err));
}
