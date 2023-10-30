const xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
xhr.send();
xhr.onload = () => {

  let userDetails = JSON.parse(xhr.responseText)

  const table = document.getElementById("myTable");

  const contentLimit = 10;
  let currentPage = 1;
  function displayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;

    let current_page_items = items.slice(start, end);

    for (let i = 0; i < current_page_items.length; i++) {

      let row = `<tr>
                          <td>${current_page_items[i].id}</td>
                          <td>${current_page_items[i].name}</td>
                          <td>${current_page_items[i].email}</td>  
                      <tr/>`

      wrapper.innerHTML += row;
    }
  }

  const startBtn = document.querySelector("#startBtn"),
    endBtn = document.querySelector("#endBtn"),
    prevNext = document.querySelectorAll(".prevNext"),
    numbers = document.querySelectorAll(".link");

  let currentStep = 1;

  const updateBtn = () => {

    if (currentStep === 9) {
      endBtn.disabled = true;
      prevNext[1].disabled = true;
    }

    else if (currentStep === 0) {
      startBtn.disabled = true;
      prevNext[0].disabled = true;
    }

    else {
      endBtn.disabled = false;
      prevNext[1].disabled = false;
      startBtn.disabled = false;
      prevNext[0].disabled = false;
    }
  };

  numbers.forEach((number, numIndex) => {
    number.addEventListener("click", (e) => {
      e.preventDefault();

      currentStep = numIndex;

      displayList(userDetails, table, contentLimit, currentStep + 1);

      document.querySelector(".active").classList.remove("active");
      number.classList.add("active");
      updateBtn();
    });
  });

  prevNext.forEach((button) => {
    button.addEventListener("click", (e) => {

      currentStep += e.target.id === "next" ? 1 : -1;
      displayList(userDetails, table, contentLimit, currentStep + 1);

      numbers.forEach((number, numIndex) => {

        number.classList.toggle("active", numIndex === currentStep);
        updateBtn();

      });
    });
  });

  startBtn.addEventListener("click", () => {

    document.querySelector(".active").classList.remove("active");
    numbers[0].classList.add("active");
    currentStep = 0;
    displayList(userDetails, table, contentLimit, currentStep + 1);
    updateBtn();
    endBtn.disabled = false;
    prevNext[1].disabled = false;
  });

  endBtn.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    numbers[9].classList.add("active");
    currentStep = 9;
    displayList(userDetails, table, contentLimit, currentStep + 1);
    updateBtn();
    startBtn.disabled = false;
    prevNext[0].disabled = false;
  });


  displayList(userDetails, table, contentLimit, currentPage);
}

