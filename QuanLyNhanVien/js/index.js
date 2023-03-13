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
  // tính tổng lương
  this.totalSalary = function () {
    if (this.position === "Giám đốc") {
      return this.salary * 3;
    } else if (this.position === "Trưởng phòng") {
      return this.salary * 2;
    } else {
      return this.salary;
    }
  };

  //xếp loại
  this.typeofEmloye = function () {
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
}

//Variable Global
let listNV = [];
var checked = new Validation();

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

  //Validation
  var valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nv.user, "error-required-user", "Tài Khoản") &
    checked.kiemTraRong(nv.name, "error-required-name", "Họ và Tên") &
    checked.kiemTraRong(nv.email, "error-required-email", "email") &
    checked.kiemTraRong(nv.password, "error-required-pass", "Mật Khẩu") &
    checked.kiemTraRong(nv.date, "error-required-date", "Ngày vào làm") &
    checked.kiemTraRong(nv.salary, "error-required-Salary", "Lương") &
    checked.kiemTraRong(nv.workTime, "error-required-time", "Thời gian làm") &
    /* length */
    checked.kiemTraLength(
      nv.user,
      "error-min-max-length-user",
      "Tài Khoản",
      4,
      6
    );

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nv.user, "error-number-user", "Tài Khoản") &
    checked.kiemTraKyTu(nv.name, "error-allLetter-name", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nv.email, "error-email", "Email");
  if (!valid) {
    return;
  }
  /* định dạng ngày */
  valid = checked.kiemTraDate(nv.date, "error-date", "Ngày vào làm");
  if (!valid) {
    return;
  }
  /* định dang chức vụ */
  valid = checked.kiemtraOps(nv.position, "error-Pos", "Chức Vụ");
  var tagSelect = document.getElementById("chucvu");
  var index = tagSelect.selectedIndex;
  var Position = tagSelect.options[index].innerHTML;
  nv.position = Position;
  if (!valid) {
    return;
  }
  /* định dạng Pass */
  valid = checked.kiemTraPass(nv.password, "error-pass", "Mật khẩu");
  if (!valid) {
    return;
  }

  /* Lương & giờ làm*/
  valid =
    checked.kiemtraValue(
      nv.salary,
      "error-Salary",
      "Lương",
      1000000,
      20000000
    ) & checked.kiemtraValue(nv.workTime, "error-time", "Giờ làm", 80, 200);

  if (!valid) {
    return;
  }

  //thêm vào mãng trống
  listNV.push(nv);

  resetForm();

  //xuất ra giao diện
  renderTable(listNV);

  SaveLS();
};

//Hàm chặn trùng User
document.getElementById("tknv").oninput = function () {
  for (var i = 0; i < listNV.length; i++) {
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
       <button class="btn btn-primary m-3" data-toggle="modal"
                    data-target="#myModal" onclick="chinhSua('${
                      employe.user
                    }')">Chỉnh Sửa</button>
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
  SaveLS();
}

//Save vào LocalStrager
function SaveLS() {
  let stringNV = JSON.stringify(listNV);
  localStorage.setItem("listNV", stringNV);
}

//lấy item từ LS
function getLS() {
  if (localStorage.getItem("listNV")) {
    let nhanVien = localStorage.getItem("listNV");
    var listnew = JSON.parse(nhanVien);
    for (let i = 0; i < listnew.length; i++) {
      var nv = new Nhanvien();
      nv.user = listnew[i].user;
      nv.name = listnew[i].name;
      nv.email = listnew[i].email;
      nv.password = listnew[i].password;
      nv.date = listnew[i].date;
      nv.salary = listnew[i].salary;
      nv.position = listnew[i].position;
      nv.workTime = listnew[i].workTime;
      listNV.push(nv);
    }
    renderTable(listNV);
  }
}
getLS();

//cập nhật thông tin
function chinhSua(userEdit) {
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
  for (var i = 0; i < listNV.length; i++) {
    if (listNV[i].user === userEdit) {
      document.getElementById("tknv").value = listNV[i].user;
      document.getElementById("name").value = listNV[i].name;
      document.getElementById("email").value = listNV[i].email;
      document.getElementById("password").value = listNV[i].password;
      document.getElementById("datepicker").value = listNV[i].date;
      document.getElementById("luongCB").value = listNV[i].salary;
      document.getElementById("chucvu").value = listNV[i].position;
      document.getElementById("gioLam").value = listNV[i].workTime;
      break;
    }
  }
}

document.getElementById("btnCapNhat").onclick = function () {
  var userEdit = new Nhanvien();
  userEdit.user = document.getElementById("tknv").value;
  userEdit.name = document.getElementById("name").value;
  userEdit.email = document.getElementById("email").value;
  userEdit.password = document.getElementById("password").value;
  userEdit.date = document.getElementById("datepicker").value;
  userEdit.salary = document.getElementById("luongCB").value;
  userEdit.position = document.getElementById("chucvu").value;
  userEdit.workTime = document.getElementById("gioLam").value;

  //Validation
  var valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(userEdit.user, "error-required-user", "Tài Khoản") &
    checked.kiemTraRong(userEdit.name, "error-required-name", "Họ và Tên") &
    checked.kiemTraRong(userEdit.email, "error-required-email", "email") &
    checked.kiemTraRong(userEdit.password, "error-required-pass", "Mật Khẩu") &
    checked.kiemTraRong(userEdit.date, "error-required-date", "Ngày vào làm") &
    checked.kiemTraRong(userEdit.salary, "error-required-Salary", "Lương") &
    checked.kiemTraRong(
      userEdit.workTime,
      "error-required-time",
      "Thời gian làm"
    ) &
    /* length */
    checked.kiemTraLength(
      userEdit.user,
      "error-min-max-length-user",
      "Tài Khoản",
      4,
      6
    );

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(userEdit.user, "error-number-user", "Tài Khoản") &
    checked.kiemTraKyTu(userEdit.name, "error-allLetter-name", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(userEdit.email, "error-email", "Email");
  if (!valid) {
    return;
  }
  /* định dạng ngày */
  valid = checked.kiemTraDate(userEdit.date, "error-date", "Ngày vào làm");
  if (!valid) {
    return;
  }
  /* định dang chức vụ */
  valid = checked.kiemtraOps(userEdit.position, "error-Pos", "Chức Vụ");
  var tagSelect = document.getElementById("chucvu");
  var index = tagSelect.selectedIndex;
  var Position = tagSelect.options[index].innerHTML;
  userEdit.position = Position;
  if (!valid) {
    return;
  }
  /* định dạng Pass */
  valid = checked.kiemTraPass(userEdit.password, "error-pass", "Mật khẩu");
  if (!valid) {
    return;
  }

  /* Lương & giờ làm*/
  valid =
    checked.kiemtraValue(
      userEdit.salary,
      "error-Salary",
      "Lương",
      1000000,
      20000000
    ) &
    checked.kiemtraValue(userEdit.workTime, "error-time", "Giờ làm", 80, 200);

  if (!valid) {
    return;
  }
  for (var i = 0; i < listNV.length; i++) {
    if (listNV[i].user === userEdit.user) {
      listNV[i].user = userEdit.user;
      listNV[i].name = userEdit.name;
      listNV[i].email = userEdit.email;
      listNV[i].password = userEdit.password;
      listNV[i].date = userEdit.date;
      listNV[i].salary = userEdit.salary;
      listNV[i].position = userEdit.position;
      listNV[i].workTime = userEdit.workTime;
      break;
    }
  }
  renderTable(listNV);
  SaveLS(listNV);
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
  resetForm();
};

//Search

document.getElementById("searchName").oninput = function () {
  debugger;
  var keyWord = document.getElementById("searchName").value;
  keyWord = stringToSlug(keyWord);

  var search = [];
  for (var i = 0; i < listNV.length; i++) {
    var nvS = listNV[i];

    if (stringToSlug(nvS.typeofEmloye()).search(keyWord) != -1) {
      search.push(nvS);
    }
  }
  renderTable(search);
};

function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
}

function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
}
