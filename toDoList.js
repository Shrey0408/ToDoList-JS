
    function updateLocalStorage() {
        console.log("Adding new Item");
        titl = document.getElementById("title").value;
        desc = document.getElementById("description").value;
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        var itemJsonArray = [];
        var itemJsonArrayStr = "";
        if (titl != '' && desc != '') {
          if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([titl, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
          } else {
            itemJsonArrayStr = localStorage.getItem("itemsJson");
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push([titl, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
          }
        }
      }
      function updateItemTable() {
        if (localStorage.getItem('itemsJson') != null) {
          itemJsonArrayStr1 = localStorage.getItem("itemsJson");
          itemJsonArray = JSON.parse(itemJsonArrayStr1);
          //Populating table
          let tableBody = document.getElementById('tableBody');
          let str = "";
          itemJsonArray.forEach((element, index) => {
            str += `
          <tr>
              <th scope="row">${index + 1}</th>
              <td>${element[0]}</td>
              <td>${element[1]}</td>
              <td><button class="btn btn-sm btn-primary" onclick="deleteRow(${index})">Delete</button></td>
            </tr>
          `
          });
          tableBody.innerHTML = str;
        }else{
            tableBody.innerHTML ='';
        }
      }
      function update() {
        updateLocalStorage();
        updateItemTable();
      }
  
      function deleteRow(index) {
        console.log("Deleting item ", index);
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.splice(index, 1);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        updateItemTable();
      }
      function clearStorage() {
        if (confirm("Please confirm to clear the List")) {
          console.log("Clearing List");
          localStorage.clear();
          updateItemTable();
        }
      }
      add = document.getElementById("add");
      add.addEventListener("click", update);
      updateItemTable();
  