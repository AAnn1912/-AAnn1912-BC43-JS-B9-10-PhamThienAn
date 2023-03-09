//prototype

function Nhanvien() {
  this.user = "";
  this.name = "";
  this.email = "";
  this.password = "";
  this.date = "";
  this.salary = "";
  this.position = "";
  this.workTime = "";
}

// tính tổng lương
Nhanvien.prototype.totalSalary = function () {
  if (this.position === "Giám đốc") {
    return this.salary * 3;
  } else if (this.position === "Trưởng phòng") {
    return this.salary * 2;
  } else {
    return this.salary;
  }
};

//xếp loại
Nhanvien.prototype.typeofEmloye = function () {
  if (this.workTime > 191) {
    return "Nhân viên xuất sắc";
  } else if (this.workTime > 175) {
    return "Nhân viên giỏi";
  } else if (this.workTime > 159) {
    return "Nhân viên khá";
  } else {
    return "Nhân viên trung bình";
  }
};

//Variable Global
let listNV = [];

// thêm nhân viên
document.getElementById("btnThemNV").onclick = function () {
  let nv = new Nhanvien();

  //get Value
  nv.user = document.getElementById("tknv").value;
  nv.name = document.getElementById("name").value;
  nv.email = document.getElementById("email").value;
  nv.password = document.getElementById("password").value;
  nv.date = document.getElementById("datepicker").value;
  nv.salary = document.getElementById("luongCB").value;
  nv.position = document.getElementById("chucvu").value;
  nv.workTime = document.getElementById("gioLam").value;

  //Check Duplicate
  // blockDuplicate(listNV);

  //thêm vào mãng trống
  listNV.push(nv);

  //xuất ra giao diện
  renderTable(listNV);
};

//Hàm chặn trùng User
document.getElementById("tknv").onchange = function () {
  for (var i = 0; i < listNV.length; i++) {
    console.log(listNV[i].user);
    console.log(document.getElementById("tknv").value);
    if (listNV[i].user == document.getElementById("tknv").value) {
      document.getElementById(
        "error-Dup-user"
      ).innerHTML = `Tài khoản đã tồn tại`;
      document.getElementById("btnThemNV").disabled = true;

      break;
    } else {
      document.getElementById("error-Dup-user").innerHTML = "";
      document.getElementById("btnThemNV").disabled = false;
    }
  }
};

//Hàm xuất ra giao diện
function renderTable(mangNV) {
  let stringHTML = "";
  for (let i = 0; i < mangNV.length; i++) {
    let employe = mangNV[i];
    stringHTML += `
    <tr>
       <td>${employe.user}</td>
       <td>${employe.name}</td>
       <td>${employe.email}</td>
       <td>${employe.date}</td>
       <td>${employe.position}</td>
       <td>${employe.totalSalary()}</td>
       <td>${employe.typeofEmloye()}</td>
       <td>
       <button class="btn btn-danger" onclick="DelNv('${
         employe.user
       }')">Xoá nhân viên</button>
      </td>
    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = stringHTML;
  return stringHTML;
}

//Hàm xoá nhân viên
function DelNv(userNV) {
  let iDelVN = -1;
  for (var i = 0; i < listNV.length; i++) {
    if (listNV[i].user === userNV) {
      iDelVN = i;
      break;
    }
  }
  listNV.splice(iDelVN, 1);
  renderTable(listNV);
}
